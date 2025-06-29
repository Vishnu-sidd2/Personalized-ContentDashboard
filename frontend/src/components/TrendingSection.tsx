import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Flame, Clock } from 'lucide-react';
import { useGetTrendingContentQuery } from '../store/api/contentApi';
import ContentCard from './ContentCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const TrendingSection: React.FC = () => {
  const {
    data: trendingData,
    error,
    isLoading,
    refetch
  } = useGetTrendingContentQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage 
        message="Failed to load trending content. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  if (!trendingData) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400 text-lg">
          No trending content available.
        </div>
      </div>
    );
  }

  const allTrendingItems = [
    ...trendingData.news.map(item => ({ id: `news-${item.id}`, type: 'news' as const, data: item })),
    ...trendingData.movies.map(item => ({ id: `movie-${item.id}`, type: 'movie' as const, data: item })),
    ...trendingData.social.map(item => ({ id: `social-${item.id}`, type: 'social' as const, data: item }))
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
            <Flame className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Trending Now
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover what's hot right now across news, entertainment, and social media
        </p>
      </motion.div>

      {/* Trending Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Breaking News</h3>
              <p className="text-blue-100 text-sm">Latest updates</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-200" />
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">{trendingData.news.length}</div>
            <div className="text-blue-200 text-sm">Hot stories</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Must Watch</h3>
              <p className="text-purple-100 text-sm">Popular movies</p>
            </div>
            <Flame className="w-8 h-8 text-purple-200" />
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">{trendingData.movies.length}</div>
            <div className="text-purple-200 text-sm">Recommendations</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Viral Posts</h3>
              <p className="text-pink-100 text-sm">Social buzz</p>
            </div>
            <Clock className="w-8 h-8 text-pink-200" />
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">{trendingData.social.length}</div>
            <div className="text-pink-200 text-sm">Trending posts</div>
          </div>
        </div>
      </motion.div>

      {/* Trending Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allTrendingItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative">
              {/* Trending Badge */}
              <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                <Flame className="w-3 h-3 mr-1" />
                HOT
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

      {/* Load More */}
      <div className="text-center pt-8">
        <button
          onClick={() => refetch()}
          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Load More Trending
        </button>
      </div>
    </div>
  );
};

export default TrendingSection;