import { ConfirmDeUpdateModalProps } from "@/types/molecules/confirm-update-modal-molecule";
import InputGroupMolecule from "./input-group-molecule";
import SelectGroupMolecule from "./select-group-molecule";
import { useTaskStore } from "@/stores/tasks/tasks.store";
import { TaskStatus, UpdateTaskType } from "@/types/task";
import { Option } from "@/types/atoms/select-form-atom";
import { useFormValidation } from "@/hooks/use-form-validation";

export default function ConfirmUpdateModal({
  isModalUpdateOpen,
  onClose,
  taskId,
}: ConfirmDeUpdateModalProps) {

  const { values, errors, validate, handleChange } = useFormValidation({
    title: "",
    description: "",
    status: TaskStatus.PENDING,
  });

  const { updateTask } = useTaskStore();

  const options: Option[] = [
    { value: "COMPLETED", label: "Completado" },
    { value: "PENDING", label: "Pendiente" },
    { value: "IN_PROGRESS", label: "En progreso" },
  ];

  const onConfirmDelete = () => {

    if (!validate()) return;
    const updateTaskData: UpdateTaskType = {
      title: values.title,
      description: values.description,
      status: values.status as TaskStatus,
    };

    try {
      updateTask(taskId, updateTaskData);
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    } finally {
      onClose();
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
            }}
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}
