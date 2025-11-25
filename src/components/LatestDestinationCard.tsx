import { HotelData } from '@/types.ts';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { Link } from 'react-router';

type LatestDestinationCardProps = {
    hotel: HotelData;
};

const LatestDestinationCard = ({ hotel }: LatestDestinationCardProps) => (
    <Link
        to={`/detail/${hotel._id}`}
        className='relative cursor-pointer overflow-hidden rounded-none'
    >
        <Card className='h-[300px] py-0 rounded-none shadow-xs'>
            <img
                src={
                    Array.isArray(hotel.imageUrls)
                        ? hotel.imageUrls[0]
                        : hotel.imageUrls
                }
                alt={`${hotel.name}-image`}
                className='w-full h-full object-cover object-center'
            />

            <CardContent className='absolute bottom-0 p-4 bg-black/50 w-full'>
                <p className='tracking-tight font-semibold text-white text-sm md:text-base'>
                    {hotel.name}
                </p>
            </CardContent>
        </Card>
    </Link>
);

export default LatestDestinationCard;
