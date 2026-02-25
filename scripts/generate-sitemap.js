import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const DOMAIN = 'https://kubarusahel24.com';

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL or Anon key is missing. Check your .env file.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function generateSitemap() {
    console.log('Generating sitemap...');

    // 1. Static Routes
    const staticRoutes = [
        '',
        '/about',
        '/contact',
        '/webtv',
        '/authors',
        '/search',
        '/privacy',
        '/terms',
        '/newsletter',
    ];

    // 2. Fetch Articles from Supabase
    const { data: articles, error } = await supabase
        .from('articles')
        .select('id, category, seo_json, publishedAt')
        .order('publishedAt', { ascending: false });

    if (error) {
        console.error('Error fetching articles:', error);
        process.exit(1);
    }

    // 3. Category Routes
    const categories = [...new Set(articles.map(a => a.category))];
    const categoryRoutes = categories.map(cat => `/category/${cat}`);

    // 4. Build XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Add static routes
    staticRoutes.forEach(route => {
        xml += `  <url>
    <loc>${DOMAIN}${route}</loc>
    <changefreq>daily</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>
`;
    });

    // Add category routes
    categoryRoutes.forEach(route => {
        xml += `  <url>
    <loc>${DOMAIN}${route}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
`;
    });

    // Add article routes
    articles.forEach(article => {
        const slug = article.seo_json?.slug || article.id;
        const category = article.category;
        const url = `${DOMAIN}/${category}/${slug}`;
        const date = new Date(article.publishedAt).toISOString().split('T')[0];

        xml += `  <url>
    <loc>${url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    });

    xml += '</urlset>';

    // 5. Write to file
    const sitemapPath = resolve('public', 'sitemap.xml');
    writeFileSync(sitemapPath, xml);

    console.log(`Sitemap generated successfully at ${sitemapPath}`);
}

generateSitemap();
