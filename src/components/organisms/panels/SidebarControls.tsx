import React from 'react';
import logoMain from '../../../assets/logo-main.png';
import { useNavigate } from 'react-router-dom';
import { PanelLeftClose, PanelLeftOpen, Cpu, Layers, Send, Loader2, AlertCircle, ChevronLeft } from 'lucide-react';
import { Button } from '../../atoms/actions/Button';
import { Textarea } from '../../atoms/inputs/Textarea';
import { ImageUploader } from '../../molecules/selectors/ImageUploader';
import { ThemeToggle } from '../../molecules/toggles/ThemeToggle';
import { CameraAngleSelector } from '../../molecules/selectors/CameraAngleSelector';
import { QuantitySelector } from '../../molecules/selectors/QuantitySelector';
import { UserProfile } from '../../molecules/UserProfile';

interface SidebarControlsProps {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
    isDarkMode: boolean;
    setIsDarkMode: (v: boolean) => void;

    selectedImage: string | null;
    setSelectedImage: (s: string | null) => void;

    prompt: string;
    setPrompt: (s: string) => void;

    selectedAngle: string;
    setSelectedAngle: (s: string) => void;

    quantity: number;
    setQuantity: (n: number) => void;

    isProcessing: boolean;
    error: string | null;
    onSubmit: () => void;
    showToggle?: boolean;
}

export const SidebarControls: React.FC<SidebarControlsProps> = ({
    isOpen, setIsOpen,
    isDarkMode, setIsDarkMode,
    selectedImage, setSelectedImage,
    prompt, setPrompt,
    selectedAngle, setSelectedAngle,
    quantity, setQuantity,
    isProcessing, error, onSubmit,
    showToggle = true
}) => {
    const navigate = useNavigate();
    return (
        <>
            {/* Overlay para móvil */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`
                    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    ${isOpen ? 'w-full md:w-80 lg:w-96' : 'w-0'}
                    fixed md:relative inset-y-0 left-0
                    transition-all duration-300 ease-in-out 
                    flex flex-col border-r border-zinc-800 
                    bg-zinc-900/95 md:bg-zinc-900/50 
                    backdrop-blur-sm z-50 md:z-20
                `}
            >
                {showToggle && (
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="
                        hidden md:flex
                        md:absolute 
                        top-4 -right-8
                        bg-zinc-900 border border-zinc-800 border-l-0
                        p-1.5 
                        rounded-r-md
                        text-zinc-400 hover:text-white 
                        z-50 transition-colors
                    "
                        title={isOpen ? "Ocultar panel" : "Mostrar panel"}
                    >
                        {isOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
                    </button>
                )}

                <div className={`${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible w-0'} transition-all duration-200 flex flex-col h-full overflow-hidden`}>

                    {/* Header */}
                    <div className="p-5 border-b border-zinc-800 dark:border-zinc-800 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <img src={logoMain} alt="BrandLab Logo" className="w-8 h-8 object-contain" />
                            <div>
                                <h1 className="font-bold text-lg leading-none tracking-tight">BrandLab</h1>
                                <p className="text-[10px] text-zinc-400 font-medium tracking-wide">Model 0.1a</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <ThemeToggle isDarkMode={isDarkMode} toggle={() => setIsDarkMode(!isDarkMode)} />
                            <div className="w-px h-4 bg-zinc-800 mx-1"></div>
                            <UserProfile />
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar">

                        {/* Reference Image */}
                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                                <Layers className="w-3 h-3" /> Input Source
                            </label>
                            <ImageUploader
                                onImageSelected={setSelectedImage}
                                selectedImage={selectedImage}
                            />
                        </div>

                        {/* Prompt */}
                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                Creative Prompt
                            </label>
                            <Textarea
                                placeholder="Describe your vision for the marketing image..."
                                className="min-h-[100px] resize-none bg-zinc-950/50 border-zinc-800 focus:border-primary/50 transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                disabled={isProcessing}
                            />
                        </div>

                        {/* Camera Angles */}
                        <CameraAngleSelector
                            selectedAngle={selectedAngle}
                            setSelectedAngle={setSelectedAngle}
                            isProcessing={isProcessing}
                        />

                        {/* Quantity */}
                        <QuantitySelector
                            quantity={quantity}
                            setQuantity={setQuantity}
                            isProcessing={isProcessing}
                        />

                        {/* Error Display */}
                        {error && (
                            <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded-md text-red-200 text-xs flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                <div>{error}</div>
                            </div>
                        )}

                    </div>

                    {/* Footer Actions */}
                    <div className="p-5 border-t border-zinc-800 dark:border-zinc-800 bg-zinc-900/80 dark:bg-zinc-900/80">
                        <Button
                            onClick={onSubmit}
                            disabled={isProcessing || (!prompt && !selectedImage)}
                            className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20"
                            size="lg"
                        >
                            {isProcessing ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Starting...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Send className="w-4 h-4" /> Generate Render
                                </span>
                            )}
                        </Button>

                        <Button
                            variant="ghost"
                            onClick={() => navigate('/')}
                            className="w-full mt-2 text-xs text-zinc-500 hover:text-zinc-300 h-8"
                        >
                            Back to Home
                        </Button>
                    </div>
                    {/* Mobile Swipe Indicator Handle */}
                    <div className="md:hidden absolute top-1/2 right-0 transform -translate-y-1/2 z-50 pointer-events-none">
                        <div className="flex flex-col items-center justify-center animate-pulse">
                            <div className="bg-zinc-800/80 backdrop-blur-md py-6 px-1 rounded-l-xl border border-r-0 border-zinc-700 shadow-lg flex items-center justify-center">
                                <ChevronLeft className="w-4 h-4 text-zinc-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};
