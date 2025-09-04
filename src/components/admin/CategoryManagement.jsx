// CategoryManagement.jsx
// Component for managing categories in the admin panel
import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Tag, FolderOpen, Hash, Eye, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'react-toastify';
import StatCard from './StatCard';
import ConfirmDialog from '@/components/ConfirmDialog';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#8B5CF6'
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockCategories = [
      {
        id: 1,
        name: 'Web Design',
        slug: 'web-design',
        description: 'Modern web design and user interface projects',
        color: '#8B5CF6',
        projects_count: 45,
        created_at: '2024-01-15',
        updated_at: '2024-08-01'
      },
      {
        id: 2,
        name: 'Mobile Apps',
        slug: 'mobile-apps',
        description: 'iOS and Android mobile application designs',
        color: '#06B6D4',
        projects_count: 32,
        created_at: '2024-01-20',
        updated_at: '2024-07-28'
      },
      {
        id: 3,
        name: 'Branding',
        slug: 'branding',
        description: 'Logo design, brand identity, and visual branding',
        color: '#F59E0B',
        projects_count: 28,
        created_at: '2024-02-01',
        updated_at: '2024-08-05'
      },
      {
        id: 4,
        name: 'Photography',
        slug: 'photography',
        description: 'Portrait, landscape, and commercial photography',
        color: '#EF4444',
        projects_count: 67,
        created_at: '2024-01-10',
        updated_at: '2024-08-03'
      },
      {
        id: 5,
        name: 'Illustration',
        slug: 'illustration',
        description: 'Digital illustrations, artwork, and creative designs',
        color: '#10B981',
        projects_count: 39,
        created_at: '2024-02-15',
        updated_at: '2024-07-30'
      }
    ];

    setTimeout(() => {
      setCategories(mockCategories);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Statistics
  const totalCategories = categories.length;
  const totalProjects = categories.reduce((sum, cat) => sum + cat.projects_count, 0);
  const avgProjectsPerCategory = totalCategories > 0 ? Math.round(totalProjects / totalCategories) : 0;

  // Handle create category
  const handleCreateCategory = () => {
    setFormData({ name: '', description: '', color: '#8B5CF6' });
    setShowCreateModal(true);
  };

  // Handle edit category
  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color
    });
    setShowEditModal(true);
  };

  // Handle delete category
  const handleDeleteCategory = (category) => {
    setSelectedCategory(category);
    setShowDeleteDialog(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    // TODO: Implement actual delete API call
    setCategories(categories.filter(cat => cat.id !== selectedCategory.id));
    toast.success(`Category "${selectedCategory.name}" deleted successfully!`);
    setShowDeleteDialog(false);
    setSelectedCategory(null);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    if (showCreateModal) {
      // TODO: Implement actual create API call
      const newCategory = {
        id: Date.now(),
        name: formData.name,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        description: formData.description,
        color: formData.color,
        projects_count: 0,
        created_at: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString().split('T')[0]
      };
      setCategories([...categories, newCategory]);
      toast.success('Category created successfully!');
      setShowCreateModal(false);
    } else if (showEditModal) {
      // TODO: Implement actual update API call
      setCategories(categories.map(cat => 
        cat.id === selectedCategory.id 
          ? { ...cat, name: formData.name, description: formData.description, color: formData.color }
          : cat
      ));
      toast.success('Category updated successfully!');
      setShowEditModal(false);
    }

    setFormData({ name: '', description: '', color: '#8B5CF6' });
    setSelectedCategory(null);
  };

  // Close modals
  const closeModals = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setSelectedCategory(null);
    setFormData({ name: '', description: '', color: '#8B5CF6' });
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
                <th className="text-left p-4 font-medium text-muted-foreground">Created</th>
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
                      <div className="flex items-center gap-2">
                        <Calendar className="size-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {new Date(category.created_at).toLocaleDateString()}
                        </span>
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
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
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
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter category description"
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-12 h-10 border border-border rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      placeholder="#8B5CF6"
                      className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
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
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    {showCreateModal ? 'Create' : 'Update'}
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
