import React from 'react';
import { render } from '@testing-library/react';
import HomeSlider from './HomeSlider';

describe('HomeSlider', () => {
  it('renders the component', () => {
    const { getByTestId } = render(<HomeSlider />);
    const slider = getByTestId('home-slider');
    expect(slider).toBeInTheDocument();
  });

  it('renders the correct number of slides', () => {
    const { getAllByTestId } = render(<HomeSlider />);
    const slides = getAllByTestId('slide');
    expect(slides.length).toEqual(5);
  });
});
