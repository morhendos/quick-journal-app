'use client'

import React from 'react';

const AuthLogo = () => (
  <div className="flex flex-col items-center mb-8 select-none">
    <div className="w-24 h-24 mb-4">
      <svg viewBox="0 0 320 320" className="w-full h-full">
        <defs>
          <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A373" />
            <stop offset="100%" stopColor="#CCD5AE" />
          </linearGradient>
        </defs>
        
        {/* Frame */}
        <path 
          d="M160 20
             C 240 20, 300 80, 300 160
             C 300 240, 240 300, 160 300
             C 80 300, 20 240, 20 160
             C 20 80, 80 20, 160 20"
          fill="none"
          stroke="url(#frameGradient)"
          strokeWidth="2"
        />
        
        {/* Ink Well */}
        <path 
          d="M140 220
             C 120 220, 110 180, 120 160
             C 130 140, 150 140, 160 140
             C 170 140, 190 140, 200 160
             C 210 180, 200 220, 180 220
             Z"
          fill="#2C1810"
        />
        
        {/* Feather */}
        <path 
          d="M160 80
             C 180 90, 190 100, 180 120
             C 170 140, 160 160, 150 180
             L 140 200
             C 160 180, 180 160, 190 140
             C 200 120, 190 100, 170 90
             Z"
          fill="#2C1810"
        />
        
        {/* Stars */}
        <circle cx="220" cy="100" r="4" fill="#D4A373" />
        <circle cx="240" cy="120" r="3" fill="#CCD5AE" />
      </svg>
    </div>
    <h1 className="text-2xl font-semibold mb-1">Quick Journal</h1>
    <p className="text-sm text-muted-foreground tracking-widest uppercase">
      Capture Today, Reflect Tomorrow
    </p>
  </div>
);

export default AuthLogo;