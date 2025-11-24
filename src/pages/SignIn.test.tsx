import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import SignIn from './SignIn';
import * as usersApi from '@/api/users.api';

vi.mock('@/api/users.api');

describe('SignIn', () => {
  const mockSignInHandler = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(usersApi.useSignInApiHandler).mockReturnValue(mockSignInHandler);
  });

  it('renders sign in form with all fields', () => {
    render(<SignIn />);

    expect(screen.getByRole('heading', { name: /login into your account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('displays link to register page', () => {
    render(<SignIn />);

    const registerLink = screen.getByRole('link', { name: /click here to sign up/i });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  it('submits form with valid credentials', async () => {
    const user = userEvent.setup();
    render(<SignIn />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSignInHandler).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('handles form submission with email placeholder text', () => {
    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText(/jdoe@example.com/i);
    expect(emailInput).toBeInTheDocument();
  });

  it('has password field of type password', () => {
    render(<SignIn />);

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
