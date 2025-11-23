import { useEffect, useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import {
    SearchState,
    TSearch,
    useSearchStore,
} from '@/context/hotel.context.ts';
import {
    PermissionName,
    PermissionResponseSchema,
    SearchParamsSchema,
} from '@/types.ts';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// export function debouncePromise<TArgs, TResult>(
//   fn: (args: TArgs) => TResult,
//   delay: number,
// ): (args: TArgs) => Promise<TResult> {
//   let timer: ReturnType<typeof setTimeout>;
//   let resolver: (value: TResult) => void;
//
//   return (args: TArgs) =>
//     new Promise<TResult>((resolve) => {
//       clearTimeout(timer);
//       resolver = resolve;
//       timer = setTimeout(() => {
//         const result = fn(args);
//         resolver(result);
//       }, delay);
//     });
// }

export function useDebouncedStoreValue(
    selector: (state: SearchState) => TSearch,
    delay: number
): SearchParamsSchema {
    const value = useSearchStore(selector);
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return {
        ...debounced,
        adultCount: debounced.adultCount.toString(),
        childCount: debounced.childCount.toString(),
        checkIn: debounced.checkIn.toISOString(),
        checkOut: debounced.checkOut.toISOString(),
    };
}

export const canManageHotels = (
    data: PermissionResponseSchema | undefined,
    isLoading: boolean,
    error: Error | null
): boolean => {
    const manageHotelsPermission = [
        PermissionName.HOTELS_CREATE,
        PermissionName.HOTELS_EDIT,
        PermissionName.HOTELS_DELETE,
    ];

    let hasPermission = false;
    if (!isLoading && !error && data && data.success) {
        hasPermission =
            data.data?.permissions?.some(permission =>
                manageHotelsPermission.includes(permission as PermissionName)
            ) || false;
    }
    return hasPermission;
};
