import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, name, ...props }, ref) => {
    return (
        <div className="w-full">
            <label htmlFor={name} className="block text-sm font-medium text-foreground mb-1">
            {label}
            </label>
            <textarea
                name={name}
                id={name}
                className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ''}`}
                ref={ref}
                {...props}
            />
        </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
