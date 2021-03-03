// import Layout from '../../components/Layout'
import Message from '../../components/Message';
import { useRouter } from 'next/router';
import { useStore, addMessage } from '../../lib/UseStore';
import { useContext, useEffect, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import Layout from '../../components/Layout';

import AuthContext from '../../lib/AuthContext';
import MessageInput from '../../components/MessageInput';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

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

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <Layout>
      <Button colorScheme="brand" onClick={() => router.push('/channels')}>
        see-all-channels
      </Button>
      <Box h="100%" overflow="auto">
        {!messages.length && (
          <Heading textAlign="center" pt="80px" as="h3" color="brand.600">
            Be the first to send a message in this channel!
          </Heading>
        )}
        {messages.map((x) => (
          <Message key={x.id} self={x.author.username === user.email} message={x} />
        ))}
        <div ref={messagesEndRef} style={{ height: 0 }} />
      </Box>
      <MessageInput
        onSubmit={async (text: string) => addMessage(text, channelId, user.id)}
      />
    </Layout>
  );
};

export default ChannelsPage;
