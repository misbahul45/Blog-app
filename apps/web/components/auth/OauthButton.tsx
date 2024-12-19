import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface Props {
  link: string;
  name: string;
}

const OauthButton: React.FC<Props> = ({ link, name }) => {


  return (
    <Link href={`${process.env.BACKEND_URL}/${link}`} className="w-full">
      <Button
        variant="ghost"
        type="submit"
        className="w-full text-sm mb-2 text-gray-400 border-slate-200"
        aria-label={`Login with ${name}`}
      >
        {name}
      </Button>
    </Link>
  );
};

export default OauthButton;
