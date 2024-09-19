import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SlideCreateTaskOrganism from "@/components/organisms/slide-create-task-organism";

// Mock del store de Zustand
jest.mock("../stores/tasks/tasks.store", () => ({
  useTaskStore: jest.fn(),
}));

import { useTaskStore } from "@/stores/tasks/tasks.store";

describe("SlideCreateTaskOrganism", () => {
  const mockCreateTask = jest.fn();
  const mockFetchTasks = jest.fn();

  beforeEach(() => {
    (useTaskStore as jest.MockedFunction<typeof useTaskStore>).mockReturnValue({
      createTask: mockCreateTask,
      fetchTasks: mockFetchTasks,
    });
    jest.clearAllMocks();
  });

  it('should open and close the form when clicking the create button', async () => {
    render(<SlideCreateTaskOrganism />);

    // Verificar que el formulario está inicialmente oculto
    const formContainer = screen.getByTestId('form-container');
    expect(formContainer).toHaveClass('translate-y-full');

    // Abrir el formulario
    fireEvent.click(screen.getByTestId('create-button')); // Usamos el testId del botón
    await waitFor(() => {
      expect(formContainer).toHaveClass('translate-y-0');
    });

    // Cerrar el formulario
    fireEvent.click(screen.getByTestId('create-button')); // Usamos el testId del botón
    await waitFor(() => {
      expect(formContainer).toHaveClass('translate-y-full');
    });
});

  it("should update fields correctly", () => {
    render(<SlideCreateTaskOrganism />);

    // Abrir el formulario
    fireEvent.click(screen.getByTestId('create-button'));

    // Simular entrada en los campos
    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: "New Task Title" },
    });
    fireEvent.change(screen.getByLabelText(/descripción/i), {
      target: { value: "New Task Description" },
    });
    fireEvent.change(screen.getByLabelText(/estado/i), {
      target: { value: "IN_PROGRESS" },
    });

    expect(screen.getByLabelText(/título/i)).toHaveValue("New Task Title");
    expect(screen.getByLabelText(/descripción/i)).toHaveValue(
      "New Task Description"
    );
    expect(screen.getByLabelText(/estado/i)).toHaveValue("IN_PROGRESS");
  });

  it("should call createTask with the correct data on form submit", async () => {
    render(<SlideCreateTaskOrganism />);

    // Abrir el formulario
    fireEvent.click(screen.getByTestId('create-button'));

    // Completar el formulario
    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: "New Task Title" },
    });
    fireEvent.change(screen.getByLabelText(/descripción/i), {
      target: { value: "New Task Description" },
    });
    fireEvent.change(screen.getByLabelText(/estado/i), {
      target: { value: "COMPLETED" },
    });

    // Enviar el formulario
    fireEvent.click(screen.getByRole("button", { name: /crear/i }));

    await waitFor(() => {
      expect(mockCreateTask).toHaveBeenCalledWith({
        title: "New Task Title",
        description: "New Task Description",
        status: "COMPLETED",
      });
    });
  });

  it("should close the form after submitting", async () => {
    render(<SlideCreateTaskOrganism />);

    // Abrir el formulario
    fireEvent.click(screen.getByTestId('create-button'));

    // Completar el formulario
    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: "New Task Title" },
    });
    fireEvent.change(screen.getByLabelText(/descripción/i), {
      target: { value: "New Task Description" },
    });
    fireEvent.change(screen.getByLabelText(/estado/i), {
      target: { value: "COMPLETED" },
    });

    // Enviar el formulario
    fireEvent.click(screen.getByRole("button", { name: /crear/i }));

    await waitFor(() => {
      expect(screen.getByTestId("form-container")).toHaveClass("translate-y-full");
    });

  });
});
