import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { RootState } from '../store/store';
import { useGetPersonalizedContentQuery } from '../store/api/contentApi';
import ContentCard from './ContentCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface ContentItem {
  id: string;
  type: 'news' | 'movie' | 'social';
  data: any;
}

const ContentFeed: React.FC = () => {
  const { categories } = useSelector((state: RootState) => state.userPreferences);
  const { searchTerm } = useSelector((state: RootState) => state.search);
  const [contentOrder, setContentOrder] = useState<string[]>([]);
  
  const {
    data: contentData,
    error,
    isLoading,
    refetch
  } = useGetPersonalizedContentQuery({
    categories,
    searchTerm
  });

  // Create unified content items
  const contentItems: ContentItem[] = React.useMemo(() => {
    if (!contentData) return [];
    
    const items: ContentItem[] = [];
    
    // Add news items
    contentData.news.forEach((article, index) => {
      items.push({
        id: `news-${article.id}`,
        type: 'news',
        data: article
      });
    });
    
    // Add movie items
    contentData.movies.forEach((movie, index) => {
      items.push({
        id: `movie-${movie.id}`,
        type: 'movie',
        data: movie
      });
    });
    
    // Add social items
    contentData.social.forEach((post, index) => {
      items.push({
        id: `social-${post.id}`,
        type: 'social',
        data: post
      });
    });
    
    // Shuffle array for mixed content feed
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    
    // Initialize content order if not set
    if (contentOrder.length === 0) {
      setContentOrder(shuffled.map(item => item.id));
    }
    
    return shuffled;
  }, [contentData, contentOrder.length]);

  // Reorder content based on current order
  const orderedContent = React.useMemo(() => {
    if (contentOrder.length === 0) return contentItems;
    
    return contentOrder
      .map(id => contentItems.find(item => item.id === id))
      .filter(Boolean) as ContentItem[];
  }, [contentItems, contentOrder]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback((event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setContentOrder((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

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
        message="Failed to load content. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  if (!contentData || orderedContent.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400 text-lg">
          {searchTerm ? 'No content found for your search.' : 'No content available.'}
        </div>
        {searchTerm && (
          <p className="text-gray-400 dark:text-gray-500 mt-2">
            Try adjusting your search terms or check your preferences.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Feed Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {searchTerm ? `Search Results for "${searchTerm}"` : 'Your Personalized Feed'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {orderedContent.length} items • Drag to reorder
          </p>
        </div>
        
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
        >
          Refresh
        </button>
      </div>

      {/* Content Grid with Drag & Drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={contentOrder}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {orderedContent.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05
                  }}
                >
                  <ContentCard
                    id={item.id}
                    type={item.type}
                    data={item.data}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </SortableContext>
      </DndContext>

      {/* Load More Button */}
      <div className="text-center pt-8">
        <button
          onClick={() => refetch()}
          className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors duration-200"
        >
          Load More Contentt
        </button>
      </div>
    </div>
  );
};

export default ContentFeed;