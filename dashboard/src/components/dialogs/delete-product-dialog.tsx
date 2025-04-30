import React, { useEffect, useRef } from 'react';

// --- Type Definitions ---
// Assuming defined elsewhere (e.g., ../libs/types)
interface Product {
  id: number;
  name: string;
  // Include other fields if needed for display
}

// Props for the DeleteProductDialog component
interface DeleteProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => Promise<void>; // Async confirmation handler
  productToDelete: Product | null; // Product to be deleted (for display)
  isDeleting?: boolean; // Flag for loading state
}

// --- Component Implementation ---

const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({
  isOpen,
  onClose,
  onConfirmDelete,
  productToDelete,
  isDeleting = false,
}) => {
  // --- Refs ---
  const dialogRef = useRef<HTMLDialogElement>(null);

  // --- Effects ---

  // Effect to control modal visibility
  useEffect(() => {
    const modal = dialogRef.current;
    if (modal) {
      if (isOpen && !modal.open) {
        modal.showModal();
      } else if (!isOpen && modal.open) {
        modal.close(); // Triggers onClose event
      }
    }
  }, [isOpen]);

  // --- Event Handlers ---

  // Handle native 'close' event from the dialog
  const handleDialogClose = () => {
    onClose(); // Call parent's close handler
  };

  // Handle confirmation button click
  const handleConfirm = async () => {
    try {
        await onConfirmDelete();
        // Parent handles closing the modal on success
    } catch (error) {
        console.error("Delete confirmation failed in parent:", error);
        // Error display is typically handled by the parent page,
        // as the modal might close before the error is shown.
        // Parent should ensure modal closes even on error if desired.
    }
  };


  // --- Render Logic ---
  return (
    <dialog
      id="delete_product_dialog"
      ref={dialogRef}
      className="modal"
      onClose={handleDialogClose}
    >
      <div className="modal-box w-11/12 max-w-md"> {/* Smaller width */}
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="submit"
            aria-label="Close"
            disabled={isDeleting}
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg">Confirm Deletion</h3>
        <p className="py-4">Are you sure you want to delete this product? This action cannot be undone.</p>

        {/* Display which product is being deleted */}
        {productToDelete && (
          <div className="mb-4 p-3 bg-warning/10 rounded border border-warning/30 text-sm">
            <p>You are about to delete:</p>
            <p className="font-semibold mt-1">
                {productToDelete.name} (ID: {productToDelete.id})
            </p>
          </div>
        )}

        {/* Modal Actions (Confirm/Cancel) */}
        <div className="modal-action">
          <form method="dialog" className='inline'>
            <button
              className="btn btn-ghost mr-2"
              type="submit"
              disabled={isDeleting}
            >
              Cancel
            </button>
          </form>
          <button
            className={`btn btn-error ${isDeleting ? 'loading' : ''}`}
            onClick={handleConfirm} // Call the confirmation handler
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Confirm Delete'}
          </button>
        </div>
      </div>

      {/* Click outside backdrop to close */}
      <form method="dialog" className="modal-backdrop">
        <button type="submit" disabled={isDeleting}>close</button>
      </form>
    </dialog>
  );
};

export default DeleteProductDialog;
