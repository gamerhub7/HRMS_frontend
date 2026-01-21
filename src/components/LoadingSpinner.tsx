import { memo } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
    message?: string;
}

const LoadingSpinner = memo(({ message = 'Loading...' }: LoadingSpinnerProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
            <p className="mt-4 text-gray-600 font-medium">{message}</p>
        </div>
    );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
