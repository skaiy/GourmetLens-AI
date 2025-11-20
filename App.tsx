
import React, { useState, useCallback } from 'react';
import { GeneratedImage, PhotoStyle, LoadingState, Language, Preset } from './types';
import { generateFoodImage } from './services/geminiService';
import { StyleSelector } from './components/StyleSelector';
import { Button } from './components/Button';
import { EditorModal } from './components/EditorModal';
import { ChefHat, Image as ImageIcon, Sparkles, Globe, ChevronDown, Search } from 'lucide-react';
import { translations } from './translations';

const App: React.FC = () => {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<PhotoStyle>(PhotoStyle.MODERN);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>('en');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const t = translations[lang] || translations['en'];

  const isRTL = ['ar', 'he', 'fa', 'ur'].includes(lang);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishName.trim() || !description.trim()) return;

    setLoadingState('generating');
    setError(null);

    try {
      const imageUrl = await generateFoodImage(dishName, description, selectedStyle);
      
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        dishName,
        description,
        style: selectedStyle,
        imageUrl,
        timestamp: Date.now()
      };

      setGeneratedImages(prev => [newImage, ...prev]);
      setDishName('');
      setDescription('');
    } catch (err) {
      setError(t.errors.generate);
    } finally {
      setLoadingState('idle');
    }
  };

  const handleUpdateImage = useCallback((id: string, newUrl: string) => {
     setGeneratedImages(prev => prev.map(img => 
        img.id === id ? { ...img, imageUrl: newUrl } : img
     ));
  }, []);

  const handlePresetClick = (preset: Preset) => {
    setDishName(preset.dishName);
    setDescription(preset.description);
    setSelectedStyle(preset.style);
  };

  const languages: {code: Language, label: string}[] = [
    { code: 'en', label: 'English' }, { code: 'en-US', label: 'English (US)' }, { code: 'en-GB', label: 'English (UK)' },
    { code: 'zh-CN', label: '中文 (简体)' }, { code: 'zh-TW', label: '中文 (繁體)' },
    { code: 'es', label: 'Español' }, { code: 'es-419', label: 'Español (Latinoamérica)' },
    { code: 'pt-PT', label: 'Português' }, { code: 'pt-BR', label: 'Português (Brasil)' },
    { code: 'fr', label: 'Français' }, { code: 'de', label: 'Deutsch' },
    { code: 'ja', label: '日本語' }, { code: 'ko', label: '한국어' },
    { code: 'it', label: 'Italiano' }, { code: 'ru', label: 'Русский' },
    { code: 'hi', label: 'हिन्दी' }, { code: 'ar', label: 'العربية' }, { code: 'he', label: 'עברית' },
    { code: 'tr', label: 'Türkçe' }, { code: 'vi', label: 'Tiếng Việt' }, { code: 'th', label: 'ไทย' },
    { code: 'id', label: 'Bahasa Indonesia' }, { code: 'ms', label: 'Bahasa Melayu' }, { code: 'fil', label: 'Filipino' },
    { code: 'pl', label: 'Polski' }, { code: 'uk', label: 'Українська' }, { code: 'nl', label: 'Nederlands' },
    { code: 'sv', label: 'Svenska' }, { code: 'no', label: 'Norsk' }, { code: 'da', label: 'Dansk' }, { code: 'fi', label: 'Suomi' },
    { code: 'cs', label: 'Čeština' }, { code: 'sk', label: 'Slovenčina' }, { code: 'hu', label: 'Magyar' }, { code: 'ro', label: 'Română' },
    { code: 'el', label: 'Ελληνικά' }, { code: 'bg', label: 'Български' }, { code: 'sr', label: 'Српски' }, { code: 'hr', label: 'Hrvatski' },
    { code: 'sl', label: 'Slovenščina' }, { code: 'et', label: 'Eesti' }, { code: 'lv', label: 'Latviešu' }, { code: 'lt', label: 'Lietuvių' },
    { code: 'ca', label: 'Català' }, { code: 'fa', label: 'فارسی' }, { code: 'sw', label: 'Kiswahili' }, { code: 'am', label: 'አማርኛ' },
    { code: 'bn', label: 'বাংলা' }, { code: 'gu', label: 'ગુજરાતી' }, { code: 'mr', label: 'मराठी' }, { code: 'ta', label: 'தமிழ்' }, { code: 'te', label: 'తెలుగు' }, { code: 'kn', label: 'ಕನ್ನಡ' }, { code: 'ml', label: 'മലയാളം' }
  ];

  const selectedImage = generatedImages.find(img => img.id === selectedImageId);

  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'font-sans' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="border-b border-gray-800 bg-culinary-card/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-culinary-accent p-2 rounded-lg">
               <ChefHat className="text-black w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-culinary-accent to-yellow-200 hidden sm:block">
              {t.header.title}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors text-sm font-medium border border-gray-700 max-w-[160px]"
              >
                <Globe size={14} />
                <span className="truncate">{languages.find(l => l.code === lang)?.label}</span>
                <ChevronDown size={12} className={`transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangMenuOpen && (
                <div className={`absolute top-full mt-2 w-56 bg-culinary-card border border-gray-700 rounded-lg shadow-xl overflow-hidden z-50 max-h-[60vh] overflow-y-auto ${isRTL ? 'left-0' : 'right-0'}`}>
                  <div className="sticky top-0 bg-culinary-card p-2 border-b border-gray-700 z-10">
                    <div className="text-xs text-gray-500 uppercase font-bold px-2 pb-1">Select Language</div>
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-700 transition-colors border-b border-gray-800/50 last:border-0 ${lang === l.code ? 'text-culinary-accent bg-gray-800' : 'text-gray-300'}`}
                      style={{ textAlign: isRTL ? 'right' : 'left' }}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Input Controls */}
          <div className="lg:col-span-5 space-y-6">
             <div className="bg-culinary-card rounded-2xl p-6 border border-gray-800 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <ImageIcon className="text-culinary-accent" size={20} />
                  {t.input.newShoot}
                </h2>

                {/* Cuisine Presets */}
                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-2 flex items-center gap-2">
                    <Search size={12} /> {t.input.quickStart}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {t.presets.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handlePresetClick(preset)}
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:border-culinary-accent hover:text-culinary-accent transition-all text-left"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <form onSubmit={handleGenerate} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      {t.input.styleLabel}
                    </label>
                    <StyleSelector 
                      selectedStyle={selectedStyle} 
                      onSelect={setSelectedStyle}
                      lang={lang}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      {t.input.nameLabel}
                    </label>
                    <input
                      type="text"
                      value={dishName}
                      onChange={(e) => setDishName(e.target.value)}
                      placeholder={t.input.namePlaceholder}
                      className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-culinary-accent focus:ring-1 focus:ring-culinary-accent outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      {t.input.descLabel}
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t.input.descPlaceholder}
                      className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-culinary-accent focus:ring-1 focus:ring-culinary-accent outline-none h-32 resize-none transition-colors"
                    />
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-red-900/20 border border-red-900/50 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                    isLoading={loadingState === 'generating'}
                    loadingText={t.input.generatingBtn}
                    disabled={!dishName || !description}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    {t.input.generateBtn}
                  </Button>
                </form>
             </div>

             <div className="bg-gradient-to-br from-culinary-card to-transparent p-6 rounded-2xl border border-gray-800/50">
                <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">{t.input.proTipTitle}</h3>
                <p className="text-gray-500 text-sm">
                  {t.input.proTipDesc}
                </p>
             </div>
          </div>

          {/* RIGHT COLUMN: Gallery */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-xl font-bold text-white">{t.gallery.title}</h2>
               <span className="text-sm text-gray-500">{generatedImages.length} {t.gallery.countSuffix}</span>
            </div>

            {generatedImages.length === 0 ? (
              <div className="h-[500px] border-2 border-dashed border-gray-800 rounded-2xl flex flex-col items-center justify-center text-gray-600 bg-culinary-card/30">
                 <div className="bg-gray-800 p-4 rounded-full mb-4">
                    <ImageIcon size={32} className="opacity-50" />
                 </div>
                 <p className="text-lg font-medium">{t.gallery.emptyTitle}</p>
                 <p className="text-sm text-gray-500 mt-1">{t.gallery.emptyDesc}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {generatedImages.map((img) => (
                  <div 
                    key={img.id} 
                    onClick={() => setSelectedImageId(img.id)}
                    className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-gray-800 hover:border-culinary-accent transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.15)]"
                  >
                    <img 
                      src={img.imageUrl} 
                      alt={img.dishName} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                       <h3 className="text-white font-bold truncate">{img.dishName}</h3>
                       <p className="text-culinary-accent text-xs mb-2">
                          {translations[lang]?.styles[img.style]?.label || translations['en'].styles[img.style]?.label}
                       </p>
                       <div className="flex items-center text-xs text-gray-300">
                          <Sparkles size={12} className="mr-1" /> {t.gallery.clickToEdit}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Modal */}
      {selectedImage && (
        <EditorModal 
          image={selectedImage} 
          onClose={() => setSelectedImageId(null)} 
          onUpdateImage={(newUrl) => handleUpdateImage(selectedImage.id, newUrl)}
          lang={lang}
        />
      )}

      {/* Background Click to close language menu */}
      {isLangMenuOpen && (
        <div className="fixed inset-0 z-0" onClick={() => setIsLangMenuOpen(false)} />
      )}
    </div>
  );
};

export default App;
