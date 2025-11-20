import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
  loadingText?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  loadingText,
  className = '',
  disabled,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-culinary-dark disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-culinary-accent text-black hover:bg-culinary-accent-hover focus:ring-culinary-accent",
    secondary: "bg-culinary-card text-white border border-gray-700 hover:bg-gray-800 focus:ring-gray-500",
    ghost: "text-gray-400 hover:text-white hover:bg-white/10"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          {loadingText || 'Processing...'}
        </>
      ) : children}
    </button>
  );
};
