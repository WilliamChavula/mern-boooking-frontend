import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import Register from '@/pages/Register';
import * as usersApi from '@/api/users.api';

vi.mock('@/api/users.api');

describe('Register', () => {
    const mockRegisterHandler = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(usersApi.useRegisterApiHandler).mockReturnValue(
            mockRegisterHandler
        );
    });

    it('renders registration form with all fields', () => {
        render(<Register />);

        expect(
            screen.getByRole('heading', { name: /create an account/i })
        ).toBeInTheDocument();
        expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /create an account/i })
        ).toBeInTheDocument();
    });

    it('displays link to sign in page', () => {
        render(<Register />);

        const signInLink = screen.getByRole('link', {
            name: /click here to sign in/i,
        });
        expect(signInLink).toBeInTheDocument();
        expect(signInLink).toHaveAttribute('href', '/sign-in');
    });

    it('submits form with valid data', async () => {
        const user = userEvent.setup();
        render(<Register />);

        const firstNameInput = screen.getByLabelText(/first name/i);
        const lastNameInput = screen.getByLabelText(/last name/i);
        const emailInput = screen.getByLabelText(/^email$/i);
        const passwordInput = screen.getByLabelText(/^password$/i);
        const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
        const submitButton = screen.getByRole('button', {
            name: /create an account/i,
        });

        await user.type(firstNameInput, 'John');
        await user.type(lastNameInput, 'Doe');
        await user.type(emailInput, 'john.doe@example.com');
        await user.type(passwordInput, 'password123');
        await user.type(confirmPasswordInput, 'password123');
        await user.click(submitButton);

        await waitFor(() => {
            expect(mockRegisterHandler).toHaveBeenCalledWith({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                confirmPassword: 'password123',
            });
        });
    });

    it('displays placeholder text for inputs', () => {
        render(<Register />);

        expect(screen.getByPlaceholderText(/e\.g\. john/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/e\.g\. doe/i)).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText(/jdoe@example.com/i)
        ).toBeInTheDocument();
    });

    it('has password fields of type password', () => {
        render(<Register />);

        const passwordInput = screen.getByLabelText(/^password$/i);
        const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

        expect(passwordInput).toHaveAttribute('type', 'password');
        expect(confirmPasswordInput).toHaveAttribute('type', 'password');
    });
});
