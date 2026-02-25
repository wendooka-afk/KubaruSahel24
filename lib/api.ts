import { supabase } from './supabase';
import { Article, Author, Category } from '../types';

import { AUTHORS_FR } from '../data/mockData';

export const fetchAuthors = async (): Promise<Author[]> => {
    const { data, error } = await supabase.from('authors').select('*');
    if (error) {
        console.error('Error fetching authors:', error);
        return [];
    }

    // Auto-seed authors if empty so foreign key constraints don't fail for mock articles
    if (!data || data.length === 0) {
        const mockAuthors = Object.values(AUTHORS_FR).map(author => ({
            id: author.id,
            name: author.name,
            role: author.role,
            avatar: author.avatar,
            bio: author.bio,
            email: author.email,
            phone: author.phone,
            socialMedia: author.socialMedia,
            joinedDate: author.joinedDate,
            articlesCount: author.articlesCount,
            status: author.status
        }));

        const { error: insertError } = await supabase.from('authors').insert(mockAuthors);
        if (insertError) {
            console.error('Error seeding authors:', insertError.message);
        } else {
            console.log('Successfully seeded Supabase authors from mockData');
            return mockAuthors as Author[];
        }
    }

    return data as Author[];
};

export const fetchArticles = async (): Promise<Article[]> => {
    const { data, error } = await supabase
        .from('articles')
        .select(`
      *,
      author:author_id(*)
    `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching articles:', error);
        return [];
    }

    // Map DB fields to Article type
    return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        excerpt: item.excerpt,
        content: item.content,
        category: item.category as Category,
        imageUrl: item.imageUrl,
        author: item.author,
        publishedAt: item.publishedAt,
        readTime: item.readTime,
        views: item.views,
        isBreaking: item.isBreaking,
        isPremium: item.isPremium,
        seo: item.seo_json
    }));
};

export const saveArticle = async (article: Omit<Article, 'id'>, id?: string): Promise<Article | null> => {
    const articleData = {
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        imageUrl: article.imageUrl,
        author_id: article.author.id,
        publishedAt: article.publishedAt,
        readTime: article.readTime,
        views: article.views,
        isBreaking: article.isBreaking,
        isPremium: article.isPremium,
        seo_json: article.seo
    };

    let query = supabase.from('articles');
    if (id && !id.startsWith('mock-')) { // update existing real article
        const { data, error } = await query.update(articleData).eq('id', id).select('*, author:author_id(*)').single();
        if (error) {
            console.error('Error updating article:', error.message, error.details, error.hint);
            return null;
        }
        return mapArticle(data);
    } else {
        // insert new article
        const { data, error } = await query.insert(articleData).select('*, author:author_id(*)').single();
        if (error) {
            console.error('Error inserting article:', error.message, error.details, error.hint);
            return null;
        }
        return mapArticle(data);
    }
};

export const deleteArticle = async (id: string): Promise<boolean> => {
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) {
        console.error('Error deleting article:', error);
        return false;
    }
    return true;
};

export const uploadImage = async (file: File | Blob, fileName: string): Promise<string | null> => {
    const fileExt = fileName.split('.').pop() || 'jpg';
    const name = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { data, error } = await supabase.storage
        .from('article-images')
        .upload(name, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (error) {
        console.error('Error uploading image:', error);
        return null;
    }

    const { data: publicUrlData } = supabase.storage
        .from('article-images')
        .getPublicUrl(name);

    return publicUrlData.publicUrl;
};

const mapArticle = (item: any): Article => ({
    id: item.id,
    title: item.title,
    excerpt: item.excerpt,
    content: item.content,
    category: item.category as Category,
    imageUrl: item.imageUrl,
    author: item.author,
    publishedAt: item.publishedAt,
    readTime: item.readTime,
    views: item.views,
    isBreaking: item.isBreaking,
    isPremium: item.isPremium,
    seo: item.seo_json
});
