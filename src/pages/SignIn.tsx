import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';

import { loginSchema, type LoginSchema } from '@/types.ts';
import { useSignInApiHandler } from '@/api/users.api.ts';
import { Link } from 'react-router';

const SignIn = () => {
    const logInUserHandler = useSignInApiHandler();
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSignInSubmit = async (data: LoginSchema) => {
        await logInUserHandler(data);
    };
    return (
        <Form {...form}>
            <form
                className='flex flex-col gap-5 lg:max-w-xl w-full mx-auto'
                onSubmit={form.handleSubmit(onSignInSubmit)}
            >
                <h2 className='text-xl md:text-3xl font-bold'>
                    Login into your account
                </h2>
                <FormField
                    name='email'
                    control={form.control}
                    render={({ field }) => {
                        return (
                            <FormItem className='w-full'>
                                <FormLabel className='text-gray-600 text-tiny md:text-base'>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type='email'
                                        placeholder='e.g. jdoe@example.com'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    name='password'
                    control={form.control}
                    render={({ field }) => {
                        return (
                            <FormItem className='w-full'>
                                <FormLabel className='text-gray-600 text-sm md:text-base'>
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <span className='text-slate-600 text-xs md:text-sm'>
                    Don&apos;t an account?{' '}
                    <Link
                        to='/register'
                        className='text-blue-800 hover:underline'
                    >
                        Click here to sign up.
                    </Link>{' '}
                </span>
                <Button
                    type='submit'
                    className='flex self-end bg-blue-600 text-sm md:text-base text-white font-bold py-2 px-5 max-w-1/4 min-w-fit rounded-none hover:bg-blue-500'
                >
                    Login
                </Button>
            </form>
        </Form>
    );
};

export default SignIn;
