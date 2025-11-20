import React, { useState } from 'react';
import { X, Wand2, ArrowRight, Download } from 'lucide-react';
import { GeneratedImage, Language } from '../types';
import { Button } from './Button';
import { editFoodImage } from '../services/geminiService';
import { translations } from '../translations';

interface EditorModalProps {
  image: GeneratedImage;
  onClose: () => void;
  onUpdateImage: (newImageUrl: string) => void;
  lang: Language;
}

export const EditorModal: React.FC<EditorModalProps> = ({ image, onClose, onUpdateImage, lang }) => {
  const [prompt, setPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // We track the current displayed image (which might be an edited version)
  const [currentImage, setCurrentImage] = useState(image.imageUrl);
  const [history, setHistory] = useState<string[]>([image.imageUrl]);

  const t = translations[lang].modal;
  const tErrors = translations[lang].errors;

  const handleEdit = async () => {
    if (!prompt.trim()) return;
    
    setIsEditing(true);
    setError(null);
    
    try {
      const newUrl = await editFoodImage(currentImage, prompt);
      setCurrentImage(newUrl);
      setHistory(prev => [...prev, newUrl]);
      setPrompt('');
      onUpdateImage(newUrl); // Update parent state
    } catch (err) {
      setError(tErrors.edit);
    } finally {
      setIsEditing(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentImage;
    link.download = `gourmet-lens-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-culinary-card w-full max-w-4xl rounded-2xl overflow-hidden border border-gray-700 shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Image Area */}
        <div className="flex-1 bg-black flex items-center justify-center p-4 relative group">
          <img 
            src={currentImage} 
            alt={image.dishName} 
            className="max-w-full max-h-[60vh] md:max-h-full object-contain rounded-lg shadow-lg"
          />
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
             <Button variant="secondary" onClick={handleDownload} title={t.download}>
                <Download size={18} />
             </Button>
          </div>
        </div>

        {/* Controls Area */}
        <div className="w-full md:w-96 bg-culinary-card border-l border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-white text-lg">{image.dishName}</h3>
              <p className="text-xs text-gray-400">{translations[lang].styles[image.style]?.label || image.style}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            <div className="mb-6">
               <h4 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-3">{t.originalRequest}</h4>
               <p className="text-gray-300 text-sm italic">"{image.description}"</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-wider text-culinary-accent font-bold flex items-center gap-2">
                <Wand2 size={16} />
                {t.magicEditTitle}
              </h4>
              <p className="text-sm text-gray-400">
                {t.magicEditDesc} 
                <br/><i>{t.magicEditExample}</i>
              </p>
              
              <div className="space-y-2">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={t.editPlaceholder}
                  className="w-full bg-[#121212] border border-gray-700 rounded-lg p-3 text-white focus:border-culinary-accent focus:ring-1 focus:ring-culinary-accent outline-none resize-none h-24"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleEdit();
                    }
                  }}
                />
                <Button 
                  onClick={handleEdit} 
                  isLoading={isEditing}
                  loadingText={t.editingBtn}
                  disabled={!prompt.trim()}
                  className="w-full"
                >
                  {t.applyBtn} <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}
            </div>

            {history.length > 1 && (
               <div className="mt-8 pt-6 border-t border-gray-800">
                  <h4 className="text-xs text-gray-500 uppercase mb-2">{t.history}</h4>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {history.map((img, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setCurrentImage(img)}
                            className={`w-16 h-16 rounded overflow-hidden flex-shrink-0 border-2 ${currentImage === img ? 'border-culinary-accent' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                            <img src={img} className="w-full h-full object-cover" alt={`Version ${idx}`} />
                        </button>
                    ))}
                  </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};