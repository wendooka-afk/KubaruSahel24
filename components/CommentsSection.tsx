import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send } from 'lucide-react';
import { COMMENTS_FR } from '../data/mockData';
import { Comment } from '../types';
import { useToast } from './Toast';
import { useLanguage } from '../contexts/LanguageContext';

interface CommentsSectionProps {
  articleId?: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ articleId = '1' }) => {
  const { t } = useLanguage();
  // Filter only approved comments for the current article
  const initialComments = COMMENTS_FR.filter(c => c.articleId === articleId && c.status === 'approved');
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      articleId,
      author: 'Guest Reader',
      content: newComment,
      date: "Just now",
      likes: 0,
      status: 'pending' // New comments need moderation
    };

    setComments([comment, ...comments]);
    setNewComment('');
    addToast('Commentaire soumis ! Il sera visible après modération.', 'success');
  };

  const handleLike = (id: string) => {
    setComments(comments.map(c =>
      c.id === id ? { ...c, likes: c.likes + 1 } : c
    ));
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 md:p-8" id="comments">
      <div className="flex items-center gap-2 mb-8">
        <MessageSquare className="text-primary" size={24} />
        <h3 className="font-serif text-2xl font-bold text-primary">
          {t('comments.title')} <span className="text-gray-500 text-lg font-sans font-normal">({comments.length})</span>
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="mb-10 relative">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={t('comments.placeholder')}
          className="w-full p-4 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none min-h-[100px] resize-none text-sm"
        />
        <div className="absolute bottom-3 right-3 flex justify-end">
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50 hover:bg-blue-900 transition-colors"
          >
            <Send size={14} /> {t('comments.publish')}
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm animate-fade-in">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-xs">
                  {comment.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{comment.author}</h4>
                  <span className="text-xs text-gray-400">{comment.date}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">{comment.content}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
              <button
                onClick={() => handleLike(comment.id)}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <ThumbsUp size={14} /> {t('comments.like')} ({comment.likes})
              </button>
              <button className="hover:text-primary transition-colors">{t('comments.reply')}</button>
              <button className="hover:text-red-500 transition-colors ml-auto">{t('comments.report')}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;