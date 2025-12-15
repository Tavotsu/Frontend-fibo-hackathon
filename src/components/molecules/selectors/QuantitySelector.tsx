import React from 'react';

interface QuantitySelectorProps {
    quantity: number;
    setQuantity: (qty: number) => void;
    isProcessing: boolean;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, setQuantity, isProcessing }) => {
    return (
        <div className="space-y-3">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Variations
            </label>
            <div className="flex gap-2">
                {[1, 2, 3, 4].map((num) => (
                    <button
                        key={num}
                        onClick={() => !isProcessing && setQuantity(num)}
                        disabled={isProcessing}
                        className={`flex-1 h-12 rounded-md text-sm font-medium border transition-all
              ${quantity === num
                                ? 'bg-primary text-white border-primary shadow-[0_0_10px_rgba(var(--primary),0.2)]'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'}
              ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
            `}
                    >
                        {num}
                    </button>
                ))}
            </div>
        </div>
    );
};
