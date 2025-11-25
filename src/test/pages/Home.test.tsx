import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/test-utils';
import Home from '@/pages/Home';
import * as hotelApi from '@/api/hotel.api';
import { HotelsResponse } from '@/types';

vi.mock('@/api/hotel.api');

describe('Home', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('displays loading state', () => {
        vi.mocked(hotelApi.useGetAllHotels).mockReturnValue({
            hotels: undefined,
            isLoading: true,
        });

        render(<Home />);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('displays no hotels message when no hotels are found', () => {
        vi.mocked(hotelApi.useGetAllHotels).mockReturnValue({
            hotels: {
                success: false,
                message: 'No hotels found',
                data: [],
            } as HotelsResponse,
            isLoading: false,
        });

        render(<Home />);

        expect(screen.getByText(/no hotels found/i)).toBeInTheDocument();
    });

    it('displays latest destinations heading when hotels are available', () => {
        const mockHotels: HotelsResponse = {
            success: true,
            message: 'Success',
            data: [
                {
                    _id: '1',
                    name: 'Hotel 1',
                    city: 'City 1',
                    country: 'Country 1',
                    description: 'Description 1',
                    type: 'Luxury',
                    adultCount: 2,
                    childCount: 0,
                    facilities: ['Pool', 'WiFi'],
                    pricePerNight: 100,
                    starRating: 5,
                    imageUrls: ['url1.jpg'],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 'user1',
                },
                {
                    _id: '2',
                    name: 'Hotel 2',
                    city: 'City 2',
                    country: 'Country 2',
                    description: 'Description 2',
                    type: 'Budget',
                    adultCount: 2,
                    childCount: 1,
                    facilities: ['WiFi'],
                    pricePerNight: 50,
                    starRating: 3,
                    imageUrls: ['url2.jpg'],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 'user2',
                },
            ],
        };

        vi.mocked(hotelApi.useGetAllHotels).mockReturnValue({
            hotels: mockHotels,
            isLoading: false,
        });

        render(<Home />);

        expect(screen.getByText(/latest destinations/i)).toBeInTheDocument();
        expect(
            screen.getByText(/most recent destinations added by our hosts/i)
        ).toBeInTheDocument();
    });

    it('renders hotel cards when hotels are available', () => {
        const mockHotels: HotelsResponse = {
            success: true,
            message: 'Success',
            data: [
                {
                    _id: '1',
                    name: 'Luxury Hotel',
                    city: 'Paris',
                    country: 'France',
                    description: 'A luxury hotel',
                    type: 'Luxury',
                    adultCount: 2,
                    childCount: 0,
                    facilities: ['Pool', 'WiFi', 'Spa'],
                    pricePerNight: 200,
                    starRating: 5,
                    imageUrls: ['luxury.jpg'],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 'user1',
                },
                {
                    _id: '2',
                    name: 'Budget Hotel',
                    city: 'London',
                    country: 'UK',
                    description: 'An affordable hotel',
                    type: 'Budget',
                    adultCount: 2,
                    childCount: 1,
                    facilities: ['WiFi'],
                    pricePerNight: 75,
                    starRating: 3,
                    imageUrls: ['budget.jpg'],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 'user2',
                },
                {
                    _id: '3',
                    name: 'Business Hotel',
                    city: 'New York',
                    country: 'USA',
                    description: 'A business hotel',
                    type: 'Business',
                    adultCount: 1,
                    childCount: 0,
                    facilities: ['WiFi', 'Meeting Rooms'],
                    pricePerNight: 150,
                    starRating: 4,
                    imageUrls: ['business.jpg'],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 'user3',
                },
            ],
        };

        vi.mocked(hotelApi.useGetAllHotels).mockReturnValue({
            hotels: mockHotels,
            isLoading: false,
        });

        render(<Home />);

        expect(screen.getByText(/luxury hotel/i)).toBeInTheDocument();
        expect(screen.getByText(/budget hotel/i)).toBeInTheDocument();
        expect(screen.getByText(/business hotel/i)).toBeInTheDocument();
    });

    it('renders correct grid layout sections', () => {
        const mockHotels: HotelsResponse = {
            success: true,
            message: 'Success',
            data: Array.from({ length: 5 }, (_, i) => ({
                _id: `${i + 1}`,
                name: `Hotel ${i + 1}`,
                city: `City ${i + 1}`,
                country: `Country ${i + 1}`,
                description: `Description ${i + 1}`,
                type: 'Luxury',
                adultCount: 2,
                childCount: 0,
                facilities: ['WiFi'],
                pricePerNight: 100,
                starRating: 4,
                imageUrls: [`url${i + 1}.jpg`],
                lastUpdated: new Date(),
                userId: `user${i + 1}`,
                createdAt: new Date(),
                updatedAt: new Date(),
                bookings: [
                    {
                        _id: `booking${i + 1}`,
                        userId: `user${i + 1}`,
                        hotelId: `${i + 1}`,
                        firstName: `First${i + 1}`,
                        lastName: `Last${i + 1}`,
                        email: `user${i + 1}@test.com`,
                        checkIn: new Date().toISOString(),
                        checkOut: new Date().toISOString(),
                        adultCount: 2,
                        childCount: 0,
                        totalStayCost: 200,
                        bookingDate: new Date(),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                ],
            })),
        };

        vi.mocked(hotelApi.useGetAllHotels).mockReturnValue({
            hotels: mockHotels,
            isLoading: false,
        });

        render(<Home />);

        expect(screen.getByText(/hotel 1/i)).toBeInTheDocument();
        expect(screen.getByText(/hotel 2/i)).toBeInTheDocument();
        expect(screen.getByText(/hotel 3/i)).toBeInTheDocument();
    });
});
