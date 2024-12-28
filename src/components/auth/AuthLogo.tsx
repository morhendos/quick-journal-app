"use client";

import React from "react";
import Image from "next/image";

const AuthLogo = () => (
  <div className="flex flex-col items-center mb-8 select-none">
    <Image
      src="/assets/quick-journal-logo-white.png"
      alt="Quick Journal - Capture Today, Reflect Tomorrow"
      width={400}
      height={320}
      priority
      className="object-contain mb-2"
    />
  </div>
);

export default AuthLogo;
