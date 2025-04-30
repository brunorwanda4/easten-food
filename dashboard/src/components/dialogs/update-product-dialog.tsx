import React, { useState, useEffect, useRef, FormEvent } from 'react';

// --- Type Definitions ---

// Assuming defined elsewhere (e.g., ../libs/types)
interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  category_id: number | null;
  // Add other product fields if needed (e.g., description, price)
  // created_at: string;
  // updated_at: string;
}

// Data structure expected by the onSubmit prop for updates
export interface UpdateProductData {
  id: number; // ID of the product being updated
  name: string;
  categoryId: number | null;
}

// Props for the UpdateProductDialog component
interface UpdateProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: UpdateProductData) => Promise<void>; // Async submission handler
  categories: Category[];
  productToEdit: Product | null; // The product currently being edited
  isSubmitting?: boolean;
  submitError?: string | null;
}

// --- Component Implementation ---

const UpdateProductDialog: React.FC<UpdateProductDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  categories,
  productToEdit,
  isSubmitting = false,
  submitError = null,
}) => {
  // --- State ---
  // Initialize state based on productToEdit when the modal opens
  const [productName, setProductName] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [internalError, setInternalError] = useState<string | null>(null);

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

  // Effect to populate form when productToEdit changes (and modal is open)
  useEffect(() => {
    if (isOpen && productToEdit) {
      setProductName(productToEdit.name);
      setSelectedCategoryId(productToEdit.category_id === null ? '' : productToEdit.category_id.toString());
      setInternalError(null); // Clear local errors
      // submitError is cleared by the parent
    } else if (!isOpen) {
        // Optionally clear fields when closed, though handleDialogClose also does this
        // setProductName('');
        // setSelectedCategoryId('');
    }
  }, [isOpen, productToEdit]); // Depend on productToEdit as well

  // --- Event Handlers ---

  // Handle native 'close' event from the dialog
  const handleDialogClose = () => {
    onClose(); // Call parent's close handler
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setInternalError(null);

    if (!productToEdit) {
      setInternalError("Cannot submit: No product selected for editing.");
      return;
    }

    if (!productName.trim()) {
      setInternalError('Product name cannot be empty.');
      return;
    }

    const categoryId = selectedCategoryId === '' ? null : parseInt(selectedCategoryId, 10);
    if (selectedCategoryId !== '' && (categoryId === null || isNaN(categoryId))) {
      setInternalError('Invalid category selected.');
      return;
    }

    // --- Optional: Check if changes were actually made ---
    const nameChanged = productName.trim() !== productToEdit.name;
    const categoryChanged = categoryId !== productToEdit.category_id;
    if (!nameChanged && !categoryChanged) {
        setInternalError("No changes detected to update.");
        // Optionally close the modal silently: onClose();
        return;
    }
    // --- End Optional Check ---


    const productData: UpdateProductData = {
      id: productToEdit.id, // Include the ID for the PUT request
      name: productName.trim(),
      categoryId: categoryId,
    };

    try {
      await onSubmit(productData);
      // Parent handles closing the modal on successful submission
    } catch (error) {
      console.error("Update submission failed in parent:", error);
      // Parent should set submitError prop to display feedback
    }
  };

  // --- Render Logic ---
  return (
    <dialog
      id="update_product_dialog"
      ref={dialogRef}
      className="modal"
      onClose={handleDialogClose}
    >
      <div className="modal-box w-11/12 max-w-lg">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="submit"
            aria-label="Close"
            disabled={isSubmitting}
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-4">Edit Product</h3>

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

        {/* Display Product ID being edited (optional) */}
        {productToEdit && (
             <p className="text-sm text-gray-500 mb-3">Editing Product ID: {productToEdit.id}</p>
        )}


        {/* Form for Updating Product */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name Input */}
          <div>
            <label htmlFor="updateProductName" className="label">
              <span className="label-text">Product Name <span className="text-error">*</span></span>
            </label>
            <input
              id="updateProductName"
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="input input-bordered w-full"
              required
              disabled={isSubmitting || !productToEdit} // Disable if submitting or no product loaded
            />
          </div>

          {/* Category Select Dropdown */}
          <div>
            <label htmlFor="updateProductCategory" className="label">
              <span className="label-text">Category (Optional)</span>
            </label>
            <select
              id="updateProductCategory"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="select select-bordered w-full"
              disabled={categories.length === 0 || isSubmitting || !productToEdit}
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
            <form method="dialog" className='inline'>
              <button
                className="btn btn-ghost mr-2"
                type="submit"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </form>
            <button
              type="submit"
              className={`btn btn-success ${isSubmitting ? 'loading' : ''}`} // Use btn-success for update
              disabled={isSubmitting || !productToEdit}
            >
              {isSubmitting ? 'Updating...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>

      {/* Click outside backdrop to close */}
      <form method="dialog" className="modal-backdrop">
        <button type="submit" disabled={isSubmitting}>close</button>
      </form>
    </dialog>
  );
};

export default UpdateProductDialog;
