import React from 'react';
import { ASSETS } from '../data/imariData';

interface ImariLogoProps {
  variant?: 'default' | 'auth-dark-bg';
  size?: 'md' | 'lg';
  className?: string;
}

export const ImariLogo: React.FC<ImariLogoProps> = ({
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  if (variant === 'auth-dark-bg') {
    const isLarge = size === 'lg';
    return (
      <div
        className={`inline-flex items-center select-none ${
          isLarge ? 'gap-3.5' : 'gap-2.5'
        } ${className}`}
      >
        <svg
          width={isLarge ? 60 : 36}
          height={isLarge ? 60 : 36}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="shrink-0"
        >
          <defs>
            <linearGradient
              id="imariLeafAuth"
              x1="8"
              y1="54"
              x2="56"
              y2="8"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#16A34A" />
              <stop offset="55%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#84CC16" />
            </linearGradient>
          </defs>
          <path
            d="M54 8C34 8 16 18 11 37C9.5 42.5 9.8 48.5 7 56C12 49 16 42 22 36C18.5 41.5 16.5 47 16 51.5C27 52.5 41 47 48.5 34C54 24.5 55 15 54 8Z"
            fill="url(#imariLeafAuth)"
          />
          <path
            d="M27 33C27 29.5 30.5 26 36 25C35.5 29.5 32.5 32.5 27 33Z"
            fill="#064E27"
          />
          <rect x="26.5" y="36" width="6.5" height="14" rx="1.5" fill="#064E27" />
          <path
            d="M22 53C33 56 49 48 53 31"
            stroke="#4ADE80"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </svg>
        <span
          className={`font-extrabold tracking-[0.04em] text-[#34D36B] leading-none flex items-center ${
            isLarge ? 'text-[42px] sm:text-[46px]' : 'text-[26px]'
          }`}
        >
          IM
          <svg
            width={isLarge ? 34 : 22}
            height={isLarge ? 32 : 20}
            viewBox="0 0 24 22"
            fill="none"
            className="mx-[1px]"
            aria-hidden="true"
          >
            <path d="M12 1L23 21H17.6L12 10.2L6.4 21H1L12 1Z" fill="currentColor" />
          </svg>
          RI
        </span>
      </div>
    );
  }

  return (
    <img
      src={ASSETS.logo}
      alt="IMARI"
      className={`h-8 w-auto object-contain select-none mix-blend-multiply ${className}`}
    />
  );
};
