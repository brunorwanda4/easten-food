// src/components/CreateCategoryModal.tsx
import React, { useState, useEffect } from 'react';

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSuccess: () => void; // Callback on successful creation
  apiBaseUrl: string;
  // Add authToken prop if needed: authToken?: string;
}

function CreateCategoryModal({ isOpen, onClose, onCreateSuccess, apiBaseUrl }: CreateCategoryModalProps) {
  const [categoryName, setCategoryName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setCategoryName('');
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiBaseUrl}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add Authorization header if needed
          // 'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ name: categoryName }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || `Failed to create category (Status: ${response.status})`);
      }

      console.log('Category created:', data.category);
      onCreateSuccess(); // Notify parent component
      onClose(); // Close the modal

    } catch (err: any) {
      console.error('Error creating category:', err);
      setError(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <dialog id="create_category_modal" className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create New Category</h3>

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
                placeholder="e.g., Electronics"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="grow"
                required
                disabled={isLoading}
            />
           </label>
           <div className="modal-action mt-6">
                {/* Form method="dialog" allows closing the modal via the button */}
                <button type="button" className="btn btn-ghost" onClick={onClose} disabled={isLoading}>
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isLoading || !categoryName.trim()}>
                    {isLoading ? <span className="loading loading-spinner loading-xs"></span> : 'Create'}
                </button>
            </div>
        </form>
         {/* Optional: Add a close button top right if needed */}
         {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button> */}
      </div>
       {/* Optional: Click outside to close */}
       <form method="dialog" className="modal-backdrop">
            <button type="button" onClick={onClose}>close</button>
       </form>
    </dialog>
  );
}

export default CreateCategoryModal;