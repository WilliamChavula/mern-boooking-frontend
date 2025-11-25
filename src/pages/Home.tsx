import { useGetAllHotels } from '@/api/hotel.api.ts';
import { Loader, TriangleAlert } from 'lucide-react';
import LatestDestinationCard from '@/components/LatestDestinationCard.tsx';

const Home = () => {
    const { hotels, isLoading } = useGetAllHotels();

    if (isLoading) {
        return (
            <div className='min-h-1/2 flex items-center justify-center'>
                <Loader className='mr-2 animate-spin' /> Loading...
            </div>
        );
    }

    if (!hotels || !hotels.success) {
        return (
            <div className='min-h-1/2 flex flex-col md:flex-row items-center justify-center border border-gray-200 gap-4 p-4'>
                <TriangleAlert size={32} className='text-orange-400' />
                <p className='text-md md:text-lg text-gray-800 font-semibold'>
                    No Hotels Found
                </p>
            </div>
        );
    }

    const topRow = hotels.data.slice(0, 2);
    const bottomRow = hotels.data.slice(2);

    return (
        <main className='space-y-3 mx-auto w-full lg:max-w-7xl'>
            <h1 className='text-sm md:text-base lg:text-xl font-semibold'>
                Latest Destinations
            </h1>
            <p className='text-xs md:text-sm'>
                Most recent destinations added by our hosts
            </p>
            <section className='grid gap-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {topRow.map(hotel => (
                        <LatestDestinationCard hotel={hotel} key={hotel._id} />
                    ))}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {bottomRow.map(hotel => (
                        <LatestDestinationCard hotel={hotel} key={hotel._id} />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Home;
