import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, User, Calendar, Eye, Heart, MessageCircle, Flag, Ban, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getPortfolioDetailsThunk } from '@/store/portfolioDetails/thunk/getPortfolioDetailsThunk';
import { getPortfolioImageUrl } from '@/utils/mediaUtils';
import ImageGallery from '@/components/ImageGallery';
import VideoPlayer from '@/components/VideoPlayer';
import { toast } from 'react-toastify';

const AdminPortfolioDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: portfolio, loading, error } = useSelector(state => state.portfolioDetails);

  useEffect(() => {
    if (slug) {
      dispatch(getPortfolioDetailsThunk(slug));
    }
  }, [dispatch, slug]);


  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Portfolio Not Found</h2>
          <p className="text-muted-foreground mb-4">{error || 'The requested portfolio could not be found.'}</p>
          <Button onClick={() => navigate('/admin')}>
            <ArrowLeft className="size-4 mr-2" />
            Back to Admin Panel
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate('/admin')}>
                <ArrowLeft className="size-4 mr-2" />
                Back to Admin
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Portfolio Review</h1>
                <p className="text-muted-foreground">Admin moderation view</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Portfolio Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{portfolio.title}</CardTitle>
                    <p className="text-muted-foreground mt-2">{portfolio.description}</p>
                  </div>
                  <Badge variant={portfolio.status === 'published' ? 'default' : 'secondary'}>
                    {portfolio.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Cover Image */}
                {portfolio.cover_image && (
                  <div className="mb-6">
                    <img
                      src={getPortfolioImageUrl(portfolio.cover_image)}
                      alt={portfolio.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Media Gallery */}
                {portfolio.media && portfolio.media.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Media Files</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {portfolio.media.map((media, index) => (
                        <div key={media.id} className="border rounded-lg overflow-hidden">
                          {media.file_path.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                            <img
                              src={getPortfolioImageUrl(media.file_path)}
                              alt={`Media ${index + 1}`}
                              className="w-full h-48 object-cover"
                            />
                          ) : media.file_path.match(/\.(mp4|webm|ogg)$/i) ? (
                            <VideoPlayer src={getPortfolioImageUrl(media.file_path)} />
                          ) : media.file_path.match(/\.(mp3|wav|m4a|aac|flac)$/i) ? (
                            <div className="w-full h-48 bg-muted flex flex-col items-center justify-center p-4">
                              <div className="text-center mb-4">
                                <div className="text-lg font-medium text-foreground">Audio File</div>
                                <div className="text-sm text-muted-foreground">
                                  {media.file_path.split('.').pop().toUpperCase()} Format
                                </div>
                              </div>
                              <audio controls className="w-full max-w-md">
                                <source src={getPortfolioImageUrl(media.file_path)} type={`audio/${media.file_path.split('.').pop()}`} />
                                Your browser does not support the audio element.
                              </audio>
                            </div>
                          ) : (
                            <div className="w-full h-48 bg-muted flex flex-col items-center justify-center">
                              <p className="text-muted-foreground text-center">
                                <span className="block font-medium">Unsupported file type</span>
                                <span className="block text-sm mt-1">
                                  {media.file_path.split('.').pop().toUpperCase()} files are not supported for preview
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {portfolio.tags && portfolio.tags.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {portfolio.tags.map((tag) => (
                        <Badge key={tag.id} variant="outline">
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categories */}
                {portfolio.categories && portfolio.categories.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {portfolio.categories.map((category) => (
                        <Badge key={category.id} variant="secondary">
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Info */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Owner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="size-12">
                    <AvatarImage src={portfolio.user?.profile_picture} alt={portfolio.user?.name} />
                    <AvatarFallback>{portfolio.user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{portfolio.user?.name}</h3>
                    <p className="text-sm text-muted-foreground">ID: {portfolio.user?.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="size-4 text-muted-foreground" />
                    <span>Views</span>
                  </div>
                  <span className="font-semibold">{portfolio.views_count || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="size-4 text-muted-foreground" />
                    <span>Likes</span>
                  </div>
                  <span className="font-semibold">{portfolio.likes_count || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="size-4 text-muted-foreground" />
                    <span>Comments</span>
                  </div>
                  <span className="font-semibold">{portfolio.comments_count || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-muted-foreground" />
                    <span>Created</span>
                  </div>
                  <span className="text-sm">{formatDate(portfolio.created_at)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-muted-foreground" />
                    <span>Updated</span>
                  </div>
                  <span className="text-sm">{formatDate(portfolio.updated_at)}</span>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPortfolioDetail;
