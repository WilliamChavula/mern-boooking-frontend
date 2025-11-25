import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@/test/test-utils';
import Booking from '@/pages/Booking';
import * as hotelApi from '@/api/hotel.api';
import * as usersApi from '@/api/users.api';
import * as hotelContext from '@/context/hotel.context';
import { useParams } from 'react-router';
import {
    HotelResponse,
    PaymentIntentResponseSchema,
    UserResponse,
} from '@/types';

vi.mock('@/api/hotel.api');
vi.mock('@/api/users.api');
vi.mock('@/context/hotel.context');
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useParams: vi.fn(),
    };
});

// Mock Stripe Elements
vi.mock('@stripe/react-stripe-js', () => ({
    Elements: ({ children }: { children: React.ReactNode }) => (
        <div data-testid='stripe-elements'>{children}</div>
    ),
    useStripe: () => ({
        confirmCardPayment: vi.fn(),
    }),
    useElements: () => ({
        getElement: vi.fn(),
    }),
    CardElement: () => <div data-testid='card-element'>Card Element</div>,
}));

// Mock BookingForm component to avoid Stripe integration complexity
vi.mock('@/components/form/BookingForm/BookingForm.tsx', () => ({
    default: () => <div data-testid='booking-form'>Booking Form</div>,
}));

// Mock BookingDetailsSummary component
vi.mock('@/components/BookingDetailsSummary.tsx', () => ({
    default: () => (
        <div data-testid='booking-details-summary'>Booking Details Summary</div>
    ),
}));

describe('Booking', () => {
    const mockCreateUserPayment = vi.fn();
    const mockStripe = Promise.resolve(null);

    const mockSearch = {
        destination: 'Paris',
        checkIn: new Date('2024-12-01'),
        checkOut: new Date('2024-12-05'),
        adultCount: 2,
        childCount: 1,
    };

    const mockHotel: HotelResponse = {
        success: true,
        message: 'Success',
        data: {
            _id: '123',
            name: 'Test Hotel',
            city: 'Paris',
            country: 'France',
            description: 'A great hotel',
            type: 'Luxury',
            adultCount: 2,
            childCount: 1,
            facilities: ['Pool', 'WiFi'],
            pricePerNight: 100,
            starRating: 5,
            imageUrls: ['image1.jpg'],
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 'user123',
        },
    };

    const mockUser: UserResponse = {
        success: true,
        message: 'Success',
        data: {
            _id: 'user123',
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            role: 'user',
        },
    };

    const mockPaymentIntent: PaymentIntentResponseSchema = {
        success: true,
        message: 'Success',
        data: {
            paymentIntentId: 'pi_123',
            clientSecret: 'secret_123',
            totalStayCost: 400,
        },
    };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useParams).mockReturnValue({ hotelId: '123' });
        vi.mocked(hotelContext.useSearchStore).mockReturnValue({
            search: mockSearch,
            stripe: mockStripe,
            setSearch: vi.fn(),
            setStripe: vi.fn(),
            updateSearch: vi.fn(),
            resetSearch: vi.fn(),
        });
        mockCreateUserPayment.mockResolvedValue(mockPaymentIntent);
    });

    it('displays loading state while fetching data', () => {
        vi.mocked(hotelApi.useGetHotel).mockReturnValue({
            data: undefined,
            isLoading: true,
        });
        vi.mocked(usersApi.useCurrentUserSession).mockReturnValue({
            data: undefined,
            isLoading: true,
        });
        vi.mocked(hotelApi.useCreatePaymentIntent).mockReturnValue({
            createUserPayment: mockCreateUserPayment,
            isCreateIntentLoading: false,
        });

        render(<Booking />);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('displays error when hotel is not found', () => {
        vi.mocked(hotelApi.useGetHotel).mockReturnValue({
            data: { success: false, message: 'Not found' },
            isLoading: false,
        });
        vi.mocked(usersApi.useCurrentUserSession).mockReturnValue({
            data: mockUser,
            isLoading: false,
        });
        vi.mocked(hotelApi.useCreatePaymentIntent).mockReturnValue({
            createUserPayment: mockCreateUserPayment,
            isCreateIntentLoading: false,
        });

        render(<Booking />);

        expect(screen.getByText(/no hotel found/i)).toBeInTheDocument();
    });

    it('displays error when user is not found', () => {
        vi.mocked(hotelApi.useGetHotel).mockReturnValue({
            data: mockHotel,
            isLoading: false,
        });
        vi.mocked(usersApi.useCurrentUserSession).mockReturnValue({
            data: { success: false, message: 'Not found' },
            isLoading: false,
        });
        vi.mocked(hotelApi.useCreatePaymentIntent).mockReturnValue({
            createUserPayment: mockCreateUserPayment,
            isCreateIntentLoading: false,
        });

        render(<Booking />);

        expect(screen.getByText(/no user found/i)).toBeInTheDocument();
    });

    it('calculates number of nights correctly', async () => {
        vi.mocked(hotelApi.useGetHotel).mockReturnValue({
            data: mockHotel,
            isLoading: false,
        });
        vi.mocked(usersApi.useCurrentUserSession).mockReturnValue({
            data: mockUser,
            isLoading: false,
        });
        vi.mocked(hotelApi.useCreatePaymentIntent).mockReturnValue({
            createUserPayment: mockCreateUserPayment,
            isCreateIntentLoading: false,
        });

        render(<Booking />);

        await waitFor(() => {
            expect(mockCreateUserPayment).toHaveBeenCalledWith({
                hotelId: '123',
                numberOfNights: 4, // Dec 1 to Dec 5 = 4 nights
            });
        });
    });

    it('renders booking details summary and form when all data is loaded', async () => {
        vi.mocked(hotelApi.useGetHotel).mockReturnValue({
            data: mockHotel,
            isLoading: false,
        });
        vi.mocked(usersApi.useCurrentUserSession).mockReturnValue({
            data: mockUser,
            isLoading: false,
        });
        vi.mocked(hotelApi.useCreatePaymentIntent).mockReturnValue({
            createUserPayment: mockCreateUserPayment,
            isCreateIntentLoading: false,
        });

        render(<Booking />);

        await waitFor(() => {
            expect(screen.getByTestId('stripe-elements')).toBeInTheDocument();
            expect(
                screen.getByTestId('booking-details-summary')
            ).toBeInTheDocument();
            expect(screen.getByTestId('booking-form')).toBeInTheDocument();
        });
    });

    it('displays payment intent error message when payment intent fails', async () => {
        const failedPaymentIntent: PaymentIntentResponseSchema = {
            success: false,
            message: 'Payment intent creation failed',
        };

        mockCreateUserPayment.mockResolvedValue(failedPaymentIntent);

        vi.mocked(hotelApi.useGetHotel).mockReturnValue({
            data: mockHotel,
            isLoading: false,
        });
        vi.mocked(usersApi.useCurrentUserSession).mockReturnValue({
            data: mockUser,
            isLoading: false,
        });
        vi.mocked(hotelApi.useCreatePaymentIntent).mockReturnValue({
            createUserPayment: mockCreateUserPayment,
            isCreateIntentLoading: false,
        });

        render(<Booking />);

        await waitFor(() => {
            expect(
                screen.getByText(/payment intent creation failed/i)
            ).toBeInTheDocument();
        });
    });

    it('handles zero nights correctly', () => {
        const sameDay = new Date('2024-12-01');
        vi.mocked(hotelContext.useSearchStore).mockReturnValue({
            search: {
                ...mockSearch,
                checkIn: sameDay,
                checkOut: sameDay,
            },
            stripe: mockStripe,
            setSearch: vi.fn(),
            setStripe: vi.fn(),
            updateSearch: vi.fn(),
            resetSearch: vi.fn(),
        });

        vi.mocked(hotelApi.useGetHotel).mockReturnValue({
            data: mockHotel,
            isLoading: false,
        });
        vi.mocked(usersApi.useCurrentUserSession).mockReturnValue({
            data: mockUser,
            isLoading: false,
        });
        vi.mocked(hotelApi.useCreatePaymentIntent).mockReturnValue({
            createUserPayment: mockCreateUserPayment,
            isCreateIntentLoading: false,
        });

        render(<Booking />);

        // Payment intent should not be called with 0 nights
        expect(mockCreateUserPayment).not.toHaveBeenCalled();
    });
});
