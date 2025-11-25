'use client';

import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Earth, Search } from 'lucide-react';
import { useSearchStore } from '@/context/hotel.context';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function MobileSearchBar() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { search, setSearch, updateSearch, resetSearch } = useSearchStore();

    const maxDate = new Date();
    maxDate.setFullYear(new Date().getFullYear() + 1);
    const checkOutMinDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const handleSearchSubmit = (evt: FormEvent) => {
        evt.preventDefault();

        setSearch(search);
        setOpen(false);

        navigate('/search');
    };

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger className='flex lg:hidden items-center bg-white px-2 py-4 h-12 w-full shadow-none rounded-none justify-start text-gray-400 border border-input hover:bg-accent hover:text-accent-foreground'>
                <Search size={25} className='mr-2 text-gray-500' />
                {search.destination || 'where are you going?'}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className='text-left'>
                    <DrawerTitle>Search Destination</DrawerTitle>
                    <DrawerDescription className='sr-only'>
                        Search for hotels and more
                    </DrawerDescription>
                </DrawerHeader>
                <form
                    id='mobile-search-form'
                    className='grid items-start gap-6 px-2'
                    onSubmit={handleSearchSubmit}
                >
                    <div className='grid gap-3'>
                        <div className='flex items-center flex-1 bg-white px-2 py-1 border-1 border-gray-300'>
                            <Earth size={25} className='mr-2 text-gray-500' />
                            <Input
                                placeholder='where are you going?'
                                className='text-sm text-gray-700 md:text-base w-full focus:outline-none shadow-none border-none focus-visible:ring-0'
                                value={search.destination}
                                onChange={e =>
                                    updateSearch({
                                        destination: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className='grid gap-3'>
                        <div className='flex bg-white px-2 py-1 gap-2 border-1 border-gray-300'>
                            <Label
                                htmlFor='adultCount'
                                className='text-gray-700'
                            >
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
                                            adultCount: parseInt(
                                                e.target.value
                                            ),
                                        })
                                    }
                                />
                            </Label>
                            <Label
                                htmlFor='childCount'
                                className='text-gray-700'
                            >
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
                                            childCount: parseInt(
                                                e.target.value
                                            ),
                                        })
                                    }
                                />
                            </Label>
                        </div>
                    </div>
                    <div className='grid gap-3 border-1 border-gray-300'>
                        <DatePicker
                            selected={search.checkIn}
                            onChange={date =>
                                updateSearch({ checkIn: date as Date })
                            }
                            startDate={search.checkIn}
                            endDate={search.checkOut}
                            placeholderText='Check in date'
                            className='w-full bg-white p-2 focus:outline-none text-sm text-gray-700 md:text-base'
                            minDate={new Date()}
                            maxDate={maxDate}
                            wrapperClassName='w-full'
                        />
                    </div>
                    <div className='grid gap-3 border-1 border-gray-300 mb-3'>
                        <DatePicker
                            selected={search.checkOut}
                            onChange={date =>
                                updateSearch({ checkOut: date as Date })
                            }
                            startDate={search.checkIn}
                            endDate={search.checkOut}
                            placeholderText='Check out date'
                            className='w-full bg-white p-2 focus:outline-none text-sm text-gray-700 md:text-base'
                            minDate={checkOutMinDate}
                            maxDate={maxDate}
                            wrapperClassName='w-full'
                        />
                    </div>
                </form>
                <DrawerFooter className='pt-2'>
                    <div className='flex items-center justify-center gap-2'>
                        <Button
                            form='mobile-search-form'
                            type='submit'
                            className='w-2/3 cursor-pointer h-full bg-blue-600 text-white rounded-none p-2 font-semibold hover:bg-blue-500'
                        >
                            Search
                        </Button>
                        <Button
                            type='button'
                            variant='destructive'
                            className='w-1/3 cursor-pointer h-full text-white rounded-none p-2 font-semibold hover:bg-red-500'
                            onClick={() => {
                                resetSearch();
                                setOpen(false);
                            }}
                        >
                            Clear
                        </Button>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
