// src/components/DeleteCategoryModal.tsx
import  { useState, useEffect } from 'react';
import { Category } from '../../libs/types';

interface DeleteCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteSuccess: () => void; // Callback on successful deletion
  categoryToDelete: Category | null;
  apiBaseUrl: string;
  // Add authToken prop if needed: authToken?: string;
}

function DeleteCategoryModal({ isOpen, onClose, onDeleteSuccess, categoryToDelete, apiBaseUrl }: DeleteCategoryModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

   // Reset state when modal opens/closes or category changes
   useEffect(() => {
    if (isOpen) {
        setError(null);
        setIsLoading(false);
    }
   }, [isOpen])

  const handleDelete = async () => {
    if (!categoryToDelete || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiBaseUrl}/categories/${categoryToDelete.id}`, {
        method: 'DELETE',
        headers: {
          // Add Authorization header if needed
          // 'Authorization': `Bearer ${authToken}`
        },
      });

      const data = await response.json(); // Attempt to parse JSON even for errors

      if (!response.ok || !data.success) {
        throw new Error(data.message || `Failed to delete category (Status: ${response.status})`);
      }

      console.log('Category deleted:', categoryToDelete.id);
      onDeleteSuccess(); // Notify parent
      onClose(); // Close the modal

    } catch (err: any) {
      console.error('Error deleting category:', err);
       setError(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!categoryToDelete) return null; // Don't render if no category selected

  return (
    <dialog id="delete_category_modal" className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirm Deletion</h3>
        <p className="py-4">Are you sure you want to delete the category "{categoryToDelete.name}"? This action cannot be undone.</p>

        {error && (
           <div role="alert" className="alert alert-error mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             <span>{error}</span>
           </div>
        )}

        <div className="modal-action mt-6">
          <button className="btn btn-ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
          <button className="btn btn-error" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? <span className="loading loading-spinner loading-xs"></span> : 'Delete'}
          </button>
        </div>
         {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button> */}
      </div>
       <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>close</button>
       </form>
    </dialog>
  );
}

export default DeleteCategoryModal;