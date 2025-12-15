import React from 'react';
import { MonitorPlay } from 'lucide-react';
import { GeneratedImage } from '../../../types';

interface StatusIndicatorProps {
    isProcessing: boolean;
    activeImage: GeneratedImage | undefined;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ isProcessing, activeImage }) => {
    return (
        <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-zinc-500">
            <span className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] md:text-sm">
                <MonitorPlay className="w-3 h-3 md:w-3.5 md:h-3.5" />
                <span className="hidden sm:inline">
                    {isProcessing ? 'Processing Request' : activeImage ? 'Active View' : 'Waiting for Input'}
                </span>
                <span className="sm:hidden">
                    {isProcessing ? 'Processing' : activeImage ? 'Active' : 'Waiting'}
                </span>
            </span>
            {activeImage && !isProcessing && (
                <span className="hidden md:inline-block max-w-[300px] truncate opacity-50">
                    "{activeImage.prompt_used}"
                </span>
            )}
        </div>
    );
};
