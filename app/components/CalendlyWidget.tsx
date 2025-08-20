'use client';

import { useEffect } from 'react';
import { Calendar } from 'lucide-react';

interface CalendlyWidgetProps {
  url?: string;
  buttonText?: string;
  className?: string;
}

const CalendlyWidget = ({ 
  url = "https://calendly.com/gfmtraining", 
  buttonText = "Book with Calendly",
  className = "btn btn-primary"
}: CalendlyWidgetProps) => {
  
  useEffect(() => {
    // Load Calendly script if not already loaded
    if (typeof window !== 'undefined' && !window.Calendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const openCalendly = () => {
    if (typeof window !== 'undefined') {
      if (window.Calendly) {
        window.Calendly.initPopupWidget({ url });
      } else {
        // Fallback to opening in new tab
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <button 
      onClick={openCalendly}
      className={className}
      type="button"
    >
      <Calendar className="w-4 h-4 mr-2" />
      {buttonText}
    </button>
  );
};

// Inline Widget Component
export const CalendlyInlineWidget = ({ 
  url = "https://calendly.com/gfmtraining",
  height = "600px" 
}: { 
  url?: string; 
  height?: string; 
}) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Calendly) {
      window.Calendly.initInlineWidget({
        url,
        parentElement: document.getElementById('calendly-inline-widget'),
        prefill: {},
        utm: {}
      });
    }
  }, [url]);

  return (
    <div 
      id="calendly-inline-widget" 
      style={{ minWidth: '320px', height }}
      className="rounded-lg overflow-hidden shadow-lg"
    />
  );
};

// Type declaration for window.Calendly
declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: { url: string }) => void;
      initInlineWidget: (options: { 
        url: string; 
        parentElement: HTMLElement | null;
        prefill?: Record<string, any>;
        utm?: Record<string, any>;
      }) => void;
    };
  }
}

export default CalendlyWidget;