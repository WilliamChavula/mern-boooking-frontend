import axios, { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { useLocation, useNavigate } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    CreateUserResponseSchema,
    LoginResponseSchema,
    LoginSchema,
    PermissionResponseSchema,
    RegisterSchema,
    UserResponse,
    ValidTokenResponseSchema,
} from '@/types.ts';
import { configVars } from '@/config';

export const useRegisterApiHandler = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const registerUserRequest = async (
        formData: RegisterSchema
    ): Promise<CreateUserResponseSchema> => {
        const res = await axios.post<
            CreateUserResponseSchema,
            AxiosResponse<CreateUserResponseSchema>,
            RegisterSchema
        >(`${configVars.VITE_API_BASE_URL}/api/users/register`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.status !== 201) {
            throw new Error(res.data.message || res.statusText);
        }

        return res.data;
    };

    const { mutateAsync: createNewUserHandler } = useMutation({
        mutationFn: registerUserRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetch-session'],
            });
            toast.success('User created successfully.');
            navigate('/');
        },
        onError: (err: Error) => {
            toast.error(err.message || 'Something went wrong');
        },
    });

    return createNewUserHandler;
};

export const useSignInApiHandler = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();

    const signInUserRequest = async (
        formData: LoginSchema
    ): Promise<LoginResponseSchema> => {
        const res = await axios.post<
            LoginResponseSchema,
            AxiosResponse<LoginResponseSchema>,
            LoginSchema
        >(`${configVars.VITE_API_BASE_URL}/api/auth/login`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.status !== 200) {
            throw new Error(
                res.data.message ||
                    'Something went wrong. Please try again later.'
            );
        }

        return res.data;
    };

    const { mutateAsync: logInUserHandler } = useMutation({
        mutationFn: signInUserRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetch-session'],
            });

            toast.success('Successfully logged in.');
            navigate(location.state?.from?.pathname || '/');
        },
        onError: (err: Error) => {
            toast.error(err.message || 'Something went wrong');
        },
    });

    return logInUserHandler;
};

export const useLogoutApiHandler = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const signOutRequest = async () => {
        const res = await axios.post(
            `${configVars.VITE_API_BASE_URL}/api/auth/logout`,
            null,
            {
                withCredentials: true,
            }
        );
        if (res.status !== 200) {
            throw new Error('Error logging out.');
        }
    };

    const { mutate: logOutUserHandler } = useMutation({
        mutationFn: signOutRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetch-session'],
            });
            queryClient.invalidateQueries({
                queryKey: ['fetch-logged-in-user'],
            });
            queryClient.invalidateQueries({
                queryKey: ['fetch-logged-in-user-permissions'],
            });

            toast.success('Successfully logged out.');
            navigate('/sign-in', {
                replace: true,
            });
            // navigate(0);
        },

        onError: (err: Error) => {
            toast.error(err.message || 'Something went wrong');
        },
    });
    return logOutUserHandler;
};

export const useUserSession = () => {
    const fetchUserByCookie = async () => {
        const res = await axios.get<ValidTokenResponseSchema>(
            `${configVars.VITE_API_BASE_URL}/api/users/validate-token`,
            {
                withCredentials: true,
            }
        );

        if (res.status !== 200) {
            throw new Error('Failed to get user session.');
        }

        return res.data;
    };
    const { data, isError } = useQuery({
        queryKey: ['fetch-session'],
        queryFn: fetchUserByCookie,
        retry: false,
    });

    return { data, isLoggedIn: !isError };
};

export const useCurrentUserSession = () => {
    const fetchCurrentUser = async (): Promise<UserResponse> => {
        const res = await axios.get<UserResponse>(
            `${configVars.VITE_API_BASE_URL}/api/users/me`,
            {
                withCredentials: true,
            }
        );

        if (!res.data.success || res.status !== 200) {
            throw new Error(res.data.message || res.statusText);
        }

        return res.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: ['fetch-logged-in-user'],
        queryFn: fetchCurrentUser,
    });

    return { data, isLoading };
};

export const useFetchUserPermissions = (isLoggedIn: boolean) => {
    const fetchCurrentUserPermissions =
        async (): Promise<PermissionResponseSchema> => {
            const res = await axios.get<PermissionResponseSchema>(
                `${configVars.VITE_API_BASE_URL}/api/permissions/me`,
                {
                    withCredentials: true,
                }
            );

            if (!res.data.success || res.status !== 200) {
                throw new Error(res.data.message || res.statusText);
            }

            return res.data;
        };

    const { data, isLoading, error } = useQuery({
        queryKey: ['fetch-logged-in-user-permissions'],
        queryFn: fetchCurrentUserPermissions,
        enabled: isLoggedIn,
    });

    return { data, isLoading, error };
};
