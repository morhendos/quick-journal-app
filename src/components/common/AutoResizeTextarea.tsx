'use client';

import { useEffect, useRef, useCallback } from 'react';

interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSave?: () => void;
  onCancel?: () => void;
  minHeight?: number;
  className?: string;
}

export function AutoResizeTextarea({
  value,
  onChange,
  onSave,
  onCancel,
  minHeight = 36,
  className = '',
  onKeyDown,
  ...props
}: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const scrollLeft = window.pageXOffset;
    const scrollTop = window.pageYOffset;

    textarea.style.height = `${minHeight}px`;
    const contentScrollHeight = textarea.scrollHeight;

    if (contentScrollHeight > minHeight) {
      textarea.style.height = `${contentScrollHeight}px`;
    }

    window.scrollTo(scrollLeft, scrollTop);
  }, [minHeight]);

  useEffect(() => {
    adjustHeight();
  }, [value, minHeight, adjustHeight]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.metaKey && onSave) {
      e.preventDefault();
      onSave();
    } else if (e.key === 'Escape' && onCancel) {
      e.preventDefault();
      onCancel();
    }
    onKeyDown?.(e);
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => {
        onChange(e);
        adjustHeight();
      }}
      onKeyDown={handleKeyDown}
      className={`px-2 py-1.5 rounded-md bg-paper leading-normal
        border border-accent/20
        focus:outline-none focus:border-accent/40
        placeholder:text-muted/40 text-ink/90
        transition-colors duration-200 resize-none overflow-hidden
        ${className}`}
      style={{ height: minHeight }}
      {...props}
    />
  );
}