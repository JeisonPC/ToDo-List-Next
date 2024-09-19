import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmDeleteModal from '@/components/molecules/confirm-delete-modal-molecule';
import '@testing-library/jest-dom';

describe('ConfirmDeleteModal', () => {
  const setup = (isOpen: boolean, onClose = jest.fn(), onConfirm = jest.fn()) => {
    render(
      <ConfirmDeleteModal
        isModalDeleteOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    );
    return { onClose, onConfirm };
  };

  test('should display the modal when isModalDeleteOpen is true', () => {
    setup(true);
    expect(screen.getByText(/Confirmación/)).toBeInTheDocument();
    expect(screen.getByText(/¿Estás seguro de que deseas eliminar esta tarea?/)).toBeInTheDocument();
  });

  test('should not display the modal when isModalDeleteOpen is false', () => {
    setup(false);
    expect(screen.queryByText(/Confirmación/)).not.toBeInTheDocument();
  });

  test('should call onClose when Cancelar button is clicked', () => {
    const onClose = jest.fn();
    setup(true, onClose);
    fireEvent.click(screen.getByText(/Cancelar/));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('should call onConfirm and onClose when Eliminar button is clicked', () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    setup(true, onClose, onConfirm);
    fireEvent.click(screen.getByText(/Eliminar/));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
