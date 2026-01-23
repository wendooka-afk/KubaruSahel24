import React, { useState, useRef, useEffect } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import { Article, Category, Author } from '../../../types';
import { AUTHORS_FR, AUTHORS_EN } from '../../../data/mockData';
import { useLanguage } from '../../../contexts/LanguageContext';
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
}

const NewArticlePage: React.FC<NewArticlePageProps> = ({ onNavigate, onLogout, onSubmit }) => {
  const { language } = useLanguage();
  const authors = language === 'en' ? AUTHORS_EN : AUTHORS_FR;
  
  // Main Content State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  
  // Metadata State
  const [category, setCategory] = useState<Category>('Politique');
  const [authorId, setAuthorId] = useState('1');
  const [imageUrl, setImageUrl] = useState("");
  const [isBreaking, setIsBreaking] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');

  // UI State
  const [imageInputMode, setImageInputMode] = useState<'upload' | 'url'>('upload');
  const [showPreview, setShowPreview] = useState(false);

  // SEO State
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [keywords, setKeywords] = useState("");

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

  const insertTag = (openTag: string, closeTag: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const before = content.substring(0, start);
    const after = content.substring(end);

    const newContent = `${before}${openTag}${selectedText}${closeTag}${after}`;
    setContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + openTag.length, end + openTag.length);
    }, 0);
  };

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setImageUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleEditorImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        insertTag(`<figure class="my-6"><img src="${base64}" class="w-full rounded-xl shadow-lg" /><figcaption class="text-center text-sm text-gray-500 mt-2 italic">Légende</figcaption></figure>`);
      };
      reader.readAsDataURL(file);
    }
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

    const article: Article = {
      id: Date.now().toString(),
      title,
      content,
      excerpt,
      category,
      imageUrl,
      author: selectedAuthor,
      publishedAt: new Date().toISOString(),
      readTime: calculateReadTime(),
      views: 0,
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
    <AdminLayout title="Rédiger un article" currentView="ADMIN_ARTICLES" onNavigate={onNavigate} onLogout={onLogout}>
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
                    if(url) insertTag(`<a href="${url}" class="text-accent underline">`, '</a>');
                  }} label="Lien" />
                  <input type="file" ref={editorImageInputRef} className="hidden" accept="image/*" onChange={handleEditorImageUpload} />
                  <ToolbarButton icon={<ImageIcon size={18} />} onClick={() => editorImageInputRef.current?.click()} label="Image" />
                  <ToolbarButton icon={<Video size={18} />} onClick={() => {
                    const id = prompt('ID Vidéo YouTube :');
                    if(id) insertTag(`<div class="aspect-video my-6"><iframe src="https://www.youtube.com/embed/${id}" class="w-full h-full rounded-xl shadow-lg" frameborder="0" allowfullscreen></iframe></div>`);
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
             <div className="mb-4">
               {imageUrl ? (
                 <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 group">
                    <img src={imageUrl} className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => setImageUrl("")}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                 </div>
               ) : (
                 <div 
                   onClick={() => featuredImageInputRef.current?.click()}
                   className="aspect-video rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-white transition-all group"
                 >
                   <Upload size={30} className="text-gray-300 group-hover:text-primary transition-colors" />
                   <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase">Choisir une image</span>
                   <input type="file" ref={featuredImageInputRef} className="hidden" accept="image/*" onChange={handleFeaturedImageUpload} />
                 </div>
               )}
             </div>
             
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
                 <div className="prose prose-lg prose-slate max-w-none font-serif text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
               </div>
             </div>
          </div>
        </div>
      )}
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