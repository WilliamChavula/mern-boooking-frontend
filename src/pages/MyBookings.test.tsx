import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/test-utils';
import MyBookings from './MyBookings';
import * as hotelApi from '@/api/hotel.api';
import { UserBookingResponseSchema } from '@/types';

vi.mock('@/api/hotel.api');

describe('MyBookings', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('displays loading state while fetching bookings', () => {
        vi.mocked(hotelApi.useGetMyBookings).mockReturnValue({
            userBookings: undefined,
            isLoadingBookings: true,
        });

        render(<MyBookings />);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('displays no bookings message when user has no bookings', () => {
        const emptyBookings: UserBookingResponseSchema = {
            success: true,
            message: 'Success',
            data: [],
        };

        vi.mocked(hotelApi.useGetMyBookings).mockReturnValue({
            userBookings: emptyBookings,
            isLoadingBookings: false,
        });

        render(<MyBookings />);

        expect(screen.getByText(/no bookings found/i)).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: /browse hotels/i })
        ).toBeInTheDocument();
    });

    it('displays error message when fetching bookings fails', () => {
        const failedBookings: UserBookingResponseSchema = {
            success: false,
            message: 'Failed to fetch bookings',
        };

        vi.mocked(hotelApi.useGetMyBookings).mockReturnValue({
            userBookings: failedBookings,
            isLoadingBookings: false,
        });

        render(<MyBookings />);

        expect(screen.getByText(/no bookings found/i)).toBeInTheDocument();
    });

    it('renders My Bookings heading when bookings exist', () => {
        const mockBookings: UserBookingResponseSchema = {
            success: true,
            message: 'Success',
            data: [
                {
                    _id: 'hotel1',
                    name: 'Luxury Hotel',
                    city: 'Paris',
                    country: 'France',
                    description: 'A luxury hotel',
                    type: 'Luxury',
                    adultCount: 2,
                    childCount: 1,
                    facilities: ['Pool', 'WiFi'],
                    pricePerNight: 200,
                    starRating: 5,
                    imageUrls: ['hotel1.jpg'],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 'user123',
                    bookings: [
                        {
                            _id: 'booking1',
                            userId: 'user123',
                            firstName: 'John',
                            lastName: 'Doe',
                            email: 'john@example.com',
                            adultCount: 2,
                            childCount: 1,
                            totalStayCost: 600,
                            checkIn: '2024-12-01',
                            checkOut: '2024-12-04',
                        },
                    ],
                },
            ],
        };

        vi.mocked(hotelApi.useGetMyBookings).mockReturnValue({
            userBookings: mockBookings,
            isLoadingBookings: false,
        });

        render(<MyBookings />);

        expect(screen.getByText(/my bookings/i)).toBeInTheDocument();
    });

    it('displays hotel booking information correctly', () => {
        const mockBookings: UserBookingResponseSchema = {
            success: true,
            message: 'Success',
            data: [
                {
                    _id: 'hotel1',
                    name: 'Grand Hotel',
                    city: 'London',
                    country: 'UK',
                    description: 'A grand hotel',
                    type: 'Luxury',
                    adultCount: 2,
                    childCount: 0,
                    facilities: ['WiFi'],
                    pricePerNight: 150,
                    starRating: 4,
                    imageUrls: ['hotel1.jpg'],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 'user123',
                    bookings: [
                        {
                            _id: 'booking1',
                            userId: 'user123',
                            firstName: 'Jane',
                            lastName: 'Smith',
                            email: 'jane@example.com',
                            adultCount: 2,
                            childCount: 0,
                            totalStayCost: 450,
                            checkIn: '2024-11-15',
                            checkOut: '2024-11-18',
                        },
                    ],
                },
            ],
        };

        vi.mocked(hotelApi.useGetMyBookings).mockReturnValue({
            userBookings: mockBookings,
            isLoadingBookings: false,
        });

        render(<MyBookings />);

        expect(screen.getByText(/grand hotel/i)).toBeInTheDocument();
        expect(screen.getByText(/london, uk/i)).toBeInTheDocument();
    });

    it('displays booking dates correctly', () => {
        const mockBookings: UserBookingResponseSchema = {
            success: true,
            message: 'Success',
            data: [
                {
                    _id: 'hotel1',
                    name: 'Test Hotel',
                    city: 'New York',
                    country: 'USA',
                    description: 'Test hotel',
                    type: 'Budget',
                    adultCount: 2,
                    childCount: 0,
                    facilities: ['WiFi'],
                    pricePerNight: 100,
                    starRating: 3,
                    imageUrls: ['hotel1.jpg'],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 'user123',
                    bookings: [
                        {
                            _id: 'booking1',
                            userId: 'user123',
                            firstName: 'John',
                            lastName: 'Doe',
                            email: 'john@example.com',
                            adultCount: 2,
                            childCount: 0,
                            totalStayCost: 300,
                            checkIn: '2024-12-01',
                            checkOut: '2024-12-04',
                        },
                    ],
                },
            ],
        };

        vi.mocked(hotelApi.useGetMyBookings).mockReturnValue({
            userBookings: mockBookings,
            isLoadingBookings: false,
        });

        render(<MyBookings />);

        expect(screen.getByText(/dates:/i)).toBeInTheDocument();
        // Dates are split across multiple elements, so check for the container
        const container = screen.getByText(/dates:/i).parentElement;
        expect(container).toHaveTextContent(/2024/);
    });

    it('displays guest count correctly for adults only', () => {
        const mockBookings: UserBookingResponseSchema = {
            success: true,
            message: 'Success',
            data: [
                {
                    _id: 'hotel1',
                    name: 'Test Hotel',
                    city: 'Tokyo',
                    country: 'Japan',
                    description: 'Test hotel',
                    type: 'Business',
                    adultCount: 2,
                    childCount: 0,
                    facilities: ['WiFi'],
                    pricePerNight: 120,
                    starRating: 4,
                    imageUrls: ['hotel1.jpg'],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 'user123',
                    bookings: [
                        {
                            _id: 'booking1',
                            userId: 'user123',
                            firstName: 'John',
                            lastName: 'Doe',
                            email: 'john@example.com',
                            adultCount: 2,
                            childCount: 0,
                            totalStayCost: 360,
                            checkIn: '2024-12-01',
                            checkOut: '2024-12-04',
                        },
                    ],
                },
            ],
        };

        vi.mocked(hotelApi.useGetMyBookings).mockReturnValue({
            userBookings: mockBookings,
            isLoadingBookings: false,
        });

        render(<MyBookings />);

        expect(screen.getByText(/guests:/i)).toBeInTheDocument();
        expect(screen.getByText(/2 adults/i)).toBeInTheDocument();
        expect(screen.getByText(/0 children/i)).toBeInTheDocument();
    });

    it('displays guest count correctly with children', () => {
        const mockBookings: UserBookingResponseSchema = {
            success: true,
            message: 'Success',
            data: [
                {
                    _id: 'hotel1',
                    name: 'Family Hotel',
                    city: 'Berlin',
                    country: 'Germany',
                    description: 'Family friendly',
                    type: 'Resort',
                    adultCount: 2,
                    childCount: 2,
                    facilities: ['Pool', 'Kids Club'],
                    pricePerNight: 180,
                    starRating: 4,
                    imageUrls: ['hotel1.jpg'],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 'user123',
                    bookings: [
                        {
                            _id: 'booking1',
                            userId: 'user123',
                            firstName: 'John',
                            lastName: 'Doe',
                            email: 'john@example.com',
                            adultCount: 2,
                            childCount: 2,
                            totalStayCost: 540,
                            checkIn: '2024-12-01',
                            checkOut: '2024-12-04',
                        },
                    ],
                },
            ],
        };

        vi.mocked(hotelApi.useGetMyBookings).mockReturnValue({
            userBookings: mockBookings,
            isLoadingBookings: false,
        });

        render(<MyBookings />);

        expect(screen.getByText(/2 adults/i)).toBeInTheDocument();
        expect(screen.getByText(/2 children/i)).toBeInTheDocument();
    });

    it('displays singular adult and child when count is 1', () => {
        const mockBookings: UserBookingResponseSchema = {
            success: true,
            message: 'Success',
            data: [
                {
                    _id: 'hotel1',
                    name: 'Small Hotel',
                    city: 'Rome',
                    country: 'Italy',
                    description: 'Cozy hotel',
                    type: 'Boutique',
                    adultCount: 1,
                    childCount: 1,
                    facilities: ['WiFi'],
                    pricePerNight: 90,
                    starRating: 3,
                    imageUrls: ['hotel1.jpg'],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 'user123',
                    bookings: [
                        {
                            _id: 'booking1',
                            userId: 'user123',
                            firstName: 'Jane',
                            lastName: 'Smith',
                            email: 'jane@example.com',
                            adultCount: 1,
                            childCount: 1,
                            totalStayCost: 270,
                            checkIn: '2024-12-01',
                            checkOut: '2024-12-04',
                        },
                    ],
                },
            ],
        };

        vi.mocked(hotelApi.useGetMyBookings).mockReturnValue({
            userBookings: mockBookings,
            isLoadingBookings: false,
        });

        render(<MyBookings />);

        expect(screen.getByText(/1 adult/i)).toBeInTheDocument();
        expect(screen.getByText(/1 child/i)).toBeInTheDocument();
    });

    it('renders multiple bookings for a single hotel', () => {
        const mockBookings: UserBookingResponseSchema = {
            success: true,
            message: 'Success',
            data: [
                {
                    _id: 'hotel1',
                    name: 'Repeat Hotel',
                    city: 'Barcelona',
                    country: 'Spain',
                    description: 'Popular hotel',
                    type: 'Luxury',
                    adultCount: 2,
                    childCount: 0,
                    facilities: ['Pool', 'Spa'],
                    pricePerNight: 200,
                    starRating: 5,
                    imageUrls: ['hotel1.jpg'],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 'user123',
                    bookings: [
                        {
                            _id: 'booking1',
                            userId: 'user123',
                            firstName: 'John',
                            lastName: 'Doe',
                            email: 'john@example.com',
                            adultCount: 2,
                            childCount: 0,
                            totalStayCost: 600,
                            checkIn: '2024-12-01',
                            checkOut: '2024-12-04',
                        },
                        {
                            _id: 'booking2',
                            userId: 'user123',
                            firstName: 'John',
                            lastName: 'Doe',
                            email: 'john@example.com',
                            adultCount: 2,
                            childCount: 0,
                            totalStayCost: 400,
                            checkIn: '2024-12-15',
                            checkOut: '2024-12-17',
                        },
                    ],
                },
            ],
        };

        vi.mocked(hotelApi.useGetMyBookings).mockReturnValue({
            userBookings: mockBookings,
            isLoadingBookings: false,
        });

        render(<MyBookings />);

        expect(screen.getByText(/repeat hotel/i)).toBeInTheDocument();
        // Should have two sets of date ranges
        const dateElements = screen.getAllByText(/dates:/i);
        expect(dateElements.length).toBe(2);
    });

    it('renders multiple different hotel bookings', () => {
        const mockBookings: UserBookingResponseSchema = {
            success: true,
            message: 'Success',
            data: [
                {
                    _id: 'hotel1',
                    name: 'First Hotel',
                    city: 'Paris',
                    country: 'France',
                    description: 'First hotel',
                    type: 'Luxury',
                    adultCount: 2,
                    childCount: 0,
                    facilities: ['WiFi'],
                    pricePerNight: 150,
                    starRating: 4,
                    imageUrls: ['hotel1.jpg'],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 'user123',
                    bookings: [
                        {
                            _id: 'booking1',
                            userId: 'user123',
                            firstName: 'John',
                            lastName: 'Doe',
                            email: 'john@example.com',
                            adultCount: 2,
                            childCount: 0,
                            totalStayCost: 450,
                            checkIn: '2024-12-01',
                            checkOut: '2024-12-04',
                        },
                    ],
                },
                {
                    _id: 'hotel2',
                    name: 'Second Hotel',
                    city: 'London',
                    country: 'UK',
                    description: 'Second hotel',
                    type: 'Budget',
                    adultCount: 1,
                    childCount: 0,
                    facilities: ['WiFi'],
                    pricePerNight: 80,
                    starRating: 3,
                    imageUrls: ['hotel2.jpg'],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 'user123',
                    bookings: [
                        {
                            _id: 'booking2',
                            userId: 'user123',
                            firstName: 'John',
                            lastName: 'Doe',
                            email: 'john@example.com',
                            adultCount: 1,
                            childCount: 0,
                            totalStayCost: 160,
                            checkIn: '2024-12-10',
                            checkOut: '2024-12-12',
                        },
                    ],
                },
            ],
        };

        vi.mocked(hotelApi.useGetMyBookings).mockReturnValue({
            userBookings: mockBookings,
            isLoadingBookings: false,
        });

        render(<MyBookings />);

        expect(screen.getByText(/first hotel/i)).toBeInTheDocument();
        expect(screen.getByText(/second hotel/i)).toBeInTheDocument();
        expect(screen.getByText(/paris, france/i)).toBeInTheDocument();
        expect(screen.getByText(/london, uk/i)).toBeInTheDocument();
    });

    it('renders hotel images correctly', () => {
        const mockBookings: UserBookingResponseSchema = {
            success: true,
            message: 'Success',
            data: [
                {
                    _id: 'hotel1',
                    name: 'Image Hotel',
                    city: 'Amsterdam',
                    country: 'Netherlands',
                    description: 'Hotel with images',
                    type: 'Boutique',
                    adultCount: 2,
                    childCount: 0,
                    facilities: ['WiFi'],
                    pricePerNight: 130,
                    starRating: 4,
                    imageUrls: ['amsterdam-hotel.jpg'],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 'user123',
                    bookings: [
                        {
                            _id: 'booking1',
                            userId: 'user123',
                            firstName: 'John',
                            lastName: 'Doe',
                            email: 'john@example.com',
                            adultCount: 2,
                            childCount: 0,
                            totalStayCost: 390,
                            checkIn: '2024-12-01',
                            checkOut: '2024-12-04',
                        },
                    ],
                },
            ],
        };

        vi.mocked(hotelApi.useGetMyBookings).mockReturnValue({
            userBookings: mockBookings,
            isLoadingBookings: false,
        });

        render(<MyBookings />);

        const images = screen.getAllByRole('img');
        expect(images.length).toBeGreaterThan(0);
        expect(images[0]).toHaveAttribute('src', 'amsterdam-hotel.jpg');
        expect(images[0]).toHaveAttribute('alt', 'booked-hotel-image');
    });

    it('handles array of image URLs correctly', () => {
        const mockBookings: UserBookingResponseSchema = {
            success: true,
            message: 'Success',
            data: [
                {
                    _id: 'hotel1',
                    name: 'Multi Image Hotel',
                    city: 'Vienna',
                    country: 'Austria',
                    description: 'Hotel with multiple images',
                    type: 'Luxury',
                    adultCount: 2,
                    childCount: 0,
                    facilities: ['Pool', 'Spa'],
                    pricePerNight: 180,
                    starRating: 5,
                    imageUrls: ['vienna-1.jpg', 'vienna-2.jpg', 'vienna-3.jpg'],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 'user123',
                    bookings: [
                        {
                            _id: 'booking1',
                            userId: 'user123',
                            firstName: 'John',
                            lastName: 'Doe',
                            email: 'john@example.com',
                            adultCount: 2,
                            childCount: 0,
                            totalStayCost: 540,
                            checkIn: '2024-12-01',
                            checkOut: '2024-12-04',
                        },
                    ],
                },
            ],
        };

        vi.mocked(hotelApi.useGetMyBookings).mockReturnValue({
            userBookings: mockBookings,
            isLoadingBookings: false,
        });

        render(<MyBookings />);

        const images = screen.getAllByRole('img');
        // Should display the first image from the array
        expect(images[0]).toHaveAttribute('src', 'vienna-1.jpg');
    });
});
