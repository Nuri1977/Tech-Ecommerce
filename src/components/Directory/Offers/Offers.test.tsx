import React from 'react';
import { render, screen } from '@testing-library/react';
import Offers from './Offers';

describe('Offers component', () => {
  it('should render 6 offer cards', () => {
    render(<Offers />);
    const offerCards = screen.getAllByTestId('list-item');
    expect(offerCards).toHaveLength(6);
  });

  it('should render an image and a title for each offer card', () => {
    render(<Offers />);
    const offerCards = screen.getAllByTestId('list-item');
    offerCards.forEach((card) => {
      expect(card.querySelector('img')).toBeInTheDocument();
      expect(card.querySelector('h4')).toBeInTheDocument();
    });
  });

  it('should render the correct offer titles', () => {
    render(<Offers />);
    expect(screen.getByText('Deal of the day')).toBeInTheDocument();
    expect(screen.getByText('Offers')).toBeInTheDocument();
    expect(screen.getByText('Outlet')).toBeInTheDocument();
    expect(screen.getByText('Cell contracts')).toBeInTheDocument();
    expect(screen.getByText('My TechnoMarket')).toBeInTheDocument();
    expect(screen.getByText('Heroine week')).toBeInTheDocument();
  });
});
