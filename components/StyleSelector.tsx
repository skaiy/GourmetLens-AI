import React from 'react';
import { PhotoStyle, Language } from '../types';
import { Sun, Moon, Camera } from 'lucide-react';
import { translations } from '../translations';

interface StyleSelectorProps {
  selectedStyle: PhotoStyle;
  onSelect: (style: PhotoStyle) => void;
  lang: Language;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelect, lang }) => {
  const t = translations[lang].styles;
  
  const styleOptions = [
    {
      id: PhotoStyle.RUSTIC,
      icon: Moon,
    },
    {
      id: PhotoStyle.MODERN,
      icon: Sun,
    },
    {
      id: PhotoStyle.SOCIAL,
      icon: Camera,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {styleOptions.map((s) => {
        const Icon = s.icon;
        const isSelected = selectedStyle === s.id;
        const styleInfo = t[s.id];

        return (
          <button
            type="button"
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`relative p-4 rounded-xl border text-left transition-all duration-200 ${
              isSelected 
                ? 'bg-culinary-card border-culinary-accent shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
                : 'bg-culinary-card border-transparent hover:border-gray-700 hover:bg-gray-800'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${isSelected ? 'bg-culinary-accent text-black' : 'bg-gray-700 text-gray-300'}`}>
                <Icon size={20} />
              </div>
              <span className={`font-semibold ${isSelected ? 'text-culinary-accent' : 'text-gray-200'}`}>
                {styleInfo.label}
              </span>
            </div>
            <p className="text-xs text-gray-400">{styleInfo.desc}</p>
            
            {isSelected && (
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-culinary-accent shadow-[0_0_8px_#D4AF37]" />
            )}
          </button>
        );
      })}
    </div>
  );
};