// Authentication.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Auth from "../src/pages/Auth/Auth";

test('successful login', () => {
  const { getByLabelText, getByText } = render(<Auth />);
  
  // Simulate user input and button click
  fireEvent.change(getByLabelText('Email'), { target: { value: 'dinudissa@icloud.com' } });
  fireEvent.change(getByLabelText('Password'), { target: { value: '1234' } });
  fireEvent.click(getByText('Login'));

  // Assert that the user is logged in
  expect(getByText('Welcome, testuser!')).toBeInTheDocument();
});

test('unsuccessful login', () => {
  const { getByLabelText, getByText } = render(<Auth />);
  
  // Simulate user input and button click with incorrect credentials
  fireEvent.change(getByLabelText('Email'), { target: { value: 'dinudissa@icloud.com' } });
  fireEvent.change(getByLabelText('Password'), { target: { value: 'wrongpassword' } });
  fireEvent.click(getByText('Login'));

  // Assert that an error message is displayed
  expect(getByText('Incorrect username or password.')).toBeInTheDocument();
});

// test('logout', () => {
//   const { getByText } = render(<Auth />);
  
//   // Simulate user clicking the logout button
//   fireEvent.click(getByText('Logout'));

//   // Assert that the user is logged out
//   expect(getByText('Please log in.')).toBeInTheDocument();
// });
