import { memo } from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorAlertProps {
    message: string;
    onClose?: () => void;
}

const ErrorAlert = memo(({ message, onClose }: ErrorAlertProps) => {
    if (!message) return null;

    return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 fade-in">
            <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                <div className="flex-1">
                    <p className="text-sm text-red-800">{message}</p>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="ml-3 flex-shrink-0 text-red-600 hover:text-red-800"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
});

ErrorAlert.displayName = 'ErrorAlert';

export default ErrorAlert;
