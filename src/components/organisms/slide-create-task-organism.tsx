"use client";
import { FormEvent, useEffect, useState } from "react";
import ButtonCreateAtom from "../atoms/button-create-atom";
import { Option } from "@/types/atoms/select-form-atom";
import SelectGroupMolecule from "../molecules/select-group-molecule";
import InputGroupMolecule from "../molecules/input-group-molecule";
import { useTaskStore } from "@/stores/tasks/tasks.store";
import { CreateTaskType, TaskStatus } from "@/types/task";
import { useFormValidation } from "@/hooks/use-form-validation";

export default function SlideCreateTaskOrganism() {
  const [isOpen, setIsOpen] = useState(false);

  const { fetchTasks } = useTaskStore();
  const { createTask } = useTaskStore();

  const { values, errors, validate, handleChange } = useFormValidation({
    title: "",
    description: "",
    status: TaskStatus.PENDING,
  });

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  const options: Option[] = [
    { value: "COMPLETED", label: "Completado" },
    { value: "PENDING", label: "Pendiente" },
    { value: "IN_PROGRESS", label: "En progreso" },
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const newTask: CreateTaskType = {
      title: values.title,
      description: values.description,
      status: values.status as TaskStatus,
    };

    try {
      // Crea la tarea llamando al store
      createTask(newTask);
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div
        data-testid="form-container"
        className={`rounded-t-3xl shadow-[0_-4px_60px_-15px_rgba(0,0,0,0.3)] fixed bottom-0 right-0 w-full bg-white transition-transform transform  ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Crear Nueva Tarea</h2>
          <form onSubmit={handleSubmit}>
            <InputGroupMolecule
              label="Título"
              htmlFor="title"
              name="title"
              idInput="title"
              type="text"
              value={values.title}
              onChange={handleChange}
            />

            {errors.title && <p className="text-red-500">{errors.title}</p>}

            <InputGroupMolecule
              label="Descripción"
              htmlFor="description"
              idInput="description"
              type="text"
              onChange={handleChange}
              name="description"
              value={values.description}
            />
            {errors.description && <p className="text-red-500">{errors.description}</p>}

            <SelectGroupMolecule
              label="Estado"
              htmlFor="status"
              idSelect="status"
              value={values.status}
              name="status"
              handleSelectChange={handleChange}
              options={options}
            />
            {errors.status && <p className="text-red-500">{errors.status}</p>}

            <div className="pt-16">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded"
              >
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
      <ButtonCreateAtom
        className="fixed bottom-4 right-4"
        onClick={toggleForm}
      />
    </>
  );
}
