import { useFetchUserPermissions, useLogoutApiHandler } from '@/api/users.api';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { canManageHotels } from '@/lib/utils';
import { User, LogOut } from 'lucide-react';
import { Link } from 'react-router';

export function SignInMobileNavMenu() {
    const logOutUserHandler = useLogoutApiHandler();

    const { data, isLoading, error } = useFetchUserPermissions();

    const hasPermission = canManageHotels(data, isLoading, error);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='lg:hidden' asChild>
                <Button
                    variant='ghost'
                    size='icon'
                    className='size-8 rounded-full flex items-center justify-center focus-visible:border-0 focus-visible:ring-0'
                >
                    <User className='mr-2 size-6 text-white' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='start'>
                <DropdownMenuLabel className='sr-only'>
                    My Bookings
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link to='/my-bookings'>My Bookings</Link>
                    </DropdownMenuItem>
                    {hasPermission && (
                        <DropdownMenuItem>
                            <Link to='/my-hotels'>My Hotels</Link>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                        <Button
                            variant='ghost'
                            onClick={() => logOutUserHandler()}
                            className='flex has-[>svg]:px-0 gap-2 px-0 bg-white/80 rounded-none hover:bg-gray-100 text-slate-900 text-sm md:text-base cursor-pointer'
                        >
                            Sign out <LogOut className='size-4' />
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
