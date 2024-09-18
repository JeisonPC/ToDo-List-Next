import { useState } from "react";
import ButtonDeleteAtom from "../atoms/button-delete-atom";
import ButtonMoreAtom from "../atoms/button-more-atom";
import ConfirmDeleteModal from "./confirm-delete-modal-molecule";
import { MoreOptionsMoleculeProps } from "@/types/molecules/more-options-molecule";
import { useTaskStore } from "@/stores/tasks/tasks.store";

export default function MoreOptionsMolecule( { taskId } : MoreOptionsMoleculeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteTaskInMoreOptions = useTaskStore((state) => state.deleteTask);

  const handleDelete = async () => {
    try {
      deleteTaskInMoreOptions(taskId);
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const handleMoreClick = () => {
    setIsOpen(!isOpen);
  };

  const handleDeleteClick = () => {
    console.log(taskId);
    setIsModalOpen(true); // Abrir el modal cuando se hace clic en eliminar
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cerrar el modal sin eliminar
  };

  return (
    <>
      <div
        className={`bg-white p-2 rounded-full flex flex-col ${
          isOpen ? "rounded-b-none relative" : ""
        }`}
      >
        <ButtonMoreAtom onClickMore={handleMoreClick} />

          {isOpen ? (
            <div
            className={`absolute top-full right-0 bg-white p-2 rounded-lg rounded-b-full transition-transform duration-100 ${
              isOpen
                ? "transform translate-y-0 opacity-100"
                : "transform translate-y-[-10px] opacity-0"
            }`}
          >
            <ButtonDeleteAtom taskId={taskId} onClickDelete={handleDeleteClick} />
            </div>
          ) : null}

      </div>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
    </>
  );
}
