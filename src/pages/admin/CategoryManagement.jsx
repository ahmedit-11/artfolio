// CategoryManagement.jsx
// Component for managing categories in the admin panel
import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Tag, FolderOpen, Hash, Eye, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'react-toastify';
import StatCard from './StatCard';
import ConfirmDialog from '@/components/ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCatThunk } from '@/store/Categories/thunk/getAllCatThunk';
import { createCategoryThunk } from '@/store/Categories/thunk/createCategoryThunk';
import { updateCategoryThunk } from '@/store/Categories/thunk/updateCategoryThunk';
import { deleteCategoryThunk } from '@/store/Categories/thunk/deleteCategoryThunk';
import { getDashboardStatsThunk } from '@/store/dashboard/thunk/getDashboardStatsThunk';

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const { 
    categories, 
    loading, 
    error, 
    createLoading, 
    updateLoading, 
    deleteLoading 
  } = useSelector(state => state.categories);
  
  const { stats: dashboardStats, loading: dashboardLoading } = useSelector(state => state.dashboard);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  // Fetch categories and dashboard stats from API
  useEffect(() => {
    dispatch(getAllCatThunk());
    dispatch(getDashboardStatsThunk());
  }, [dispatch]);

  // Filter categories based on search term
  const filteredCategories = categories?.filter(category =>
    category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Statistics
  const totalCategories = categories?.length || 0;
  const totalProjects = dashboardStats?.totalProjects || 0;
  const avgProjectsPerCategory = totalCategories > 0 ? Math.round(totalProjects / totalCategories) : 0;

  // Handle create category
  const handleCreateCategory = () => {
    setFormData({ name: '', description: '' });
    setShowCreateModal(true);
  };

  // Handle edit category
  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name || '',
      description: category.description || ''
    });
    setShowEditModal(true);
  };

  // Handle delete category
  const handleDeleteCategory = (category) => {
    setSelectedCategory(category);
    setShowDeleteDialog(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      const result = await dispatch(deleteCategoryThunk(selectedCategory.id));
      if (result.payload) {
        toast.success(`Category "${selectedCategory.name}" deleted successfully!`);
        setShowDeleteDialog(false);
        setSelectedCategory(null);
        // Refresh categories list to remove deleted category
        dispatch(getAllCatThunk());
      } else {
        toast.error("Failed to delete category. Please try again.");
      }
    } catch (error) {
      console.error("Delete category error:", error);
      toast.error("Failed to delete category. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    try {
      if (showCreateModal) {
        const result = await dispatch(createCategoryThunk(formData));
        if (result.payload) {
          toast.success('Category created successfully!');
          setShowCreateModal(false);
          // Refresh categories list to show the new category
          dispatch(getAllCatThunk());
        } else {
          toast.error("Failed to create category. Please try again.");
        }
      } else if (showEditModal) {
        const result = await dispatch(updateCategoryThunk({ 
          id: selectedCategory.id, 
          categoryData: formData 
        }));
        if (result.payload) {
          toast.success('Category updated successfully!');
          setShowEditModal(false);
          // Refresh categories list to show updated category
          dispatch(getAllCatThunk());
        } else {
          toast.error("Failed to update category. Please try again.");
        }
      }

      setFormData({ name: '', description: '' });
      setSelectedCategory(null);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  // Close modals
  const closeModals = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setSelectedCategory(null);
    setFormData({ name: '', description: '' });
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Category Management</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage portfolio categories and organize content
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Total Categories"
          value={totalCategories}
          icon={Tag}
          theme="blue"
        />
        <StatCard
          title="Total Projects"
          value={totalProjects}
          icon={FolderOpen}
          theme="green"
        />
        <StatCard
          title="Avg Projects/Category"
          value={avgProjectsPerCategory}
          icon={Hash}
          theme="purple"
        />
      </div>

      {/* Search and Create */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          onClick={handleCreateCategory}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="size-4" />
          <span>Create Category</span>
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Description</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Projects</th>
                
                <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center p-8">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      <span className="ml-2 text-muted-foreground">Loading categories...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-8">
                    <div className="flex flex-col items-center">
                      <Tag className="size-12 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">
                        {searchTerm ? 'No categories found matching your search.' : 'No categories found.'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr key={category.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full flex-shrink-0"
                          style={{ backgroundColor: category.color }}
                        />
                        <div>
                          <div className="font-medium text-foreground">{category.name}</div>
                          <div className="text-sm text-muted-foreground">/{category.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-muted-foreground max-w-xs truncate">
                        {category.description}
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <FolderOpen className="size-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{category.projects_count}</span>
                      </div>
                    </td>
                   
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                          title="Edit category"
                        >
                          <Edit className="size-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category)}
                          className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          title="Delete category"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Category Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {showCreateModal ? 'Create New Category' : 'Edit Category'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter category name"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter category description"
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>


                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModals}
                    className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createLoading || updateLoading}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {(showCreateModal && createLoading) || (showEditModal && updateLoading) ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                        {showCreateModal ? 'Creating...' : 'Updating...'}
                      </div>
                    ) : (
                      showCreateModal ? 'Create' : 'Update'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={confirmDelete}
        title="Delete Category"
        message={`Are you sure you want to delete the category "${selectedCategory?.name}"? This action cannot be undone and may affect ${selectedCategory?.projects_count || 0} projects.`}
      />
    </div>
  );
};

export default CategoryManagement;
