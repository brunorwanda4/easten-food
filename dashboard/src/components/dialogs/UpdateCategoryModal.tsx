// src/components/UpdateCategoryModal.tsx
import React, { useState, useEffect } from 'react';
import { Category } from '../../libs/types';

interface UpdateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void; // Callback on successful update
  categoryToUpdate: Category | null;
  apiBaseUrl: string;
  // Add authToken prop if needed: authToken?: string;
}

function UpdateCategoryModal({ isOpen, onClose, onUpdateSuccess, categoryToUpdate, apiBaseUrl }: UpdateCategoryModalProps) {
  const [categoryName, setCategoryName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-fill form when modal opens with category data
  useEffect(() => {
    if (isOpen && categoryToUpdate) {
      setCategoryName(categoryToUpdate.name);
      setError(null);
      setIsLoading(false);
    } else if (!isOpen) {
      // Reset on close
      setCategoryName('');
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen, categoryToUpdate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim() || !categoryToUpdate || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiBaseUrl}/categories/${categoryToUpdate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add Authorization header if needed
          // 'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ name: categoryName }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
         throw new Error(data.message || `Failed to update category (Status: ${response.status})`);
      }

      console.log('Category updated:', data.category);
      onUpdateSuccess(); // Notify parent
      onClose(); // Close the modal

    } catch (err: any) {
      console.error('Error updating category:', err);
      setError(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!categoryToUpdate) return null; // Don't render if no category is selected

  return (
    <dialog id="update_category_modal" className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Category "{categoryToUpdate.name}"</h3>

        {error && (
           <div role="alert" className="alert alert-error mt-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             <span>{error}</span>
           </div>
        )}

        <form onSubmit={handleSubmit} className="py-4 space-y-4">
            <label className="input input-bordered flex items-center gap-2">
                Name
                <input
                    type="text"
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="grow"
                    required
                    disabled={isLoading}
                />
            </label>
            <div className="modal-action mt-6">
                <button type="button" className="btn btn-ghost" onClick={onClose} disabled={isLoading}>
                    Cancel
                </button>
                <button type="submit" className="btn btn-success" disabled={isLoading || !categoryName.trim() || categoryName === categoryToUpdate.name}>
                    {isLoading ? <span className="loading loading-spinner loading-xs"></span> : 'Update'}
                </button>
            </div>
        </form>
        {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button> */}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}

export default UpdateCategoryModal;