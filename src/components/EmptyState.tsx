import { memo } from 'react';
import { FileX, Plus, LucideIcon } from 'lucide-react';

interface EmptyStateProps {
    icon?: LucideIcon;
    title?: string;
    message?: string;
    actionLabel?: string;
    onAction?: () => void;
}

const EmptyState = memo(({
    icon: Icon = FileX,
    title = 'No data found',
    message = 'Get started by adding your first item',
    actionLabel,
    onAction
}: EmptyStateProps) => {
    return (
        <div className="text-center py-12 px-4">
            <Icon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">{message}</p>
            {onAction && actionLabel && (
                <button onClick={onAction} className="btn btn-primary inline-flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    {actionLabel}
                </button>
            )}
        </div>
    );
});

EmptyState.displayName = 'EmptyState';

export default EmptyState;
