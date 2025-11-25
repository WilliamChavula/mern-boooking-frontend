import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/test-utils';
import HotelDetails from '@/pages/HotelDetails';
import * as hotelApi from '@/api/hotel.api';
import { useParams } from 'react-router';
import { HotelResponse } from '@/types';

vi.mock('@/api/hotel.api');
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useParams: vi.fn(),
    };
});

describe('HotelDetails', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('displays loading state', () => {
        vi.mocked(useParams).mockReturnValue({ hotelId: '123' });
        vi.mocked(hotelApi.useGetHotel).mockReturnValue({
            data: undefined,
            isLoading: true,
        });

        render(<HotelDetails />);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('displays no hotel found message when hotel is not found', () => {
        vi.mocked(useParams).mockReturnValue({ hotelId: '123' });
        vi.mocked(hotelApi.useGetHotel).mockReturnValue({
            data: {
                success: false,
                message: 'Not found',
                data: null,
            } as HotelResponse,
            isLoading: false,
        });

        render(<HotelDetails />);

        expect(screen.getByText(/no hotel found/i)).toBeInTheDocument();
    });

    it('renders hotel details when data is available', () => {
        const mockHotel: HotelResponse = {
            success: true,
            message: 'Success',
            data: {
                _id: '123',
                name: 'Luxury Paradise Hotel',
                city: 'Paris',
                country: 'France',
                description: 'A beautiful luxury hotel in the heart of Paris',
                type: 'Luxury',
                adultCount: 2,
                childCount: 1,
                facilities: ['Pool', 'WiFi', 'Spa', 'Restaurant'],
                pricePerNight: 250,
                starRating: 5,
                imageUrls: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: 'user123',
            },
        };

        vi.mocked(useParams).mockReturnValue({ hotelId: '123' });
        vi.mocked(hotelApi.useGetHotel).mockReturnValue({
            data: mockHotel,
            isLoading: false,
        });

        render(<HotelDetails />);

        expect(screen.getByText(/luxury paradise hotel/i)).toBeInTheDocument();
        expect(
            screen.getByText(/a beautiful luxury hotel in the heart of paris/i)
        ).toBeInTheDocument();
    });

    it('renders star rating correctly', () => {
        const mockHotel: HotelResponse = {
            success: true,
            message: 'Success',
            data: {
                _id: '123',
                name: 'Test Hotel',
                city: 'London',
                country: 'UK',
                description: 'Test description',
                type: 'Budget',
                adultCount: 2,
                childCount: 0,
                facilities: ['WiFi'],
                pricePerNight: 100,
                starRating: 4,
                imageUrls: ['image1.jpg'],
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: 'user123',
            },
        };

        vi.mocked(useParams).mockReturnValue({ hotelId: '123' });
        vi.mocked(hotelApi.useGetHotel).mockReturnValue({
            data: mockHotel,
            isLoading: false,
        });

        render(<HotelDetails />);

        const stars = screen
            .getByText(/test hotel/i)
            .parentElement?.querySelectorAll('svg');
        expect(stars?.length).toBeGreaterThan(0);
    });

    it('renders all hotel facilities as badges', () => {
        const mockHotel: HotelResponse = {
            success: true,
            message: 'Success',
            data: {
                _id: '123',
                name: 'Hotel with Facilities',
                city: 'New York',
                country: 'USA',
                description: 'Great hotel',
                type: 'Business',
                adultCount: 2,
                childCount: 0,
                facilities: ['Pool', 'WiFi', 'Gym', 'Parking'],
                pricePerNight: 180,
                starRating: 4,
                imageUrls: ['image1.jpg'],
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: 'user123',
            },
        };

        vi.mocked(useParams).mockReturnValue({ hotelId: '123' });
        vi.mocked(hotelApi.useGetHotel).mockReturnValue({
            data: mockHotel,
            isLoading: false,
        });

        render(<HotelDetails />);

        expect(screen.getByText(/pool/i)).toBeInTheDocument();
        expect(screen.getByText(/wifi/i)).toBeInTheDocument();
        expect(screen.getByText(/gym/i)).toBeInTheDocument();
        expect(screen.getByText(/parking/i)).toBeInTheDocument();
    });

    it('renders hotel images', () => {
        const mockHotel: HotelResponse = {
            success: true,
            message: 'Success',
            data: {
                _id: '123',
                name: 'Test Hotel',
                city: 'Tokyo',
                country: 'Japan',
                description: 'Test description',
                type: 'Resort',
                adultCount: 2,
                childCount: 2,
                facilities: ['Pool'],
                pricePerNight: 200,
                starRating: 5,
                imageUrls: ['image1.jpg', 'image2.jpg'],
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: 'user123',
            },
        };

        vi.mocked(useParams).mockReturnValue({ hotelId: '123' });
        vi.mocked(hotelApi.useGetHotel).mockReturnValue({
            data: mockHotel,
            isLoading: false,
        });

        render(<HotelDetails />);

        const images = screen.getAllByRole('img');
        expect(images.length).toBeGreaterThan(0);
        expect(images[0]).toHaveAttribute('src', 'image1.jpg');
    });

    it('renders guest info form', () => {
        const mockHotel: HotelResponse = {
            success: true,
            message: 'Success',
            data: {
                _id: '123',
                name: 'Test Hotel',
                city: 'Berlin',
                country: 'Germany',
                description: 'Test description',
                type: 'Boutique',
                adultCount: 2,
                childCount: 0,
                facilities: ['WiFi'],
                pricePerNight: 150,
                starRating: 4,
                imageUrls: ['image1.jpg'],
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: 'user123',
            },
        };

        vi.mocked(useParams).mockReturnValue({ hotelId: '123' });
        vi.mocked(hotelApi.useGetHotel).mockReturnValue({
            data: mockHotel,
            isLoading: false,
        });

        render(<HotelDetails />);

        expect(screen.getByText(/test hotel/i)).toBeInTheDocument();
    });
});
