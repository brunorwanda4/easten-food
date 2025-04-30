import React, { useState, useEffect, useRef, FormEvent } from 'react';

interface Category {
  id: number;
  name: string;
}

export interface NewProductData {
  name: string;
  categoryId: number | null; // Use null if no category is selected
}

interface CreateProductDialogProps {
  isOpen: boolean; // Controls whether the modal is visible
  onClose: () => void; // Function to call when the modal requests to be closed
  onSubmit: (productData: NewProductData) => Promise<void>; // Async function to handle form submission
  categories: Category[]; // List of available categories
  isSubmitting?: boolean; // Optional: Flag to show loading state during submission
  submitError?: string | null; // Optional: Error message from submission attempt
}

// --- Component Implementation ---

const CreateProductDialog: React.FC<CreateProductDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  categories,
  isSubmitting = false, // Default value for optional prop
  submitError = null,   // Default value for optional prop
}) => {
  // --- State ---
  const [productName, setProductName] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(''); // Store as string from select value
  const [internalError, setInternalError] = useState<string | null>(null); // For local validation errors

  // --- Refs ---
  const dialogRef = useRef<HTMLDialogElement>(null);

  // --- Effects ---

  // Effect to control the modal visibility based on isOpen prop
  useEffect(() => {
    const modal = dialogRef.current;
    if (modal) {
      if (isOpen && !modal.open) {
        modal.showModal();
      } else if (!isOpen && modal.open) {
        modal.close(); // This will trigger the native 'close' event
      }
    }
  }, [isOpen]);

  // Effect to reset form when the modal opens
  useEffect(() => {
    if (isOpen) {
      setProductName('');
      setSelectedCategoryId('');
      setInternalError(null); // Clear local errors when reopening
      // Note: submitError comes from props, parent should clear it
    }
  }, [isOpen]);

  // --- Event Handlers ---

  // Handle the native 'close' event from the dialog (ESC, backdrop click, modal.close())
  const handleDialogClose = () => {
    // Call the onClose prop provided by the parent component
    onClose();
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent default browser form submission
    setInternalError(null); // Clear previous local errors

    // Basic validation
    if (!productName.trim()) {
      setInternalError('Product name cannot be empty.');
      return;
    }

    // Parse category ID (handle empty string as null)
    const categoryId = selectedCategoryId === '' ? null : parseInt(selectedCategoryId, 10);

    // Validate parsed category ID (if a selection was made)
    if (selectedCategoryId !== '' && (categoryId === null || isNaN(categoryId))) {
      setInternalError('Invalid category selected.');
      return;
    }

    // Prepare data for submission
    const productData: NewProductData = {
      name: productName.trim(),
      categoryId: categoryId,
    };

    try {
      // Call the async onSubmit prop provided by the parent
      await onSubmit(productData);
      // If onSubmit resolves successfully, the parent should set isOpen to false,
      // which will trigger the modal close via the useEffect hook.
      // No need to call onClose() directly here after successful submit.
    } catch (error) {
      // If onSubmit throws an error, it's likely handled by the parent
      // (e.g., setting submitError prop). We don't need to do anything here,
      // unless we want specific handling within the dialog itself.
      console.error("Submission failed in parent:", error);
      // Optionally set an internal error if the parent doesn't provide feedback
      // setInternalError("Failed to create product. Please try again.");
    }
  };

  // --- Render Logic ---
  return (
    <dialog
      id="create_product_dialog" // Unique ID for the dialog
      ref={dialogRef}
      className="modal"
      onClose={handleDialogClose} // Listen for the native close event
    >
      <div className="modal-box w-11/12 max-w-lg"> {/* Responsive width */}
        {/* Close Button (Top Right) - uses method="dialog" */}
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="submit" // Important: makes it close the dialog
            aria-label="Close"
            disabled={isSubmitting} // Disable while submitting
          >
            ✕
          </button>
        </form>

        {/* Modal Title */}
        <h3 className="font-bold text-lg mb-4">Create New Product</h3>

        {/* Display Submission Error (from parent) */}
        {submitError && (
          <div role="alert" className="alert alert-error mb-4 text-sm p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{submitError}</span>
          </div>
        )}

        {/* Display Internal Validation Error */}
        {internalError && (
          <div role="alert" className="alert alert-warning mb-4 text-sm p-3">
             <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>{internalError}</span>
          </div>
        )}

        {/* Form for Creating Product */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name Input */}
          <div>
            <label htmlFor="createProductName" className="label">
              <span className="label-text">Product Name <span className="text-error">*</span></span>
            </label>
            <input
              id="createProductName"
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="input input-bordered w-full"
              required
              disabled={isSubmitting} // Disable while submitting
            />
          </div>

          {/* Category Select Dropdown */}
          <div>
            <label htmlFor="createProductCategory" className="label">
              <span className="label-text">Category (Optional)</span>
            </label>
            <select
              id="createProductCategory"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="select select-bordered w-full"
              disabled={categories.length === 0 || isSubmitting} // Disable if no categories or submitting
            >
              <option value="">-- Select Category --</option>
              {categories.length > 0 ? (
                categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option disabled>No categories available</option>
              )}
            </select>
          </div>

          {/* Modal Actions (Submit/Cancel) */}
          <div className="modal-action mt-6">
            {/* Cancel Button - uses method="dialog" */}
            <form method="dialog" className='inline'>
              <button
                className="btn btn-ghost mr-2"
                type="submit" // Closes the dialog via form method
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </form>
            {/* Submit Button */}
            <button
              type="submit"
              className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting} // Disable while submitting
            >
              {isSubmitting ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>

      {/* Click outside backdrop to close - uses method="dialog" */}
      <form method="dialog" className="modal-backdrop">
        <button type="submit" disabled={isSubmitting}>close</button>
      </form>
    </dialog>
  );
};

export default CreateProductDialog;
