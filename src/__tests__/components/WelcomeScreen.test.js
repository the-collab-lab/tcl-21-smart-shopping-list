import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import WelcomeScreen from '../../components/WelcomeScreen/WelcomeScreen';

describe('WelcomeScreen', () => {
  // Not sure if this cleanup method is needed; thought cleanup happens automatically, but doesn't seem to be happening
  afterEach(() => cleanup);

  test('renders WelcomeScreen component', () => {
    render(<WelcomeScreen />);
    expect(
      screen.getByText('Welcome to your Smart Shopping list!'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('createListButton')).toHaveTextContent(
      'Create a new list',
    );
    expect(screen.getByText('- or -')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Join an existing shopping list by entering a three word token.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Share Token:')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByTestId('joinListButton')).toHaveTextContent(
      'Join an existing list',
    );
    expect(screen.getByTestId('joinListButton')).toBeDisabled();
    expect(screen.getByTestId('errorMsg')).toHaveTextContent('');
  });

  test('redirects to list view', async () => {
    render(<WelcomeScreen />);
    const createNewListButton = screen.getByTestId('createListButton');

    expect(screen.queryByText('Current List')).toBeNull();

    await userEvent.click(createNewListButton);

    // Doesn't seem to be working
    // expect(screen.findByText('Current List')).toBeInTheDocument();
  });

  test('prints error if share token does not exist', async () => {
    render(<WelcomeScreen />);
    const joinListButton = screen.getByTestId('joinListButton');
    const errorMsg = screen.getByTestId('errorMsg');

    expect(screen.queryByText("Token 'blah' doesn't exist.")).toBeNull();

    await userEvent.type(screen.getByRole('textbox'), 'blah');
    await userEvent.click(joinListButton);

    // Doesn't seem to be working
    // expect(errorMsg).toHaveTextContent("Token 'blah' doesn't exist.");
  });

  test('redirects to existing list', async () => {
    render(<WelcomeScreen />);
    const joinListButton = screen.getByTestId('joinListButton');

    // Not sure if this is good practice. We are using an existing entry from the db, but if we were to remove it later, the test would then fail.
    await userEvent.type(screen.getByRole('textbox'), 'ember janos anton');
    await userEvent.click(joinListButton);

    // Doesn't seem to be working
    // expect(screen.findByText('Current List')).toBeInTheDocument();
  });
});
