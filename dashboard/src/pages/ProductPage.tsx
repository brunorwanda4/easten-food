import { useState, useEffect, useCallback } from "react";
import UpdateProductDialog, {
  UpdateProductData,
} from "../components/dialogs/update-product-dialog";
import CreateProductDialog, {
  NewProductData,
} from "../components/dialogs/create-product-dialog";
import DeleteProductDialog from "../components/dialogs/delete-product-dialog";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  category_id: number | null;
  category_name?: string | null; // Optional: If your API returns category name
  created_at: string; // Or Date
  updated_at: string; // Or Date
}

const API_BASE_URL = "http://localhost:5001/api";

// --- Component Implementation ---

function ProductPage() {
  // --- State ---
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // For initial data load
  const [pageError, setPageError] = useState<string | null>(null); // For fetch/delete errors shown on page

  // Create Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubmittingCreate, setIsSubmittingCreate] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  // Update Modal State
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isSubmittingUpdate, setIsSubmittingUpdate] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  // Delete errors are typically shown via pageError

  // --- Data Fetching ---

  // Use useCallback to memoize fetchProducts to prevent unnecessary calls if passed as prop later
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setPageError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        throw new Error(data.message || "Invalid product data received.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error fetching products:", err);
      setPageError(`Failed to load products: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means it's created once

  const fetchCategories = async () => {
    // No loading state for categories, assuming less critical
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      if (data.success && Array.isArray(data.categories)) {
        setCategories(data.categories);
      } else {
        console.error(
          "Failed to fetch categories:",
          data.message || "Invalid data"
        );
      }
    } catch (err: unknown) {
      console.error("Error fetching categories:", err);
    }
  };

  // Initial data fetch on component mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts]); // Include fetchProducts in dependency array

  // --- Modal Open/Close Handlers ---

  const handleOpenCreateModal = () => {
    setCreateError(null); // Clear previous errors
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    // Error state is reset when opening or on successful submit
  };

  const handleOpenUpdateModal = (product: Product) => {
    setProductToEdit(product);
    setUpdateError(null);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setProductToEdit(null); // Clear the product being edited
  };

  const handleOpenDeleteModal = (product: Product) => {
    setProductToDelete(product);
    setPageError(null); // Clear page errors before showing delete confirmation
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  // --- Submission Handlers ---

  const handleCreateSubmit = async (productData: NewProductData) => {
    setIsSubmittingCreate(true);
    setCreateError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to create product.");
      }
      await fetchProducts(); // Refetch products list
      setIsCreateModalOpen(false); // Close modal on success
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Create product error:", error);
      setCreateError(error.message || "An unexpected error occurred.");
      throw error; // Re-throw to signal failure to the dialog if needed
    } finally {
      setIsSubmittingCreate(false);
    }
  };

  const handleUpdateSubmit = async (productData: UpdateProductData) => {
    setIsSubmittingUpdate(true);
    setUpdateError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/products/${productData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: productData.name,
            categoryId: productData.categoryId,
          }), // Send only relevant fields
        }
      );
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update product.");
      }
      await fetchProducts(); // Refetch products list
      setIsUpdateModalOpen(false); // Close modal on success
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Update product error:", error);
      setUpdateError(error || "An unexpected error occurred.");
      throw error; // Re-throw to signal failure
    } finally {
      setIsSubmittingUpdate(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    setPageError(null); // Clear previous page errors
    try {
      const response = await fetch(
        `${API_BASE_URL}/products/${productToDelete.id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json(); // Assume API sends { success: boolean, message?: string }
      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to delete product on the server."
        );
      }
      await fetchProducts(); // Refetch products list
      setIsDeleteModalOpen(false); // Close modal on success
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Delete product error:", error);
      setPageError(`Delete failed: ${error.message}`); // Show error on the main page
      setIsDeleteModalOpen(false); // Close modal even on error
    } finally {
      setIsDeleting(false);
      setProductToDelete(null);
    }
  };

  // --- Render UI ---
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Product Management
      </h1>

      {/* Page Level Loading Indicator */}
      {loading && !products.length && (
        <div className="flex justify-center my-10">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* Page Level Error Display */}
      {pageError && (
        <div
          role="alert"
          className="alert alert-error mb-4 shadow-lg max-w-xl mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error: {pageError}</span>
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => setPageError(null)}
          >
            ✕
          </button>
        </div>
      )}

      <div className="mb-6 text-right">
        <button
          className="btn btn-primary"
          onClick={handleOpenCreateModal}
          disabled={
            loading || isSubmittingCreate || isSubmittingUpdate || isDeleting
          } 
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add New Product
        </button>
      </div>

      {/* Product List Table */}
      {!loading && products.length > 0 && (
        <div className="card bg-base-100 shadow-xl overflow-hidden">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table w-full table-zebra">
                <thead className="bg-base-200">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Created At</th>
                    <th className="text-right p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="hover">
                      <td className="p-4">{product.id}</td>
                      <td className="p-4">{product.name}</td>
                      <td className="p-4">
                        {product.category_name || (
                          <span className="text-gray-400 italic">N/A</span>
                        )}
                      </td>
                      <td className="p-4">
                        {new Date(product.created_at).toLocaleString()}
                      </td>
                      <td className="text-right p-4 space-x-2">
                        <button
                          onClick={() => handleOpenUpdateModal(product)}
                          className="btn btn-warning btn-sm"
                          disabled={
                            loading ||
                            isSubmittingCreate ||
                            isSubmittingUpdate ||
                            isDeleting
                          }
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(product)}
                          className="btn btn-error btn-sm"
                          disabled={
                            loading ||
                            isSubmittingCreate ||
                            isSubmittingUpdate ||
                            isDeleting
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* No Products Message */}
      {!loading && products.length === 0 && !pageError && (
        <div className="text-center text-gray-500 mt-10 card bg-base-100 shadow py-10">
          <p className="text-xl mb-4">No products found.</p>
          <button
            className="btn btn-link btn-primary"
            onClick={handleOpenCreateModal}
          >
            Click here to add the first product
          </button>
        </div>
      )}

      {/* --- Render Modals --- */}
      <CreateProductDialog
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateSubmit}
        categories={categories}
        isSubmitting={isSubmittingCreate}
        submitError={createError}
      />

      <UpdateProductDialog
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        onSubmit={handleUpdateSubmit}
        categories={categories}
        productToEdit={productToEdit}
        isSubmitting={isSubmittingUpdate}
        submitError={updateError}
      />

      <DeleteProductDialog
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirmDelete={handleConfirmDelete}
        productToDelete={productToDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default ProductPage;
