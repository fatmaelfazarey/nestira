import React from 'react';

interface LoadingStateProps {
    LoadingStateMessage: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ LoadingStateMessage }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <div className="flex flex-col items-center space-y-4">
                <div className="flex space-x-2">
                    <div className="w-4 h-4 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.32s] shadow-md"></div>
                    <div className="w-4 h-4 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.16s] shadow-lg shadow-orange-200"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full animate-bounce shadow-md"></div>
                </div>
                <div className="text-center">
                    <p className="text-gray-700 font-semibold text-lg">Loading {LoadingStateMessage}</p>
                    <p className="text-gray-500 text-sm mt-1">Please wait a moment...</p>
                </div>
            </div>
        </div>
    );
};

export default LoadingState;
