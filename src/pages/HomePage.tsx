import React, { useState, useEffect } from 'react';
import { SidebarControls } from '../components/organisms/panels/SidebarControls';
import { GallerySidebar } from '../components/organisms/panels/GallerySidebar';
import { MainCanvas } from '../components/organisms/canvas/MainCanvas';
import { MainLayout } from '../components/templates/MainLayout';
import { CAMERA_ANGLES } from '../components/molecules/selectors/CameraAngleSelector';
import { startGenerationProcess } from '../services/geminiService';
import { GeneratedImage, JobStatusResponse } from '../types';
import { useSwipe } from '../hooks/useSwipe';

export const HomePage: React.FC = () => {
    // State
    const [prompt, setPrompt] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedAngle, setSelectedAngle] = useState<string>('eye-level');
    const [quantity, setQuantity] = useState<number>(4);

    const [isProcessing, setIsProcessing] = useState(false);
    const [jobStatus, setJobStatus] = useState<JobStatusResponse | null>(null);
    const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
    const [activeImageId, setActiveImageId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // UI State
    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Derived state
    const activeImage = generatedImages.find(img => img.id === activeImageId) || generatedImages[0];

    // Mobile Responsive Logic
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                // Mobile: Prioritize Left Sidebar (Controls)
                setIsLeftSidebarOpen(true);
                setIsRightSidebarOpen(false);
            } else {
                // Desktop: Both open by default
                setIsLeftSidebarOpen(true);
                setIsRightSidebarOpen(true);
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Mutual Exclusivity Helpers for Mobile
    const handleSetLeftSidebar = (value: boolean) => {
        setIsLeftSidebarOpen(value);
        if (value && window.innerWidth < 768) {
            setIsRightSidebarOpen(false);
        }
    };

    const handleSetRightSidebar = (value: boolean) => {
        setIsRightSidebarOpen(value);
        if (value && window.innerWidth < 768) {
            setIsLeftSidebarOpen(false);
        }
    };

    // Swipe Handling
    const swipeHandlers = useSwipe({
        onSwipeLeft: () => {
            if (window.innerWidth >= 768) return; // Only mobile

            if (isLeftSidebarOpen) {
                // If left is open, closing it goes to center
                setIsLeftSidebarOpen(false);
            } else if (!isRightSidebarOpen) {
                // If center, opening right
                handleSetRightSidebar(true);
            }
        },
        onSwipeRight: () => {
            if (window.innerWidth >= 768) return; // Only mobile

            if (isRightSidebarOpen) {
                // If right is open, closing it goes to center
                setIsRightSidebarOpen(false);
            } else if (!isLeftSidebarOpen) {
                // If center, opening left
                handleSetLeftSidebar(true);
            }
        },
        threshold: 75 // Slightly higher threshold to avoid accidental swipes
    });

    const handleSubmit = async () => {
        console.log('[BrandAI] handleSubmit called');

        if (!prompt.trim() || !selectedImage) {
            setIsLeftSidebarOpen(false); // Close sidebar to show error on canvas if needed, or maybe keep it.
            // Actually, keep it open to fix error.
            setError("Se requiere una imagen y un prompt para iniciar.");
            return;
        }

        // Cerrar sidebar en móvil al enviar
        if (window.innerWidth < 768) {
            setIsLeftSidebarOpen(false);
        }

        setIsProcessing(true);
        setError(null);
        setJobStatus(null);

        // Construct Payload
        const payload = {
            prompt: prompt,
            image_data: selectedImage,
            camera_angle: CAMERA_ANGLES.find(a => a.id === selectedAngle)?.promptMod || '',
            quantity: quantity
        };

        try {
            const results = await startGenerationProcess(payload, (status) => {
                setJobStatus(status);
            });

            console.log('[Marketech App] Generation results:', results);
            if (results && results.length > 0) {
                setGeneratedImages(prev => [...results, ...prev]);
                setActiveImageId(results[0].id);
            }
        } catch (err: any) {
            console.error('[Marketech App] Generation error:', err);
            setError(err.message || "Error desconocido durante la generación.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="h-screen w-full overflow-hidden touch-none" {...swipeHandlers}>
            <MainLayout isDarkMode={isDarkMode}>
                <SidebarControls
                    isOpen={isLeftSidebarOpen}
                    setIsOpen={handleSetLeftSidebar}
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    prompt={prompt}
                    setPrompt={setPrompt}
                    selectedAngle={selectedAngle}
                    setSelectedAngle={setSelectedAngle}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    isProcessing={isProcessing}
                    error={error}
                    onSubmit={handleSubmit}
                    showToggle={!isRightSidebarOpen}
                />

                <MainCanvas
                    isProcessing={isProcessing}
                    jobStatus={jobStatus}
                    activeImage={activeImage}
                />

                <GallerySidebar
                    isOpen={isRightSidebarOpen}
                    setIsOpen={handleSetRightSidebar}
                    images={generatedImages}
                    activeImageId={activeImageId}
                    setActiveImageId={setActiveImageId}
                    isProcessing={isProcessing}
                    showToggle={!isLeftSidebarOpen}
                />
            </MainLayout>
        </div>
    );
};
