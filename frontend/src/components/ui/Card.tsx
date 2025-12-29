import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "glass-card rounded-xl p-6 text-card-foreground shadow-sm transition-all hover:shadow-md",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export { Card };
