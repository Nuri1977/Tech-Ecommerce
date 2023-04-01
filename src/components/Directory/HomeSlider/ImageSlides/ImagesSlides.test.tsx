import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageSlides from './ImageSlides';

const slides = [
  {
    subtitle: 'Slide 1 subtitle',
    title: 'Slide 1 title',
    description: 'Slide 1 description',
    image: 'slide1.jpg'
  },
  {
    subtitle: 'Slide 2 subtitle',
    title: 'Slide 2 title',
    description: 'Slide 2 description',
    image: 'slide2.jpg'
  }
];

describe('ImageSlides component', () => {
  test('renders the first slide by default', () => {
    render(<ImageSlides slides={slides} />);

    const slideTitle = screen.getByText('Slide 1 title');
    expect(slideTitle).toBeInTheDocument();
  });

  test('shows the next slide when the next button is clicked', async () => {
    render(<ImageSlides slides={slides} />);

    const nextButton = screen.getByTestId('next-slide');
    await userEvent.click(nextButton);

    const slideTitle = screen.getByText('Slide 2 title');
    expect(slideTitle).toBeInTheDocument();
  });

  test('shows the previous slide when the previous button is clicked', async () => {
    render(<ImageSlides slides={slides} />);

    const prevButton = screen.getByTestId('previos-slide');
    await userEvent.click(prevButton);

    const slideTitle = screen.getByText('Slide 2 title');
    expect(slideTitle).toBeInTheDocument();
  });

  test('shows the clicked slide when a dot is clicked', async () => {
    render(<ImageSlides slides={slides} />);

    const secondDot = screen.getAllByTestId('slide')[1];
    await userEvent.click(secondDot);

    const slideTitle = screen.getByText('Slide 2 title');
    expect(slideTitle).toBeInTheDocument();
  });
});
