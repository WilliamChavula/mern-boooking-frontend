import { useParams } from 'react-router';
import { hotelParam } from '@/types.ts';
import { useGetHotel } from '@/api/hotel.api.ts';
import { Loader, Star, TriangleAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge.tsx';
import GuestInfoForm from '@/components/form/GuestInfoForm/GuestInfoForm.tsx';

const HotelDetails = () => {
    const { hotelId } = useParams();

    const id = hotelParam.parse(hotelId);
    const { data: hotel, isLoading } = useGetHotel(id);

    if (isLoading) {
        return (
            <div className='min-h-1/2 flex items-center justify-center'>
                <Loader className='mr-2 animate-spin' /> Loading...
            </div>
        );
    }

    if (!hotel || !hotel.success) {
        return (
            <div className='min-h-1/2 flex flex-col md:flex-row items-center justify-center border border-gray-200 gap-4 p-4'>
                <TriangleAlert size={32} className='text-orange-400' />
                <p className='text-md md:text-lg text-gray-800 font-semibold'>
                    No Hotel Found
                </p>
            </div>
        );
    }

    return (
        <main className='space-y-6'>
            {/*Hotel Name and Rating Section*/}
            <section>
                <span className='flex'>
                    {Array.from({ length: hotel.data.starRating }).map(
                        (_, i) => (
                            <Star
                                key={i}
                                className='mr-1 fill-amber-300 text-amber-300'
                                size={16}
                            />
                        )
                    )}
                </span>
                <h1 className='text-sm md:text-base lg:text-xl font-semibold'>
                    {hotel.data.name}
                </h1>
            </section>
            {/* Image Section */}
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {Array.isArray(hotel.data.imageUrls) ? (
                    hotel.data.imageUrls.map((imageUrl, index) => (
                        <div key={index} className='h-[200px] md:h-[300px]'>
                            <img
                                src={imageUrl}
                                alt={`hotel-image-${index}`}
                                className='rounded-none h-full w-full object-cover object-center'
                            />
                        </div>
                    ))
                ) : (
                    <div className='h-[200px] md:h-[300px] w-full'>
                        <img
                            src={hotel.data.imageUrls}
                            alt='hotel-image'
                            className='rounded-none h-full w-full object-cover object-center'
                        />
                    </div>
                )}
            </section>
            {/*  Facilities */}
            <section className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 w-full gap-2'>
                {hotel.data.facilities.map((facility, index) => (
                    <Badge
                        key={index}
                        className='border border-slate-300 p-3 bg-transparent text-slate-800 hover:bg-transparent rounded-none'
                    >
                        {facility}
                    </Badge>
                ))}
            </section>
            <section className='grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
                <p className='whitespace-pre-line text-sm md:text-base text-slate-800'>
                    {hotel.data.description}
                </p>
                <div className='h-fit'>
                    <GuestInfoForm
                        hotelId={hotel.data._id}
                        pricePerNight={hotel.data.pricePerNight}
                    />
                </div>
            </section>
        </main>
    );
};

export default HotelDetails;
