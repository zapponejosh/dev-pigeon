// import Layout from '../../components/Layout'
import Message from '../../components/Message';
import { useRouter } from 'next/router';
import { useStore, addMessage } from '../../lib/UseStore';
import { useContext, useEffect, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';

// import { Message as Msg } from '../../types/types';

import AuthContext from '../../lib/AuthContext';
import MessageInput from '../../components/MessageInput';

const ChannelsPage = (props) => {
  const router = useRouter();
  const {
    user,
    userLoaded,
    signOut,
  }: { user: User; userLoaded: any; signOut: any } = useContext(AuthContext);
  const messagesEndRef = useRef(null);

  // Else load up the page
  let channelId: string;
  let { id } = router.query;

  if (id) {
    Array.isArray(id) ? (channelId = id[0]) : (channelId = id);
  }

  const { messages } = useStore({ channelId });

  console.log(messages);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <>
      <div>
        {messages.map((x) => (
          <Message key={x.id} self={x.author.username === user.email} message={x} />
        ))}
        <div ref={messagesEndRef} style={{ height: 0 }} />
      </div>
      <MessageInput
        onSubmit={async (text: string) => addMessage(text, channelId, user.id)}
      />
    </>
  );
};

export default ChannelsPage;
