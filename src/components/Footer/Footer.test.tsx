import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  afterEach(cleanup);

  it('should render the footer', () => {
    const { getByTestId } = render(<Footer />);

    expect(getByTestId('footer')).toBeInTheDocument();
    expect(getByTestId('footer')).toHaveTextContent('Simpletut 2020');
  });
});
