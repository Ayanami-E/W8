import { render, screen } from '@testing-library/react';
import App from '../../App';

describe('App Component', () => {
  test('renders Hello World', () => {
    render(<App />);
    const headingElement = screen.getByText(/hello world!/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('has correct class name', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toHaveClass('App');
  });
});