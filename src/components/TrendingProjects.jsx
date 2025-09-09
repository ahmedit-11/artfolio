import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTrendingProjectsThunk } from '@/store/trending/thunk/getTrendingProjectsThunk';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Heart, MessageCircle, TrendingUp } from 'lucide-react';
import { getPortfolioMediaUrl, getProfileImageUrl } from '@/utils/mediaUtils';

const TrendingProjects = ({ limit = 10, showHeader = true }) => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector(state => state.trending);

  useEffect(() => {
    // Fetch trending projects if not already loaded
    if (!projects.length) {
      dispatch(getTrendingProjectsThunk());
    }
  }, [dispatch, projects.length]);

  const displayProjects = limit ? projects.slice(0, limit) : projects;

  if (loading && !projects.length) {
    return (
      <div className="space-y-4">
        {showHeader && (
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold">Trending Projects</h2>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="p-4 animate-pulse">
              <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load trending projects: {error}</p>
        <button 
          onClick={() => dispatch(getTrendingProjectsThunk())}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!displayProjects.length) {
    return (
      <div className="text-center py-8">
        <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No trending projects found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold">Trending Projects</h2>
          </div>
          <Badge variant="secondary" className="text-xs">
            Last 30 days
          </Badge>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProjects.map((project, index) => (
          <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <Link to={`/portfolio/${project.slug}`}>
              <div className="relative">
                {/* Trending Badge */}
                {index < 3 && (
                  <Badge 
                    className="absolute top-2 left-2 z-10 bg-orange-500 hover:bg-orange-600"
                  >
                    #{index + 1} Trending
                  </Badge>
                )}

                {/* Cover Image */}
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  {project.cover_image ? (
                    <img
                      src={getPortfolioMediaUrl(project.cover_image)}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : project.media && project.media.length > 0 ? (
                    <img
                      src={getPortfolioMediaUrl(project.media[0].file_path)}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <TrendingUp className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4">
                {/* Title */}
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Author */}
                <div className="flex items-center gap-2 mb-3">
                  <img
                    src={getProfileImageUrl(project.user?.profile_picture)}
                    alt={project.user?.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-700 font-medium">
                    {project.user?.name}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{project.views_count || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{project.likes_count || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{project.comments_count || 0}</span>
                    </div>
                  </div>
                  <span className="text-xs">
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>

      {loading && projects.length > 0 && (
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 text-gray-500">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            Updating trending projects...
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingProjects;
