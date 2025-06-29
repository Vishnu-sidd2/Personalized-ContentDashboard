import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Heart, 
  Share2, 
  ExternalLink, 
  Play, 
  Star,
  Calendar,
  User,
  ThumbsUp,
  MessageCircle,
  GripVertical
} from 'lucide-react';
import { format } from 'date-fns';
import { RootState } from '../store/store';
import { toggleFavorite } from '../store/slices/userPreferencesSlice';
import { NewsArticle, MovieRecommendation, SocialPost } from '../store/api/contentApi';

interface ContentCardProps {
  id: string;
  type: 'news' | 'movie' | 'social';
  data: NewsArticle | MovieRecommendation | SocialPost;
}

const ContentCard: React.FC<ContentCardProps> = ({ id, type, data }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state: RootState) => state.userPreferences);
  const isFavorite = favorites.includes(id);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(id));
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would implement actual sharing
    console.log('Sharing:', id);
  };

  const renderNewsCard = (article: NewsArticle) => (
    <div className="space-y-4">
      {article.urlToImage && (
        <div className="aspect-video relative overflow-hidden rounded-lg">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/400x200?text=News+Image';
            }}
          />
          <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
            {article.source.name}
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
          {article.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
          {article.description}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          {format(new Date(article.publishedAt), 'MMM dd, yyyy')}
        </span>
        <span className="capitalize bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          {article.category}
        </span>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => window.open(article.url, '_blank')}
          className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          Read More
        </button>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full transition-colors ${
              isFavorite 
                ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderMovieCard = (movie: MovieRecommendation) => (
    <div className="space-y-4">
      <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x450?text=Movie+Poster';
          }}
        />
        <div className="absolute top-2 right-2 flex items-center bg-black/70 text-white px-2 py-1 rounded text-xs">
          <Star className="w-3 h-3 mr-1 fill-current text-yellow-400" />
          {movie.vote_average.toFixed(1)}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
          {movie.overview}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          {format(new Date(movie.release_date), 'yyyy')}
        </span>
        <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
          Movie
        </span>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 text-sm font-medium">
          <Play className="w-4 h-4 mr-1" />
          Watch Trailer
        </button>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full transition-colors ${
              isFavorite 
                ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderSocialCard = (post: SocialPost) => (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-semibold text-gray-900 dark:text-white text-sm">
            {post.username}
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-xs">
            {post.handle} • {format(new Date(post.timestamp), 'MMM dd')}
          </div>
        </div>
      </div>

      <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
        {post.content}
      </p>

      {post.media && (
        <div className="aspect-video relative overflow-hidden rounded-lg">
          <img
            src={post.media.url}
            alt="Social media content"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/400x300?text=Social+Media+Image';
            }}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-1">
        {post.hashtags.map((tag, index) => (
          <span
            key={index}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400 text-sm">
          <span className="flex items-center">
            <ThumbsUp className="w-4 h-4 mr-1" />
            {post.likes}
          </span>
          <span className="flex items-center">
            <MessageCircle className="w-4 h-4 mr-1" />
            {post.retweets}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full transition-colors ${
              isFavorite 
                ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (type) {
      case 'news':
        return renderNewsCard(data as NewsArticle);
      case 'movie':
        return renderMovieCard(data as MovieRecommendation);
      case 'social':
        return renderSocialCard(data as SocialPost);
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200 dark:border-gray-700 cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-50 shadow-xl scale-105' : ''
      }`}
      whileHover={{ y: -2 }}
      {...attributes}
      {...listeners}
    >
      {/* Drag Handle */}
      <div className="flex justify-end mb-2">
        <GripVertical className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
      </div>
      
      {renderContent()}
    </motion.div>
  );
};

export default ContentCard;