import { ConfirmDeleteModalProps } from "@/types/molecules/Confirm-delete-modal-molecule";


function ConfirmDeleteModal({ isOpen, onClose, onConfirm }: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold">Confirmación</h2>
        <p className="mt-2">¿Estás seguro de que deseas eliminar esta tarea?</p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
