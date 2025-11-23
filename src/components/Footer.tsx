const Footer = () => {
    return (
        <div className='bg-blue-800 py-10'>
            <div className='container mx-auto flex flex-col md:flex-row gap-5 justify-between items-center'>
                <span className='text-lg md:text-3xl text-white font-bold tracking-tight'>
                    bookingholidays.com
                </span>
                <span className='text-white text-xs tracking-tight flex gap-4'>
                    <p className='cursor-pointer'>Privacy Policy</p>
                    <p className='cursor-pointer'>Terms & Conditions</p>
                </span>
            </div>
        </div>
    );
};

export default Footer;
