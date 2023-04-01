import React from 'react';
import { render } from '../../test-utils';
import Directory from './Directory';

describe('Directory', () => {
  test('renders all child components', () => {
    const { getByTestId } = render(<Directory />);

    expect(getByTestId('home-slider')).toBeInTheDocument();
    expect(getByTestId('offers')).toBeInTheDocument();
    expect(getByTestId('daily-highlights')).toBeInTheDocument();
    expect(getByTestId('popular-brands')).toBeInTheDocument();
    expect(getByTestId('recommendations')).toBeInTheDocument();
  });
});
