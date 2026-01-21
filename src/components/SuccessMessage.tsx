import { memo } from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessMessageProps {
    message: string;
    onClose?: () => void;
}

const SuccessMessage = memo(({ message, onClose }: SuccessMessageProps) => {
    if (!message) return null;

    return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 fade-in">
            <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <p className="text-sm text-green-800 font-medium">{message}</p>
            </div>
        </div>
    );
});

SuccessMessage.displayName = 'SuccessMessage';

export default SuccessMessage;
