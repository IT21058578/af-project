import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useCreateCheckoutSessionMutation } from '../src/store/api/booking-api-slice';
import Total from '../src/components/Tour/bookingTotal';

jest.mock('../../store/api/booking-api-slice', () => ({
  useCreateCheckoutSessionMutation: jest.fn(),
}));

test('renders Total component', () => {
    render(<Total tripPackage={{ id: 1 }} />);
    const linkElement = screen.getByText(/Make the Booking/i);
    expect(linkElement).toBeInTheDocument();
  });
  