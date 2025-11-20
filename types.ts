
export enum PhotoStyle {
  RUSTIC = 'Rustic/Dark',
  MODERN = 'Bright/Modern',
  SOCIAL = 'Social Media (Top-Down)'
}

export interface GeneratedImage {
  id: string;
  dishName: string;
  description: string;
  style: PhotoStyle;
  imageUrl: string; // Base64 data URL
  timestamp: number;
}

export type LoadingState = 'idle' | 'generating' | 'editing' | 'error';

export interface MenuRequest {
  dishName: string;
  description: string;
}

export type Language = 
  | 'de' | 'en' | 'en-GB' | 'en-US' | 'fil' | 'id' | 'sw' | 'ms' | 'nl' | 'vi' 
  | 'tr' | 'ca' | 'da' | 'et' | 'es' | 'es-419' | 'fr' | 'hr' | 'it' | 'lv' 
  | 'lt' | 'hu' | 'no' | 'pl' | 'pt-BR' | 'pt-PT' | 'ro' | 'sk' | 'sl' | 'fi' 
  | 'sv' | 'cs' | 'el' | 'bg' | 'ru' | 'sr' | 'uk' | 'he' | 'ar' | 'fa' 
  | 'mr' | 'hi' | 'bn' | 'gu' | 'ta' | 'te' | 'kn' | 'ml' | 'th' | 'am' 
  | 'zh-CN' | 'zh-TW' | 'ja' | 'ko';

export interface Preset {
  id: string;
  label: string;
  dishName: string;
  description: string;
  style: PhotoStyle;
}
