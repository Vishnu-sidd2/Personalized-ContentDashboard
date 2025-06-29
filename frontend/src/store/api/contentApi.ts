import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  category: string;
}

export interface MovieRecommendation {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface SocialPost {
  id: string;
  username: string;
  handle: string;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  hashtags: string[];
  media?: {
    type: 'image' | 'video';
    url: string;
  };
}

export interface ContentResponse {
  news: NewsArticle[];
  movies: MovieRecommendation[];
  social: SocialPost[];
}

// Mock data generators
const generateMockNews = (categories: string[]): NewsArticle[] => {
  const sources = ['TechCrunch', 'BBC News', 'CNN', 'The Verge', 'Wired'];
  const mockNews: NewsArticle[] = [];
  
  categories.forEach((category, catIndex) => {
    for (let i = 0; i < 5; i++) {
      mockNews.push({
        id: `news-${catIndex}-${i}`,
        title: `Breaking ${category} News: Important Update ${i + 1}`,
        description: `This is a detailed description of the latest ${category} news that will keep you informed about current events.`,
        content: `Full article content about ${category} news with comprehensive coverage of the topic.`,
        url: `https://example.com/news/${category.toLowerCase()}-${i}`,
        urlToImage: `https://picsum.photos/400/300?random=${catIndex * 5 + i}`,
        publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        source: {
          id: `source-${i}`,
          name: sources[i % sources.length]
        },
        category: category.toLowerCase()
      });
    }
  });
  
  return mockNews;
};

const generateMockMovies = (): MovieRecommendation[] => {
  const movies = [
    'Inception', 'The Dark Knight', 'Interstellar', 'Dune', 'Avatar',
    'Spider-Man', 'Marvel Studios', 'Star Wars', 'Blade Runner', 'Matrix'
  ];
  
  return movies.map((movie, i) => ({
    id: i + 1,
    title: `${movie}: The Ultimate Experience`,
    overview: `An epic adventure that will take you on a journey through ${movie}'s incredible world.`,
    poster_path: `https://picsum.photos/300/450?random=${i + 100}`,
    backdrop_path: `https://picsum.photos/1920/1080?random=${i + 200}`,
    release_date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString().split('T')[0],
    vote_average: 7.5 + Math.random() * 2.5,
    genre_ids: [28, 12, 878] // Action, Adventure, Sci-Fi
  }));
};

const generateMockSocial = (): SocialPost[] => {
  const users = ['techguru', 'newsfeed', 'moviebuff', 'trendsetter', 'influencer'];
  const hashtags = ['#trending', '#tech', '#movies', '#news', '#social'];
  
  return users.map((user, i) => ({
    id: `social-${i}`,
    username: `${user}${Math.floor(Math.random() * 100)}`,
    handle: `@${user}`,
    content: `Just discovered something amazing! This is post ${i + 1} about trending topics. ${hashtags[i]} #contentdashboard`,
    timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    likes: Math.floor(Math.random() * 1000),
    retweets: Math.floor(Math.random() * 100),
    hashtags: [hashtags[i], '#contentdashboard'],
    media: Math.random() > 0.5 ? {
      type: 'image' as const,
      url: `https://picsum.photos/400/300?random=${i + 300}`
    } : undefined
  }));
};

export const contentApi = createApi({
  reducerPath: 'contentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL + '/api',
  }),
  tagTypes: ['Content'],
  endpoints: (builder) => ({
    getPersonalizedContent: builder.query<ContentResponse, { categories: string[]; searchTerm?: string }>({
      queryFn: async ({ categories, searchTerm = '' }) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const news = generateMockNews(categories.length > 0 ? categories : ['technology', 'business']);
        const movies = generateMockMovies();
        const social = generateMockSocial();
        
        // Filter by search term if provided
        const filteredNews = searchTerm 
          ? news.filter(article => 
              article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              article.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : news;
          
        const filteredMovies = searchTerm
          ? movies.filter(movie =>
              movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              movie.overview.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : movies;
          
        const filteredSocial = searchTerm
          ? social.filter(post =>
              post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
              post.hashtags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            )
          : social;
        
        return {
          data: {
            news: filteredNews,
            movies: filteredMovies,
            social: filteredSocial
          }
        };
      },
      providesTags: ['Content'],
    }),
    getTrendingContent: builder.query<ContentResponse, void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return {
          data: {
            news: generateMockNews(['trending']).slice(0, 3),
            movies: generateMockMovies().slice(0, 3),
            social: generateMockSocial().slice(0, 3)
          }
        };
      },
      providesTags: ['Content'],
    }),
  }),
});

export const { useGetPersonalizedContentQuery, useGetTrendingContentQuery } = contentApi;