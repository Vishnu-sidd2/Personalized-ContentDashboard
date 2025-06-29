import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Heart, Bookmark, Star, Trash2 } from 'lucide-react';
import { RootState } from '../store/store';
import { useGetPersonalizedContentQuery } from '../store/api/contentApi';
import ContentCard from './ContentCard';
import LoadingSpinner from './LoadingSpinner';

const FavoritesSection: React.FC = () => {
  const { favorites, categories } = useSelector((state: RootState) => state.userPreferences);
  const { searchTerm } = useSelector((state: RootState) => state.search);
  
  const {
    data: contentData,
    isLoading
  } = useGetPersonalizedContentQuery({
    categories,
    searchTerm: ''
  });

  // Filter content to show only favorited items
  const favoriteItems = React.useMemo(() => {
    if (!contentData || favorites.length === 0) return [];
    
    const allItems = [
      ...contentData.news.map(item => ({ id: `news-${item.id}`, type: 'news' as const, data: item })),
      ...contentData.movies.map(item => ({ id: `movie-${item.id}`, type: 'movie' as const, data: item })),
      ...contentData.social.map(item => ({ id: `social-${item.id}`, type: 'social' as const, data: item }))
    ];
    
    return allItems.filter(item => favorites.includes(item.id));
  }, [contentData, favorites]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            No Favorites Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start exploring content and mark items as favorites to see them here.
          </p>
          <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center justify-center">
              <Heart className="w-4 h-4 mr-2" />
              Click the heart icon on any content card
            </div>
            <div className="flex items-center justify-center">
              <Bookmark className="w-4 h-4 mr-2" />
              Save articles, movies, and posts you love
            </div>
            <div className="flex items-center justify-center">
              <Star className="w-4 h-4 mr-2" />
              Build your personal collection
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const favoritesByType = {
    news: favoriteItems.filter(item => item.type === 'news'),
    movies: favoriteItems.filter(item => item.type === 'movie'),
    social: favoriteItems.filter(item => item.type === 'social')
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full">
            <Heart className="w-8 h-8 text-white fill-current" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Your Favorites
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {favoriteItems.length} saved item{favoriteItems.length !== 1 ? 's' : ''} you can revisit anytime
        </p>
      </motion.div>

      {/* Favorite Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">News Articles</h3>
              <p className="text-blue-600 dark:text-blue-400 text-sm">Saved stories</p>
            </div>
            <Bookmark className="w-8 h-8 text-blue-500" />
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {favoritesByType.news.length}
            </div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Movies</h3>
              <p className="text-purple-600 dark:text-purple-400 text-sm">Watchlist</p>
            </div>
            <Star className="w-8 h-8 text-purple-500" />
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {favoritesByType.movies.length}
            </div>
          </div>
        </div>

        <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-pink-900 dark:text-pink-100">Social Posts</h3>
              <p className="text-pink-600 dark:text-pink-400 text-sm">Liked posts</p>
            </div>
            <Heart className="w-8 h-8 text-pink-500 fill-current" />
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-pink-900 dark:text-pink-100">
              {favoritesByType.social.length}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-2 justify-center"
      >
        <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
          All ({favoriteItems.length})
        </button>
        {favoritesByType.news.length > 0 && (
          <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            News ({favoritesByType.news.length})
          </button>
        )}
        {favoritesByType.movies.length > 0 && (
          <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            Movies ({favoritesByType.movies.length})
          </button>
        )}
        {favoritesByType.social.length > 0 && (
          <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            Social ({favoritesByType.social.length})
          </button>
        )}
      </motion.div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative group">
              {/* Favorite Badge */}
              <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white p-2 rounded-full shadow-lg">
                <Heart className="w-3 h-3 fill-current" />
              </div>
              <ContentCard
                id={item.id}
                type={item.type}
                data={item.data}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesSection;