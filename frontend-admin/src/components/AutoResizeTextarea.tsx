import React, { useEffect, useRef } from 'react';

interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  minRows?: number;
  maxRows?: number;
}

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({ 
  value, 
  minRows = 3, 
  maxRows = 20,
  className = '',
  ...props 
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get correct scrollHeight
    textarea.style.height = 'auto';
    
    // Calculate line height
    const computedStyle = window.getComputedStyle(textarea);
    const lineHeight = parseInt(computedStyle.lineHeight);
    const paddingTop = parseInt(computedStyle.paddingTop);
    const paddingBottom = parseInt(computedStyle.paddingBottom);
    
    // Calculate min and max heights
    const minHeight = lineHeight * minRows + paddingTop + paddingBottom;
    const maxHeight = lineHeight * maxRows + paddingTop + paddingBottom;
    
    // Set new height based on content, respecting min/max
    let newHeight = textarea.scrollHeight;
    newHeight = Math.max(newHeight, minHeight);
    newHeight = Math.min(newHeight, maxHeight);
    
    textarea.style.height = `${newHeight}px`;
    
    // Enable scrolling if content exceeds maxHeight
    if (textarea.scrollHeight > maxHeight) {
      textarea.style.overflowY = 'auto';
    } else {
      textarea.style.overflowY = 'hidden';
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  // Also adjust on mount
  useEffect(() => {
    adjustHeight();
  }, []);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      className={className}
      style={{ 
        resize: 'none',
        overflow: 'hidden',
        transition: 'height 0.1s ease'
      }}
      {...props}
    />
  );
};

export default AutoResizeTextarea;
