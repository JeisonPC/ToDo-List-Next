import { ConfirmDeUpdateModalProps } from "@/types/molecules/confirm-update-modal-molecule";
import InputGroupMolecule from "./input-group-molecule";
import { ChangeEvent, useState } from "react";
import SelectGroupMolecule from "./select-group-molecule";
import { useTaskStore } from "@/stores/tasks/tasks.store";
import { TaskStatus, UpdateTask } from "@/types/task";
import { Option } from "@/types/atoms/select-form-atom";

export default function ConfirmUpdateModal({
  isModalUpdateOpen,
  onClose,
  taskId
}: ConfirmDeUpdateModalProps) {

  const updateTaskInModal = useTaskStore((state) => state.updateTask)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.PENDING);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as TaskStatus);
  };

  const options: Option[] = [
    { value: "COMPLETED", label: "Completado" },
    { value: "PENDING", label: "Pendiente" },
    { value: "IN_PROGRESS", label: "En progreso" },
  ];


  const onConfirmDelete = () => {

    const updateTask: UpdateTask = {
      title,
      description,
      status,
    };


    try {
      updateTaskInModal(taskId, updateTask);
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  };

  if (!isModalUpdateOpen) return null;

  return (
    <div className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold">Edita tu tarea</h2>
        <p className="mt-2">
          Actualiza los datos que deseas editar de tu tarea.
        </p>
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
        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={() => {
              onConfirmDelete();
              onClose();
            }}
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}
