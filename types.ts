
export type Category = 'Politique' | 'Économie' | 'Société' | 'Culture' | 'Régions' | 'Sport' | 'Tech';

export type WebTVCategory = 
  | 'Journal Télévisé' 
  | 'Reportage de Terrain' 
  | 'Débats & Analyses' 
  | 'Magazines' 
  | 'Vox Pop' 
  | 'Opinion' 
  | 'Documentaires' 
  | 'Verbatim';

export type AuthorStatus = 'active' | 'inactive';
export type CommentStatus = 'pending' | 'approved' | 'rejected';

export interface SocialMedia {
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  email?: string;
  phone?: string;
  socialMedia?: SocialMedia;
  joinedDate?: string;
  articlesCount?: number;
  status?: AuthorStatus;
}

export interface ArticleSEO {
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
  keywords?: string[];
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown string
  category: Category;
  author: Author;
  publishedAt: string;
  imageUrl: string;
  isPremium?: boolean;
  isBreaking?: boolean;
  readTime: number; // in minutes
  views: number;
  seo?: ArticleSEO; // New SEO field
}

export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  category: WebTVCategory;
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  email?: string;
  content: string;
  date: string;
  likes: number;
  status: CommentStatus;
  parentId?: string; // For threaded replies
}
