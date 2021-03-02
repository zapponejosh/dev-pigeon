import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../lib/AuthContext';
import { supabase } from '../lib/client';
import { definitions } from '../types/supabase';
import { User, Session } from '@supabase/supabase-js';
import Nav from '../components/Nav';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [userLoaded, setUserLoaded] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    setUserLoaded(session ? true : false);

    if (user && router.pathname === '/') {
      signIn(user.id, user.email);
      router.push('/channels');
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        const currentUser = session?.user;
        setUser(currentUser ?? null);
        setUserLoaded(!!currentUser);

        if (currentUser) {
          signIn(currentUser.id, currentUser.email);
          router.push('/channels');
        }
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, [user]);

  const signIn = async (id: string, username: string) => {
    const { body } = await supabase
      .from<definitions['users']>('users')
      .select('id, username')
      .eq('id', id);
    const result = body[0];

    // if user exists  update username else create a new row
    result?.id
      ? await supabase.from('users').update({ id, username }).match({ id }).single()
      : await supabase.from('users').insert([{ id, username }]).single();
  };

  const signOut = async () => {
    const result = await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        userLoaded,
        user,
        signIn,
        signOut,
      }}
    >
      <ChakraProvider>
        <Nav />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthContext.Provider>
  );
}

export default MyApp;
