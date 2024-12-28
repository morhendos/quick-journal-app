'use client'

import React from 'react';
import Image from 'next/image';

const AuthLogo = () => (
  <div className="flex flex-col items-center mb-8 select-none">
    <div className="relative w-[320px] h-[320px] mb-4">
      <Image
        src="/assets/logo.png"
        alt="Quick Journal Logo"
        fill
        priority
        className="object-contain"
      />
    </div>
  </div>
);

export default AuthLogo;