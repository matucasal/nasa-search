import { render, screen } from '@testing-library/react';
import App from './App';

test('renders My project text', () => {
  render(<App />);
  const linkElement = screen.getByText(/My project/i);
  expect(linkElement).toBeInTheDocument();
});
