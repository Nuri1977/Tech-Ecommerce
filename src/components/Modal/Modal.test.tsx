import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  it('renders children when show is true', () => {
    const { getByTestId } = render(
      <Modal hideModal={false} toggleModal={() => {}}>
        <div data-testid="modal-content">Hello World</div>
      </Modal>
    );

    expect(getByTestId('modal-content')).toBeInTheDocument();
  });

  it('does not render children when show is false', () => {
    const { queryByTestId } = render(
      <Modal hideModal={true} toggleModal={() => {}}>
        <div data-testid="modal-content">Hello World</div>
      </Modal>
    );

    expect(queryByTestId('modal-content')).toBeNull();
  });

  it('calls toggleModal when modalOverlay is clicked', () => {
    const toggleModalMock = jest.fn();
    const { getByTestId } = render(
      <Modal hideModal={false} toggleModal={toggleModalMock}>
        <div>Hello World</div>
      </Modal>
    );

    fireEvent.click(getByTestId('modalOverlay'));

    expect(toggleModalMock).toHaveBeenCalledTimes(1);
  });
});
