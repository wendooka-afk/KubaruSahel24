import React, { useState, useRef, useEffect } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import ImageUploader from '../../../components/ImageUploader';
import InlineImageModal from '../../../components/InlineImageModal';
import { Article, Category, Author } from '../../../types';
import { AUTHORS_FR, AUTHORS_EN } from '../../../data/mockData';
import { useLanguage } from '../../../contexts/LanguageContext';
import { optimizeImage } from '../../../utils/image';
import {
  Save, Image as ImageIcon, Video, Link as LinkIcon,
  Bold, Italic, List, Type, Quote,
  CheckCircle, AlertTriangle, Search, Globe, RefreshCw, Eye, Clock,
  ChevronDown, X, Upload, Link2, Monitor
} from 'lucide-react';

interface NewArticlePageProps {
  onNavigate: (view: string) => void;
  onLogout: () => void;
  onSubmit: (article: Article) => void;
  initialData?: Article;
}

const dataURItoBlob = (dataURI: string) => {
  try {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  } catch (e) {
    console.error("Error converting data URI to blob", e);
    return null;
  }
};

const NewArticlePage: React.FC<NewArticlePageProps> = ({ onNavigate, onLogout, onSubmit, initialData }) => {
  const { language } = useLanguage();
  const authors = language === 'en' ? AUTHORS_EN : AUTHORS_FR;

  // Main Content State
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");

  // Metadata State
  const [category, setCategory] = useState<Category>(initialData?.category || 'Politique');
  const [authorId, setAuthorId] = useState(initialData?.author.id || '1');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [isBreaking, setIsBreaking] = useState(initialData?.isBreaking || false);
  const [isPremium, setIsPremium] = useState(initialData?.isPremium || false);
  const [status, setStatus] = useState<'draft' | 'published'>('published');

  // UI State
  const [imageInputMode, setImageInputMode] = useState<'upload' | 'url'>(initialData?.imageUrl?.startsWith('http') ? 'url' : 'upload');
  const [showPreview, setShowPreview] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [tempImages, setTempImages] = useState<Record<string, string>>({}); // BlobURL -> Base64
  const [blobUrls, setBlobUrls] = useState<string[]>([]); // Track for cleanup

  // SEO State
  const [seoTitle, setSeoTitle] = useState(initialData?.seo?.metaTitle || "");
  const [seoDescription, setSeoDescription] = useState(initialData?.seo?.metaDescription || "");
  const [slug, setSlug] = useState(initialData?.seo?.slug || "");
  const [keywords, setKeywords] = useState(initialData?.seo?.keywords?.join(', ') || "");

  // Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const featuredImageInputRef = useRef<HTMLInputElement>(null);
  const editorImageInputRef = useRef<HTMLInputElement>(null);

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  useEffect(() => {
    if (!slug && title) setSlug(slugify(title));
    if (!seoTitle && title) setSeoTitle(title);
  }, [title]);

  useEffect(() => {
    if (!seoDescription && excerpt) setSeoDescription(excerpt.substring(0, 160));
  }, [excerpt]);

  // ELITE FIX: Convert all Base64 to Blob URLs on initialization
  useEffect(() => {
    const sanitizeInitialData = () => {
      const newTempImages: Record<string, string> = {};
      const newBlobUrls: string[] = [];

      const convertBase64ToBlob = (base64: string) => {
        if (!base64 || !base64.startsWith('data:')) return base64;
        const blob = dataURItoBlob(base64);
        if (blob) {
          const url = URL.createObjectURL(blob);
          newTempImages[url] = base64;
          newBlobUrls.push(url);
          return url;
        }
        return base64;
      };

      // 1. Process Featured Image
      if (initialData?.imageUrl && initialData.imageUrl.startsWith('data:')) {
        const url = convertBase64ToBlob(initialData.imageUrl);
        setImageUrl(url);
      }

      // 2. Process Content
      if (initialData?.content) {
        let cleanContent = initialData.content;
        const base64Regex = /src="(data:image\/[^;]+;base64,[^"]+)"/g;
        let match;
        while ((match = base64Regex.exec(initialData.content)) !== null) {
          const base64 = match[1];
          const url = convertBase64ToBlob(base64);
          cleanContent = cleanContent.replaceAll(base64, url);
        }
        setContent(cleanContent);
        // Also strip <p> and <br> tags for the editor textarea if they were added by formatContentToHtml previously
        // Actually, the user might want to keep them if they were intentional. 
        // But NewArticlePage usually expects plain text with optional HTML tags.
      }

      setTempImages(newTempImages);
      setBlobUrls(newBlobUrls);
    };

    sanitizeInitialData();

    // Cleanup Blob URLs on unmount to prevent memory leaks
    return () => {
      blobUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, []); // Only on mount

  /**
   * Automatically wraps plain text paragraphs in <p> tags 
   * while preserving existing HTML tags.
   */
  const formatContentToHtml = (rawContent: string) => {
    if (!rawContent) return "";

    // If it looks like it's already HTML (starts with a tag), return as is
    if (rawContent.trim().startsWith('<')) {
      return rawContent;
    }

    // Split by double newlines to find paragraphs
    return rawContent
      .split(/\n\s*\n/)
      .map(para => para.trim())
      .filter(para => para.length > 0)
      .map(para => `<p class="mb-6">${para.replace(/\n/g, '<br />')}</p>`)
      .join('\n');
  };

  const insertTag = (openTag: string, closeTag: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const before = content.substring(0, start);
    const after = content.substring(end);

    const newContent = `${before}${openTag}${selectedText}${closeTag}${after}`;

    // PERFORMANCE optimization: If content is massive (e.g. includes many Base64 images),
    // frequent state updates can freeze the UI.
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      // Adjust selection range based on tag length
      const newCursorPos = start + openTag.length + selectedText.length + closeTag.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setIsOptimizing(true);
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        try {
          const optimized = await optimizeImage(base64);
          setImageUrl(optimized); // Save actual base64 string
        } catch (err) {
          console.error("Optimization failed:", err);
          setImageUrl(base64);
        } finally {
          setIsOptimizing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditorImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setIsOptimizing(true);
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        try {
          const optimized = await optimizeImage(base64);

          // Convert to Blob URL for performance
          const blob = dataURItoBlob(optimized);
          if (blob) {
            const blobUrl = URL.createObjectURL(blob);
            setTempImages(prev => ({ ...prev, [blobUrl]: optimized }));
            insertTag(`<figure class="my-6 text-center"><img src="${blobUrl}" class="w-full rounded-xl shadow-lg" /><figcaption class="text-center text-sm text-gray-400 mt-2 italic font-sans">Source : Kubaru Sahel 24</figcaption></figure>`);
          } else {
            // Fallback if blob conversion fails
            insertTag(`<figure class="my-6 text-center"><img src="${optimized}" class="w-full rounded-xl shadow-lg" /><figcaption class="text-center text-sm text-gray-400 mt-2 italic font-sans">Source : Kubaru Sahel 24</figcaption></figure>`);
          }

        } catch (err) {
          console.error("Optimization failed:", err);
          insertTag(`<figure class="my-6 text-center"><img src="${base64}" class="w-full rounded-xl shadow-lg" /><figcaption class="text-center text-sm text-gray-400 mt-2 italic font-sans">Source : Kubaru Sahel 24</figcaption></figure>`);
        } finally {
          setIsOptimizing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInsertInlineImage = (html: string) => {
    // Create a temporary DOM element to parse HTML and find images
    const div = document.createElement('div');
    div.innerHTML = html;
    const images = div.querySelectorAll('img');

    if (images.length === 0) {
      insertTag(html);
      return;
    }

    const newTempImages = { ...tempImages };
    let hasChanges = false;

    images.forEach(img => {
      if (img.src.startsWith('data:')) {
        const blob = dataURItoBlob(img.src);
        if (blob) {
          const blobUrl = URL.createObjectURL(blob);
          newTempImages[blobUrl] = img.src; // Keep original base64 for save
          img.src = blobUrl; // Use lightweight blob URL for editor
          hasChanges = true;
        }
      }
    });

    if (hasChanges) {
      setTempImages(newTempImages);
    }

    insertTag(div.innerHTML);
  };

  const calculateReadTime = () => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute) || 1;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !imageUrl) {
      alert("Veuillez remplir les champs obligatoires.");
      return;
    }

    const selectedAuthor = Object.values(authors).find(a => a.id === authorId) || Object.values(authors)[0];

    // Restore Base64 images from Blob URLs before saving
    let finalContent = content;
    let finalImageUrl = imageUrl;

    Object.entries(tempImages).forEach(([blobUrl, base64]) => {
      finalContent = finalContent.replaceAll(blobUrl, base64);
      if (finalImageUrl === blobUrl) finalImageUrl = base64;
    });

    const article: Article = {
      id: initialData?.id || Date.now().toString(),
      title,
      content: formatContentToHtml(finalContent),
      excerpt,
      category,
      imageUrl: finalImageUrl,
      author: selectedAuthor,
      publishedAt: initialData?.publishedAt || new Date().toISOString(),
      readTime: calculateReadTime(),
      views: initialData?.views || 0,
      isBreaking,
      isPremium,
      seo: {
        metaTitle: seoTitle,
        metaDescription: seoDescription,
        slug,
        keywords: keywords.split(',').map(k => k.trim())
      }
    };

    onSubmit(article);
  };

  return (
    <AdminLayout
      title={initialData ? "Modifier l'article" : "Rédiger un article"}
      currentView="ADMIN_ARTICLES"
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 pb-20">

        <div className="flex-1 space-y-8">
          <FormSection title="Contenu de l'article">
            <FormField label="Titre" required id="title">
              <input
                id="title"
                type="text"
                className="w-full text-2xl font-serif font-bold p-3 border-b-2 border-gray-100 focus:border-primary outline-none transition-all placeholder:text-gray-300"
                placeholder="Un titre percutant..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </FormField>

            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">Corps de l'article <span className="text-red-500">*</span></label>
              {isOptimizing && (
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-2 flex items-center justify-center gap-3 animate-pulse">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest text-[10px]">Traitement de l'image...</span>
                </div>
              )}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
                <div className="flex items-center gap-1 p-3 border-b border-gray-100 bg-gray-50/50 flex-wrap">
                  <ToolbarButton icon={<Bold size={18} />} onClick={() => insertTag('<b>', '</b>')} label="Gras" />
                  <ToolbarButton icon={<Italic size={18} />} onClick={() => insertTag('<i>', '</i>')} label="Italique" />
                  <div className="w-px h-6 bg-gray-200 mx-2"></div>
                  <ToolbarButton icon={<Type size={18} />} onClick={() => insertTag('<h3>', '</h3>')} label="Intertitre" />
                  <ToolbarButton icon={<Quote size={18} />} onClick={() => insertTag('<blockquote class="border-l-4 border-secondary pl-4 italic my-6 text-gray-700 font-serif">', '</blockquote>')} label="Citation" />
                  <div className="w-px h-6 bg-gray-200 mx-2"></div>
                  <ToolbarButton icon={<LinkIcon size={18} />} onClick={() => {
                    const url = prompt('URL du lien :');
                    if (url) insertTag(`<a href="${url}" class="text-accent underline">`, '</a>');
                  }} label="Lien" />
                  <input type="file" ref={editorImageInputRef} className="hidden" accept="image/*" onChange={handleEditorImageUpload} />
                  <ToolbarButton icon={<ImageIcon size={18} />} onClick={() => setShowImageModal(true)} label="Image" />
                  <ToolbarButton icon={<Video size={18} />} onClick={() => {
                    const id = prompt('ID Vidéo YouTube :');
                    if (id) insertTag(`<div class="aspect-video my-6"><iframe src="https://www.youtube.com/embed/${id}" class="w-full h-full rounded-xl shadow-lg" frameborder="0" allowfullscreen></iframe></div>`);
                  }} label="Vidéo" />
                </div>
                <textarea
                  ref={textareaRef}
                  className="w-full h-[600px] p-6 outline-none font-serif text-lg leading-relaxed resize-none text-gray-800"
                  placeholder="Racontez votre histoire..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  required
                />
              </div>
            </div>

            <FormField label="Résumé (Extrait)" id="excerpt">
              <textarea
                id="excerpt"
                className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none min-h-[100px] resize-none"
                placeholder="Quelques lignes pour accrocher le lecteur..."
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                maxLength={250}
              />
              <p className="text-[10px] text-gray-400 text-right">{excerpt.length}/250</p>
            </FormField>
          </FormSection>

          <FormSection title="Référencement (SEO)" icon={<Search size={18} />}>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8 max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Globe size={14} className="text-gray-400" />
                <span className="text-[10px] text-gray-400">Preview Google</span>
              </div>
              <h4 className="text-[#1a0dab] text-xl font-medium truncate mb-1">{seoTitle || title || "Titre SEO"}</h4>
              <p className="text-green-700 text-sm truncate mb-1">kubarusahel24.com › {slug || "votre-article"}</p>
              <p className="text-sm text-gray-600 line-clamp-2">{seoDescription || excerpt || "Description méta..."}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Titre Méta" id="seo-title">
                <input
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
                  value={seoTitle}
                  onChange={e => setSeoTitle(e.target.value)}
                  placeholder="Titre pour les moteurs"
                />
              </FormField>
              <FormField label="URL Personnalisée (Slug)" id="seo-slug">
                <input
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
                  value={slug}
                  onChange={e => setSlug(slugify(e.target.value))}
                  placeholder="slug-de-l-article"
                />
              </FormField>
              <div className="md:col-span-2">
                <FormField label="Méta Description" id="seo-desc">
                  <textarea
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none resize-none h-20"
                    value={seoDescription}
                    onChange={e => setSeoDescription(e.target.value)}
                    placeholder="Description courte pour Google"
                  />
                </FormField>
              </div>
            </div>
          </FormSection>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden sticky top-6">
            <div className="bg-primary text-white p-5 font-bold flex justify-between items-center">
              <span>Publication</span>
              <Save size={20} />
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                <span>Statut</span>
                <select
                  className="bg-gray-100 px-3 py-1 rounded text-primary border-none outline-none"
                  value={status}
                  onChange={e => setStatus(e.target.value as any)}
                >
                  <option value="draft">Brouillon</option>
                  <option value="published">Publier</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="w-full py-3 bg-gray-50 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 border border-gray-100"
                >
                  <Eye size={18} /> Aperçu
                </button>
                <button
                  type="submit"
                  className="w-full py-3 bg-secondary text-primary font-bold rounded-xl hover:bg-yellow-400 transition-all shadow-lg shadow-secondary/20"
                >
                  {status === 'published' ? 'Mettre en ligne' : 'Enregistrer'}
                </button>
              </div>
            </div>
          </div>

          <FormSection title="Catégorisation">
            <FormField label="Rubrique" id="cat">
              <select
                className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none bg-white font-bold"
                value={category}
                onChange={e => setCategory(e.target.value as Category)}
              >
                {['Politique', 'Économie', 'Société', 'Culture', 'Régions', 'Sport', 'Tech'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </FormField>

            <FormField label="Journaliste" id="auth">
              <select
                className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none bg-white font-bold"
                value={authorId}
                onChange={e => setAuthorId(e.target.value)}
              >
                {Object.values(authors).map(a => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </FormField>
          </FormSection>

          <FormSection title="Image principale">
            <ImageUploader
              value={imageUrl}
              onChange={setImageUrl}
              aspectRatio="video"
              showGallery={true}
            />

            <div className="pt-4 border-t border-gray-50 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`w-5 h-5 rounded border transition-colors flex items-center justify-center ${isBreaking ? 'bg-red-500 border-red-500 text-white' : 'border-gray-300 bg-white'}`}>
                  {isBreaking && <CheckCircle size={14} />}
                </div>
                <input type="checkbox" className="hidden" checked={isBreaking} onChange={() => setIsBreaking(!isBreaking)} />
                <span className="text-xs font-bold text-gray-700 uppercase">Flash Info / Direct</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`w-5 h-5 rounded border transition-colors flex items-center justify-center ${isPremium ? 'bg-primary border-primary text-white' : 'border-gray-300 bg-white'}`}>
                  {isPremium && <CheckCircle size={14} />}
                </div>
                <input type="checkbox" className="hidden" checked={isPremium} onChange={() => setIsPremium(!isPremium)} />
                <span className="text-xs font-bold text-gray-700 uppercase">Article Premium</span>
              </label>
            </div>
          </FormSection>
        </div>
      </form>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full h-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fade-in">
            <div className="p-4 bg-primary text-white flex justify-between items-center flex-shrink-0">
              <span className="font-serif font-bold text-lg px-4">Prévisualisation</span>
              <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 md:p-12">
              <div className="max-w-3xl mx-auto">
                <div className="flex gap-2 mb-6">
                  <span className="bg-primary/5 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{category}</span>
                  {isPremium && <span className="bg-secondary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Premium</span>}
                </div>
                <h1 className="font-serif text-3xl md:text-5xl font-black text-primary mb-6 leading-tight">{title || "Titre de l'article"}</h1>
                <p className="text-xl md:text-2xl text-gray-500 font-serif italic mb-8 border-l-4 border-secondary pl-6 leading-relaxed">{excerpt}</p>
                <img src={imageUrl} className="w-full rounded-2xl mb-10 shadow-xl" />
                <div className="prose prose-lg prose-slate max-w-none font-serif text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatContentToHtml(content) }} />
                {/* Note: In preview, blob URLs will work as long as they are valid. No need to replace them here for preview. */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inline Image Modal */}
      <InlineImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        onInsert={handleInsertInlineImage}
      />
    </AdminLayout>
  );
};

// UI Helpers
// Fix: Use React.FC type with explicit children to ensure JSX recognizes nested elements correctly
const FormSection: React.FC<{ title: string; icon?: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="bg-gray-50/50 px-8 py-4 border-b border-gray-100 flex items-center gap-3">
      {icon && <div className="text-primary">{icon}</div>}
      <h3 className="font-black text-primary text-[10px] uppercase tracking-[0.2em]">{title}</h3>
    </div>
    <div className="p-8 space-y-8">
      {children}
    </div>
  </div>
);

// Fix: Use React.FC type with explicit children to ensure JSX recognizes nested input elements correctly
const FormField: React.FC<{ label: string; required?: boolean; id: string; children: React.ReactNode }> = ({ label, required, id, children }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const ToolbarButton = ({ icon, onClick, label }: { icon: React.ReactNode, onClick: () => void, label: string }) => (
  <button
    type="button"
    onClick={onClick}
    title={label}
    className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-all"
  >
    {icon}
  </button>
);

export default NewArticlePage;