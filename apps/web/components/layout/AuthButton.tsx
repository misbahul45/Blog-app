import { getSession, signout } from '@/actions/auth.action';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { User } from '@/types/web.types';
interface Props {
    user: User | null
}
const AuthButton = ({ user }: Props) => {

    return (
        <>
            {user ? (
                <form action={signout}>
                    <Button variant={'destructive'} type="submit">
                        Signout
                    </Button>
                </form>
            ) : (
                <>
                    <Link href={'/signin'} className="px-4 py-2 text-sm font-semibold bg-gradient-to-r flex items-center gap-2 from-slate-800 via-slate-600 text-slate-300 hover:text-slate-50 rounded transition-all duration-100">
                        <span>SignIn</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    <Link href={'/signup'} className="px-4 py-2 text-sm font-semibold border border-slate-500 bg-transparent flex items-center gap-2 text-slate-300 hover:text-slate-50 hover:bg-slate-800 rounded transition-all duration-100">
                        <span>SignUp</span>
                    </Link>
                </>
            )}
        </>
    );
};

export default AuthButton;
