"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ButtonCreateAtom from "../atoms/button-create-atom";
import { Option } from "@/types/atoms/select-form-atom";
import SelectGroupMolecule from "../molecules/select-group-molecule";
import InputGroupMolecule from "../molecules/input-group-molecule";
import { useTaskStore } from "@/stores/tasks/tasks.store";
import { CreateTask, TaskStatus } from "@/types/task";

export default function SlideFormOrganism() {
  const [isOpen, setIsOpen] = useState(false);

  const [status, setStatus] = useState<TaskStatus>(TaskStatus.PENDING);



  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const createTask = useTaskStore((state) => state.createTask);

  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as TaskStatus);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    console.log("event.target.value", event.target.value);
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

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

    const newTask: CreateTask = {
      title,
      description,
      status,
    };



    console.log("newTask", newTask);

    if (!newTask.title || !newTask.description || !newTask.status) {
      throw new Error("Todos los campos son requeridos");
    }

    try {
      // Crea la tarea llamando al store
      createTask(newTask);
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    } finally {
      console.log("Cerrando formulario");
      setIsOpen(false);
    }
  };


  return (
    <>
      <div
        className={`rounded-t-3xl shadow-[0_-4px_60px_-15px_rgba(0,0,0,0.3)] fixed bottom-0 right-0 w-full sm:w-[400px] bg-white transition-transform transform  ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Crear Nueva Tarea</h2>
          <form onSubmit={handleSubmit}>
            <InputGroupMolecule
              label="Título"
              type="text"
              onChange={handleTitleChange}
            />

            <InputGroupMolecule
              label="Descripción"
              type="text"
              onChange={handleDescriptionChange}
            />

            <SelectGroupMolecule
              label="Estado"
              status={status}
              handleSelectChange={handleSelectChange}
              options={options}
            />

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
