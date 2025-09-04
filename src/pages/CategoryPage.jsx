// CategoryPage.jsx
// Displays all portfolios for a specific category - Updated to use CategoryPortfolioGrid
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PortfolioCard from '../components/PortfolioCard';
import CategoryPortfolioGrid from '../components/CategoryPortfolioGrid';
import { useScrollToTop } from '../utils/scrollToTop';
import { toast } from 'react-toastify';
import PageTitle from '../components/PageTitle';

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  useScrollToTop();

  const [category, setCategory] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'popular', 'rating'
  const [filteredPortfolios, setFilteredPortfolios] = useState([]);

  // Mock category data - replace with actual API call
  const mockCategories = {
    'web-design': {
      id: 1,
      name: 'Web Design',
      slug: 'web-design',
      description: 'Modern web design and user interface projects showcasing creativity and functionality',
      color: '#8B5CF6',
      projects_count: 45
    },
    'mobile-apps': {
      id: 2,
      name: 'Mobile Apps',
      slug: 'mobile-apps',
      description: 'iOS and Android mobile application designs and user experiences',
      color: '#06B6D4',
      projects_count: 32
    },
    'branding': {
      id: 3,
      name: 'Branding',
      slug: 'branding',
      description: 'Logo design, brand identity, and visual branding projects',
      color: '#F59E0B',
      projects_count: 28
    },
    'photography': {
      id: 4,
      name: 'Photography',
      slug: 'photography',
      description: 'Portrait, landscape, and commercial photography portfolios',
      color: '#EF4444',
      projects_count: 67
    },
    'illustration': {
      id: 5,
      name: 'Illustration',
      slug: 'illustration',
      description: 'Digital illustrations, artwork, and creative designs',
      color: '#10B981',
      projects_count: 39
    }
  };

  // Mock portfolio data - replace with actual API call
  const mockPortfolios = [
    {
      id: 1,
      title: "Modern E-commerce Platform",
      creator: "Sarah Johnson",
      creatorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      likes: 234,
      comments: 45,
      rating: 4.8,
      tags: ["React", "UI/UX", "E-commerce"],
      category: "web-design",
      created_at: "2024-08-15"
    },
   
    {
      id: 3,
      title: "Fitness App Interface",
      creator: "Emma Wilson",
      creatorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      likes: 156,
      comments: 28,
      rating: 4.7,
      tags: ["Mobile", "UI/UX", "Fitness"],
      category: "mobile-apps",
      created_at: "2024-08-12"
    },
    {
      id: 4,
      title: "Brand Identity Design",
      creator: "Alex Rodriguez",
      creatorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&h=600&fit=crop",
      likes: 203,
      comments: 41,
      rating: 4.9,
      tags: ["Branding", "Logo", "Identity"],
      category: "branding",
      created_at: "2024-08-08"
    },
    {
      id: 5,
      title: "Nature Photography Series",
      creator: "Lisa Park",
      creatorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      likes: 312,
      comments: 67,
      rating: 4.8,
      tags: ["Nature", "Landscape", "Photography"],
      category: "photography",
      created_at: "2024-08-14"
    },
    {
      id: 6,
      title: "Character Illustration Set",
      creator: "David Kim",
      creatorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
      likes: 178,
      comments: 35,
      rating: 4.5,
      tags: ["Illustration", "Character", "Digital Art"],
      category: "illustration",
      created_at: "2024-08-11"
    }
  ];

  // Load category and portfolios
  useEffect(() => {
    const loadCategoryData = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API calls
        const categoryData = mockCategories[slug];
        if (!categoryData) {
          toast.error('Category not found');
          navigate('/404');
          return;
        }

        const categoryPortfolios = mockPortfolios.filter(p => p.category === slug);
        
        setCategory(categoryData);
        setPortfolios(categoryPortfolios);
        setFilteredPortfolios(categoryPortfolios);
      } catch (error) {
        console.error('Error loading category data:', error);
        toast.error('Failed to load category data');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadCategoryData();
    }
  }, [slug, navigate]);

  // Sort portfolios
  useEffect(() => {
    let sorted = [...portfolios];

    // Apply sorting
    sorted.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'popular':
          return b.likes - a.likes;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFilteredPortfolios(sorted);
  }, [portfolios, sortBy]);

  const handlePortfolioClick = (portfolioId) => {
    navigate(`/portfolio/${portfolioId}`);
  };

  const handleCreatorClick = (creator) => {
    // TODO: Navigate to creator profile
    console.log('Navigate to creator:', creator);
  };

  const handleTagClick = (tag) => {
    // TODO: Navigate to tag page or filter by tag
    console.log('Filter by tag:', tag);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Category Not Found</h1>
            <button
              onClick={() => navigate('/')}
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div 
              className="w-6 h-6 rounded-full flex-shrink-0"
              style={{ backgroundColor: category.color }}
            />
            <div>
              <PageTitle>{category.name}</PageTitle>
              <p className="text-muted-foreground mt-1">{category.description}</p>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            {filteredPortfolios.length} of {category.projects_count} projects
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-end">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Portfolio Grid/List */}
        {filteredPortfolios.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Projects Found</h3>
            <p className="text-muted-foreground">
              No projects available in this category yet.
            </p>
          </div>
        ) : (
          <CategoryPortfolioGrid
            portfolios={filteredPortfolios}
            onPortfolioClick={handlePortfolioClick}
            onCreatorClick={handleCreatorClick}
            onTagClick={handleTagClick}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
