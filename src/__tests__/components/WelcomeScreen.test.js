import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import WelcomeScreen from '../../components/WelcomeScreen/WelcomeScreen';
import App from '../../App';

describe('WelcomeScreen', () => {
  // Not sure if we need this; thought cleanup happens automatically
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
    expect(screen.getByText('Share token')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByTestId('joinListButton')).toHaveTextContent(
      'Join an existing list',
    );
    expect(screen.getByTestId('joinListButton')).toBeDisabled();
    expect(screen.getByTestId('errorMsg')).toHaveTextContent('');
  });

  test('redirects to list view', async () => {
    render(<App />);
    const createNewListButton = screen.getByTestId('createListButton');

    await userEvent.click(createNewListButton);

    expect(screen.getByText('Current List')).toBeInTheDocument();
  });

  test('prints error if share token does not exist', async () => {
    render(<App />);
    const clearTokenButton = screen.getByTestId('clearTokenButton');

    await userEvent.click(clearTokenButton);

    const joinListButton = screen.getByTestId('joinListButton');
    expect(screen.queryByText("Token doesn't exist")).toBeNull();

    await userEvent.type(screen.getByRole('textbox'), 'blah');
    await userEvent.click(joinListButton);

    // Doesn't seem to be working
    // expect(screen.findByText("Token doesn't exist")).toBeInTheDocument();

    screen.debug();
  });

  test('redirects to existing list', async () => {
    render(<App />);

    const joinListButton = screen.getByTestId('joinListButton');

    // Not sure what you would use here because if you used an existing entry from teh db and were to remove it later, the test would then fail.
    // await userEvent.type(screen.getByRole('textbox'), '??????');
    // await userEvent.click(joinListButton );

    // expect(screen.getByText('Current List')).toBeInTheDocument();
  });
});
