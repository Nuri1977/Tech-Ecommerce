import { render, screen } from '../../test-utils';
import Categories from './Categories';

describe('AdminCategories', () => {
  it('should render the categories section with the correct title', () => {
    render(<Categories />);
    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
  });
});
