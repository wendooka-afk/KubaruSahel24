import React from 'react';
import { FileText, Video, MessageSquare, UserPlus, Clock, ArrowRight } from 'lucide-react';

interface ActivityItem {
    id: string;
    type: 'article' | 'video' | 'comment' | 'user';
    action: string;
    title: string;
    timestamp: string;
    user?: string;
}

interface ActivityLogProps {
    items: ActivityItem[];
    maxItems?: number;
    onViewAll?: () => void;
}

const getIcon = (type: ActivityItem['type']) => {
    const iconProps = { size: 14 };
    switch (type) {
        case 'article':
            return <FileText {...iconProps} className="text-blue-500" />;
        case 'video':
            return <Video {...iconProps} className="text-purple-500" />;
        case 'comment':
            return <MessageSquare {...iconProps} className="text-green-500" />;
        case 'user':
            return <UserPlus {...iconProps} className="text-orange-500" />;
    }
};

const getActionColor = (type: ActivityItem['type']) => {
    switch (type) {
        case 'article': return 'bg-blue-50 border-blue-100';
        case 'video': return 'bg-purple-50 border-purple-100';
        case 'comment': return 'bg-green-50 border-green-100';
        case 'user': return 'bg-orange-50 border-orange-100';
    }
};

const ActivityLog: React.FC<ActivityLogProps> = ({ items, maxItems = 5, onViewAll }) => {
    const displayItems = items.slice(0, maxItems);

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    Activité récente
                </h3>
                {onViewAll && (
                    <button
                        onClick={onViewAll}
                        className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                    >
                        Voir tout <ArrowRight size={12} />
                    </button>
                )}
            </div>

            <div className="divide-y divide-gray-50">
                {displayItems.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">
                        Aucune activité récente
                    </div>
                ) : (
                    displayItems.map((item, index) => (
                        <div
                            key={item.id}
                            className="p-4 hover:bg-gray-50/50 transition-colors animate-fade-in"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg border ${getActionColor(item.type)}`}>
                                    {getIcon(item.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-bold text-gray-800">{item.action}</span>
                                    </p>
                                    <p className="text-sm text-gray-800 font-medium truncate" title={item.title}>
                                        {item.title}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-gray-400">{item.timestamp}</span>
                                        {item.user && (
                                            <>
                                                <span className="text-gray-300">•</span>
                                                <span className="text-xs text-gray-500">{item.user}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ActivityLog;
