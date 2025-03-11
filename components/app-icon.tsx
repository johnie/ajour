import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

const appIconVariants = cva(
  'flex items-center justify-center rounded-3xl bg-black dark:bg-white bg-linear-to-tl dark:from-zinc-50 dark:to-zinc-100 dark:text-zinc-900 p-5 shadow-lg text-zinc-50 from-zinc-800 to-zinc-900',
  {
    variants: {
      size: {
        default: 'size-48',
        small: 'size-20 p-3 rounded-2xl',
      },
      variant: {
        default:
          'bg-white bg-linear-to-tl text-zinc-50 from-zinc-800 to-zinc-900',
        dark: 'bg-black text-zinc-900 dark:text-zinc-50 from-zinc-50 to-zinc-100',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
);

export interface AppIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof appIconVariants> {}

const AppIcon = React.forwardRef<HTMLDivElement, AppIconProps>(
  ({ className, size = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(appIconVariants({ size }), className)}
        {...props}
      >
        <Icons.omniO className="w-full" />
      </div>
    );
  }
);

AppIcon.displayName = 'AppIcon';

export { AppIcon, appIconVariants };
