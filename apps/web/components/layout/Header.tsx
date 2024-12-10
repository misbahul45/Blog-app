'use client';

import Link from 'next/link';
import Navbar from './Navbar';
import AuthButton from './AuthButton';
import React from 'react';
import useScrollVisibility from '@/hooks/useCostumVisibility';

const Header = () => {
  const { isVisible, preventHide } = useScrollVisibility(3000);
  const headerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const header = headerRef.current;

    const handleMouseEnter = () => {
      preventHide();
    };

    header?.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      header?.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [preventHide]);

  return (
    <header
      ref={headerRef}
      className={`
        w-full py-4 flex justify-center fixed top-0 left-0 z-50
        transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
    >
      <nav className="flex justify-center items-center gap-4 py-2.5 px-3 rounded-xl backdrop-blur-md bg-black/20">
        <Link
          href="/"
          className="px-4 py-2 bg-gradient-to-r text-sm from-cyan-600 via-blue-600 to-blue-500 text-white rounded-full"
        >
          MCLearn
        </Link>
        <Navbar />
        <AuthButton />
      </nav>
    </header>
  );
};

export default Header;
