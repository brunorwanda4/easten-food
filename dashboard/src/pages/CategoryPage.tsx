import { useState, useEffect, useCallback } from "react";
import { Category } from "../libs/types";
import CreateCategoryModal from "../components/dialogs/CreateCategoryModal";
import UpdateCategoryModal from "../components/dialogs/UpdateCategoryModal";
import DeleteCategoryModal from "../components/dialogs/DeleteCategoryModal";
const API_BASE_URL = "http://localhost:5001/api"; // Keep this or move to env variables

function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // --- Modal State ---
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // --- Data for Modals ---
  const [categoryToUpdate, setCategoryToUpdate] = useState<Category | null>(
    null
  );
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );

  // --- Fetch Categories ---
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null); // Clear previous errors before fetching
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (!response.ok) {
        // Try to get error message from response body
        let errorMsg = `Failed to fetch categories: ${response.statusText}`;
        try {
          const errData = await response.json();
          errorMsg = errData.message || errorMsg;
        } catch {
          /* Ignore if response is not JSON */
        }
        throw new Error(errorMsg);
      }
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      } else {
        throw new Error(data.message || "Failed to fetch categories");
      }
    } catch (err: any) {
      console.error("Error fetching categories:", err);
      setError(`Error loading categories: ${err.message}`);
      setCategories([]); // Clear categories on fetch error
    } finally {
      setLoading(false);
    }
  }, []); // useCallback ensures function identity doesn't change unnecessarily

  // --- Fetch on Mount ---
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]); // Dependency array includes fetchCategories

  // --- Modal Control Functions ---
  const openCreateModal = () => setIsCreateModalOpen(true);

  const openUpdateModal = (category: Category) => {
    setCategoryToUpdate(category);
    setIsUpdateModalOpen(true);
  };

  const openDeleteModal = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsUpdateModalOpen(false);
    setIsDeleteModalOpen(false);
    // Optionally reset data states after a short delay to allow modal fade-out
    setTimeout(() => {
      setCategoryToUpdate(null);
      setCategoryToDelete(null);
    }, 300); // Adjust timing if needed
  };

  // --- Callbacks for Modal Success ---
  const handleSuccess = () => {
    fetchCategories(); // Refresh data on success
    closeModals(); // Close the modal
  };

  // --- Render UI ---
  return (
    <div className="p-4 container mx-auto">
      {" "}
      {/* Added container and mx-auto */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Category Management
      </h1>
      {/* Error Display Area */}
      {error &&
        !loading && ( // Only show fetch error if not loading
          <div role="alert" className="alert alert-error mb-4 shadow-lg">
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
            <span>{error}</span>
          </div>
        )}
      {/* Add Category Button */}
      <div className="mb-6 text-right">
        <button className="btn btn-primary" onClick={openCreateModal}>
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
          Add New Category
        </button>
      </div>
      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}
      {/* Category List Table */}
      {!loading && !error && categories.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No categories found.
        </div>
      )}
      {!loading && categories.length > 0 && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Category List</h2>
            <div className="overflow-x-auto">
              <table className="table w-full table-zebra">
                {" "}
                {/* Added table-zebra */}
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Created At</th>
                    <th className="text-right">Actions</th>{" "}
                    {/* Align actions right */}
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id} className="hover">
                      {" "}
                      {/* Added hover effect */}
                      <td>{category.id}</td>
                      <td>{category.name}</td>
                      <td>{new Date(category.created_at).toLocaleString()}</td>
                      <td className="text-right space-x-2">
                        {" "}
                        {/* Added spacing */}
                        <button
                          onClick={() => openUpdateModal(category)}
                          className="btn btn-warning btn-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(category)}
                          className="btn btn-error btn-sm"
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
      {/* --- Render Modals --- */}
      <CreateCategoryModal
        isOpen={isCreateModalOpen}
        onClose={closeModals}
        onCreateSuccess={handleSuccess}
        apiBaseUrl={API_BASE_URL}
        // authToken={yourAuthToken} // Pass token if needed
      />
      <UpdateCategoryModal
        isOpen={isUpdateModalOpen}
        onClose={closeModals}
        onUpdateSuccess={handleSuccess}
        categoryToUpdate={categoryToUpdate}
        apiBaseUrl={API_BASE_URL}
        // authToken={yourAuthToken} // Pass token if needed
      />
      <DeleteCategoryModal
        isOpen={isDeleteModalOpen}
        onClose={closeModals}
        onDeleteSuccess={handleSuccess}
        categoryToDelete={categoryToDelete}
        apiBaseUrl={API_BASE_URL}
        // authToken={yourAuthToken} // Pass token if needed
      />
    </div>
  );
}

export default CategoryPage;
