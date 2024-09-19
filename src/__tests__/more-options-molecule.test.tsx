import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MoreOptionsMolecule from '@/components/molecules/more-options-molecule';
import '@testing-library/jest-dom';
import { useTaskStore } from '@/stores/tasks/tasks.store';
import ConfirmUpdateModal from '@/components/molecules/confirm-update-modal-molecule';

// Mock del store de tareas
jest.mock('../stores/tasks/tasks.store', () => ({
  useTaskStore: jest.fn(),
}));

describe('MoreOptionsMolecule', () => {
  const mockDeleteTask = jest.fn();
  const mockUpdateTask = jest.fn();
  const taskId = 1;

  beforeEach(() => {
    (useTaskStore as jest.MockedFunction<typeof useTaskStore>).mockReturnValue({
      deleteTask: mockDeleteTask,
      updateTask: mockUpdateTask
    });
  });

  test('should toggle the options menu visibility on more button click', () => {
    render(<MoreOptionsMolecule taskId={taskId} />);

    // Verifica que el menú de opciones está oculto inicialmente
    expect(screen.queryByTestId('delete-button')).toBeNull();
    expect(screen.queryByTestId('update-button')).toBeNull();

    // Abre el menú de opciones
    fireEvent.click(screen.getByTestId('more-button'));


    // Verifica que el menú de opciones es visible
    expect(screen.getByTestId('delete-button')).toBeInTheDocument();
    expect(screen.getByTestId('update-button')).toBeInTheDocument();

    // Cierra el menú de opciones
    fireEvent.click(screen.getByTestId('more-button'));

    // Verifica que el menú de opciones está oculto
    expect(screen.queryByTestId('delete-button')).toBeNull();
    expect(screen.queryByTestId('update-button')).toBeNull();
  });

  test('should open and close the delete confirmation modal', () => {
    render(<MoreOptionsMolecule taskId={taskId} />);

    // Abre el menú de opciones
    fireEvent.click(screen.getByTestId('more-button'));

    // Abre el modal de confirmación de eliminación
    fireEvent.click(screen.getByTestId('delete-button'));

    // Verifica que el modal de confirmación de eliminación está visible
    expect(screen.getByText(/Confirmación/)).toBeInTheDocument();

    // Cancela la eliminación
    fireEvent.click(screen.getByText(/Cancelar/));

    // Verifica que el modal de confirmación se cerró
    expect(screen.queryByText(/Confirmación/)).not.toBeInTheDocument();
  });

  test('should call deleteTask and close the modal on confirm', async () => {
    render(<MoreOptionsMolecule taskId={taskId} />);

    // Abre el menú de opciones
    fireEvent.click(screen.getByTestId('more-button'));

    // Abre el modal de confirmación de eliminación
    fireEvent.click(screen.getByTestId('delete-button'));

    // Confirma la eliminación
    fireEvent.click(screen.getByText(/Eliminar/));

    // Verifica que deleteTask fue llamada
    await waitFor(() => expect(mockDeleteTask).toHaveBeenCalledWith(taskId));

    // Verifica que el modal de confirmación se cerró
    expect(screen.queryByText(/Confirmación/)).not.toBeInTheDocument();
  });

  test('should open and close the update confirmation modal', () => {
    render(<MoreOptionsMolecule taskId={taskId} />);

    // Abre el menú de opciones
    fireEvent.click(screen.getByTestId('more-button'));

    // Abre el modal de confirmación de actualización
    fireEvent.click(screen.getByTestId('update-button'));

    // Verifica que el modal de confirmación de actualización está visible
    expect(screen.getByText(/Editar/)).toBeInTheDocument();


    // Cancela la actualización
    fireEvent.click(screen.getByText(/Cancelar/));

    // Verifica que el modal de confirmación se cerró
    expect(screen.queryByText(/Confirmar actualización/)).not.toBeInTheDocument();
  });

  test('should update task information and call updateTask on confirm', async () => {
    render(<ConfirmUpdateModal isModalUpdateOpen={true} onClose={() => {}} taskId={taskId} />);

    // Cambia los valores del formulario
    fireEvent.change(screen.getByLabelText(/Título/), { target: { value: 'New Title' } });
    fireEvent.change(screen.getByLabelText(/Descripción/), { target: { value: 'New Description' } });
    fireEvent.change(screen.getByLabelText(/Estado/), { target: { value: 'COMPLETED' } });

    // Confirma la actualización
    fireEvent.click(screen.getByText(/Editar/));

    // Verifica que updateTask fue llamada con los valores correctos
    await waitFor(() => {
      expect(mockUpdateTask).toHaveBeenCalledWith(taskId, {
        title: 'New Title',
        description: 'New Description',
        status: 'COMPLETED',
      });
    });

    // Verifica que el modal se cerró después de la actualización
    await waitFor(() => {
      expect(screen.queryByText(/Editar tarea/)).not.toBeInTheDocument();
    });
  });
});
