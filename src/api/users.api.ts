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

// Constants
const API_BASE_URL = configVars.VITE_API_BASE_URL;
const API_CONFIG = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
} as const;

// Query Keys
export const USER_QUERY_KEYS = {
    session: ['fetch-session'] as const,
    currentUser: ['fetch-logged-in-user'] as const,
    permissions: ['fetch-logged-in-user-permissions'] as const,
} as const;

// API Functions
const registerUserRequest = async (
    formData: RegisterSchema
): Promise<CreateUserResponseSchema> => {
    const res = await axios.post<
        CreateUserResponseSchema,
        AxiosResponse<CreateUserResponseSchema>,
        RegisterSchema
    >(`${API_BASE_URL}/api/users/register`, formData, API_CONFIG);

    return res.data;
};

const signInUserRequest = async (
    formData: LoginSchema
): Promise<LoginResponseSchema> => {
    const res = await axios.post<
        LoginResponseSchema,
        AxiosResponse<LoginResponseSchema>,
        LoginSchema
    >(`${API_BASE_URL}/api/auth/login`, formData, API_CONFIG);

    return res.data;
};

const signOutRequest = async (): Promise<void> => {
    await axios.post(`${API_BASE_URL}/api/auth/logout`, null, {
        withCredentials: true,
    });
};

const fetchUserByCookie = async (): Promise<ValidTokenResponseSchema> => {
    const res = await axios.get<ValidTokenResponseSchema>(
        `${API_BASE_URL}/api/users/validate-token`,
        { withCredentials: true }
    );

    return res.data;
};

const fetchCurrentUser = async (): Promise<UserResponse> => {
    const res = await axios.get<UserResponse>(`${API_BASE_URL}/api/users/me`, {
        withCredentials: true,
    });

    if (!res.data.success) {
        throw new Error(res.data.message || 'Failed to fetch user');
    }

    return res.data;
};

const fetchCurrentUserPermissions =
    async (): Promise<PermissionResponseSchema> => {
        const res = await axios.get<PermissionResponseSchema>(
            `${API_BASE_URL}/api/permissions/me`,
            { withCredentials: true }
        );

        if (!res.data.success) {
            throw new Error(res.data.message || 'Failed to fetch permissions');
        }

        return res.data;
    };

// React Hooks
export const useRegisterApiHandler = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutateAsync: createNewUserHandler } = useMutation({
        mutationFn: registerUserRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: USER_QUERY_KEYS.session,
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

    const { mutateAsync: logInUserHandler } = useMutation({
        mutationFn: signInUserRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: USER_QUERY_KEYS.session,
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

    const { mutate: logOutUserHandler } = useMutation({
        mutationFn: signOutRequest,
        onSuccess: () => {
            // Invalidate all user-related queries at once
            queryClient.invalidateQueries({
                queryKey: USER_QUERY_KEYS.session,
            });
            queryClient.invalidateQueries({
                queryKey: USER_QUERY_KEYS.currentUser,
            });
            queryClient.invalidateQueries({
                queryKey: USER_QUERY_KEYS.permissions,
            });

            toast.success('Successfully logged out.');
            navigate('/sign-in', { replace: true });
        },
        onError: (err: Error) => {
            toast.error(err.message || 'Something went wrong');
        },
    });

    return logOutUserHandler;
};

export const useUserSession = () => {
    const { data, isError } = useQuery({
        queryKey: USER_QUERY_KEYS.session,
        queryFn: fetchUserByCookie,
        retry: false,
    });

    return { data, isLoggedIn: !isError };
};

export const useCurrentUserSession = () => {
    const { data, isLoading } = useQuery({
        queryKey: USER_QUERY_KEYS.currentUser,
        queryFn: fetchCurrentUser,
    });

    return { data, isLoading };
};

export const useFetchUserPermissions = (isLoggedIn: boolean) => {
    const { data, isLoading, error } = useQuery({
        queryKey: USER_QUERY_KEYS.permissions,
        queryFn: fetchCurrentUserPermissions,
        enabled: isLoggedIn,
    });

    return { data, isLoading, error };
};
