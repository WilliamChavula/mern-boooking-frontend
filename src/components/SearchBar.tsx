import type { FormEvent } from 'react';

import DatePicker from 'react-datepicker';

import { useSearchStore } from '@/context/hotel.context.ts';
import { Earth } from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';

import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '@/components/ui/button.tsx';
import { useNavigate } from 'react-router';

const SearchBar = () => {
    const { search, setSearch, updateSearch, resetSearch } = useSearchStore();
    const navigate = useNavigate();

    const maxDate = new Date();
    maxDate.setFullYear(new Date().getFullYear() + 1);
    const checkOutMinDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const handleSearchSubmit = (evt: FormEvent) => {
        evt.preventDefault();

        setSearch(search);

        navigate('/search');
    };

    return (
        <form
            onSubmit={handleSearchSubmit}
            className='-mt-8 p-3 bg-orange-500 rounded-none shadow-md lg:grid hidden lg:grid-cols-5 items-center gap-4'
        >
            <div className='flex items-center flex-1 bg-white px-2 py-1'>
                <Earth size={25} className='mr-2 text-gray-500' />
                <Input
                    placeholder='where are you going?'
                    className='text-sm text-gray-700 md:text-base w-full focus:outline-none shadow-none border-none focus-visible:ring-0'
                    value={search.destination}
                    onChange={e =>
                        updateSearch({ destination: e.target.value })
                    }
                />
            </div>
            <div className='flex bg-white px-2 py-1 gap-2'>
                <Label htmlFor='adultCount' className='text-gray-700'>
                    Adults:
                    <Input
                        id='adultCount'
                        className='text-sm text-gray-700 md:text-base w-full focus:outline-none shadow-none border-none focus-visible:ring-0'
                        type='number'
                        min={1}
                        max={20}
                        value={search.adultCount}
                        onChange={e =>
                            updateSearch({
                                adultCount: parseInt(e.target.value),
                            })
                        }
                    />
                </Label>
                <Label htmlFor='childCount' className='text-gray-700'>
                    Children
                    <Input
                        id='childCount'
                        className='text-sm text-gray-700 md:text-base w-full focus:outline-none shadow-none border-none focus-visible:ring-0'
                        type='number'
                        min={0}
                        max={20}
                        value={search.childCount}
                        onChange={e =>
                            updateSearch({
                                childCount: parseInt(e.target.value),
                            })
                        }
                    />
                </Label>
            </div>
            <div>
                <DatePicker
                    selected={search.checkIn}
                    onChange={date => updateSearch({ checkIn: date as Date })}
                    startDate={search.checkIn}
                    endDate={search.checkOut}
                    placeholderText='Check in date'
                    className='min-w-full bg-white p-2 focus:outline-none text-sm text-gray-700 md:text-base'
                    minDate={new Date()}
                    maxDate={maxDate}
                    wrapperClassName='min-w-full'
                />
            </div>
            <div>
                <DatePicker
                    selected={search.checkOut}
                    onChange={date => updateSearch({ checkOut: date as Date })}
                    startDate={search.checkIn}
                    endDate={search.checkOut}
                    placeholderText='Check out date'
                    className='min-w-full bg-white p-2 focus:outline-none text-sm text-gray-700 md:text-base'
                    minDate={checkOutMinDate}
                    maxDate={maxDate}
                    wrapperClassName='min-w-full'
                />
            </div>
            <div className='flex items-center justify-center gap-2'>
                <Button
                    type='submit'
                    className='w-2/3 cursor-pointer h-full bg-blue-600 text-white rounded-none p-2 font-semibold hover:bg-blue-500'
                >
                    Search
                </Button>
                <Button
                    type='button'
                    variant='destructive'
                    className='w-1/3 cursor-pointer h-full text-white rounded-none p-2 font-semibold hover:bg-red-500'
                    onClick={resetSearch}
                >
                    Clear
                </Button>
            </div>
        </form>
    );
};

export default SearchBar;
