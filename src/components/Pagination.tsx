import {
    Pagination as PaginationComponent,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils.ts';
import { Button } from '@/components/ui/button.tsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type PaginationProps = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
    next?: number;
};

const Pagination = ({ page, pages, next, onPageChange }: PaginationProps) => {
    const mobileScreen = window.matchMedia('(width >= 768px)');
    return (
        <PaginationComponent className='flex justify-center'>
            <PaginationContent className='text-sm text-slate-300'>
                <PaginationItem className='px-2 py-1 text-slate-800'>
                    <Button
                        variant='ghost'
                        className={cn('cursor-pointer', {
                            'bg-gray-300': page === pages,
                        })}
                        onClick={() => onPageChange(page - 1)}
                        disabled={page === 1}
                    >
                        <ChevronLeft className='size-4' /> Previous
                    </Button>
                </PaginationItem>
                {mobileScreen.matches &&
                    Array.from({ length: pages }).map((_, idx) => {
                        const currentPage = idx + 1;
                        return (
                            <PaginationItem
                                key={idx}
                                className='px-2 py-1 text-slate-800'
                            >
                                <Button
                                    variant='ghost'
                                    className={cn('cursor-pointer', {
                                        'bg-gray-300': page === currentPage,
                                    })}
                                    onClick={() => onPageChange(currentPage)}
                                >
                                    {currentPage}
                                </Button>
                            </PaginationItem>
                        );
                    })}
                {!mobileScreen.matches ? (
                    <PaginationItem className='px-2 py-1 text-slate-800'>
                        <Button variant='ghost' className='bg-gray-300'>
                            {page}
                        </Button>
                    </PaginationItem>
                ) : (
                    <PaginationItem>
                        {pages > 3 && <PaginationEllipsis />}
                    </PaginationItem>
                )}
                <PaginationItem className='px-2 py-1 text-slate-800'>
                    <Button
                        variant='ghost'
                        className={cn('cursor-pointer', {
                            'bg-gray-300': page === pages,
                        })}
                        onClick={() => onPageChange(next as number)}
                        disabled={next === null}
                    >
                        Next <ChevronRight className='size-4' />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </PaginationComponent>
    );
};

export default Pagination;
