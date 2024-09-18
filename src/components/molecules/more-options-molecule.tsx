import { useState } from "react";
import ButtonDeleteAtom from "../atoms/button-delete-atom";
import ButtonMoreAtom from "../atoms/button-more-atom";
import ConfirmDeleteModal from "./confirm-delete-modal-molecule";
import { MoreOptionsMoleculeProps } from "@/types/molecules/more-options-molecule";
import { useTaskStore } from "@/stores/tasks/tasks.store";
import ButtonUpdateAtom from "../atoms/button-update-atom";
import ConfirmUpdateModal from "./confirm-update-modal-molecule";

export default function MoreOptionsMolecule({
  taskId,
}: MoreOptionsMoleculeProps) {
  const handleMoreClick = () => {
    setIsOpenButtonMoreState(!isOpenButtonMoreState);
  };

  const [isOpenButtonMoreState, setIsOpenButtonMoreState] = useState(false);
  const [isModalDeleteOpenState, setIsModalDeleteOpenState] = useState(false);
  const [isModalUpdateOpenState, setIsModalUpdateOpenState] = useState(false);

  const deleteTaskInMoreOptions = useTaskStore((state) => state.deleteTask);

  const handleDeleteClick = () => {
    setIsModalDeleteOpenState(true);
  };

  const handleDelete = async () => {
    try {
      deleteTaskInMoreOptions(taskId);
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const handleCloseModalDelete = () => {
    setIsModalDeleteOpenState(false);
  };

  const handleUpdateClick = () => {
    setIsModalUpdateOpenState(true);
  };

  const handleCloseModalUpdate = () => {
    setIsModalUpdateOpenState(false);
  };

  return (
    <>
      <div
        className={`bg-white p-2 shadow-md relative rounded-full flex flex-col ${
          isOpenButtonMoreState ? "rounded-b-none" : ""
        }`}
      >
        <ButtonMoreAtom onClickMore={handleMoreClick} />

        {isOpenButtonMoreState ? (
          <>
            <div
              className={`absolute w-full top-full z-10 right-0 bg-white pt-1 p-2 rounded-lg rounded-b-full transition-transform duration-100 ${
                isOpenButtonMoreState
                  ? "transform translate-y-0 opacity-100"
                  : "transform translate-y-[-10px] opacity-0"
              }`}
            >
              <ButtonDeleteAtom
                taskId={taskId}
                onClickDelete={handleDeleteClick}
              />
              <ButtonUpdateAtom
                taskId={taskId}
                onClickUpdate={handleUpdateClick}
              />
            </div>
          </>
        ) : null}
      </div>
      <ConfirmDeleteModal
        isModalDeleteOpen={isModalDeleteOpenState}
        onClose={handleCloseModalDelete}
        onConfirm={handleDelete}
      />
      <ConfirmUpdateModal
        isModalUpdateOpen={isModalUpdateOpenState}
        onClose={handleCloseModalUpdate}
        taskId={taskId}
      />
    </>
  );
}
