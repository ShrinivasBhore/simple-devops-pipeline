import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode;
  className?: string;
}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-800 bg-[#111418] text-slate-300 shadow-sm",
        className
      )}
      {...props}
    />
  );
}
