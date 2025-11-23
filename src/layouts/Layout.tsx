import { ReactNode } from 'react';

import Header from '../components/Header.tsx';
import Hero from '../components/Hero.tsx';
import Footer from '../components/Footer.tsx';
import SearchBar from '@/components/SearchBar.tsx';
import { useUserSession } from '@/api/users.api.ts';
import { MobileSearchBar } from '@/components/MobileSearchBar.tsx';

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props) => {
    const { isLoggedIn } = useUserSession();
    return (
        <div className='flex flex-col min-h-screen mx-auto'>
            <Header />
            {isLoggedIn && (
                <>
                    <Hero />
                    <div className='px-4 lg:px-0 lg:mx-auto'>
                        <MobileSearchBar />
                        <SearchBar />
                    </div>
                </>
            )}
            <div className='flex-grow px-4 sm:px-6 lg:px-8 py-10 w-full lg:max-w-7xl lg:mx-auto'>
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
