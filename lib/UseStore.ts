import { useState, useEffect } from 'react';
import { supabase } from './client';
import { definitions } from '../types/supabase';
import { RealtimeSubscription } from '@supabase/supabase-js';

//make sure the query get turned to a number
type appProps = { channelId: number };

// i would like this to extend my defnititions from the db
// interface Message extends definitions
type Message = {
  id: number;
  inserted_at: string;
  message: string;
  user_id: string;
  channel_id: number;
  author: string;
};

export const useStore = (props: appProps) => {
  const [channels, setChannels] = useState<definitions['channels'][]>([]);
  const [messages, setMessages] = useState<definitions['messages'][]>([]);
  const [users] = useState(new Map());
  const [newMessage, handleNewMessage] = useState<definitions['messages'] | null>(
    null
  );
  const [newChannel, handleNewChannel] = useState<definitions['channels'] | null>(
    null
  );
  const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState<
    definitions['users'] | null
  >(null);

  // Load initial data and set up listeners
  useEffect(() => {
    // Get Channels
    fetchChannels(setChannels);
    // Listen for new messages
    const messageListener = supabase
      .from<definitions['messages']>('messages')
      .on('INSERT', (payload) => handleNewMessage(payload.new))
      .subscribe();
    // Listen for changes to our users
    const userListener = supabase
      .from<definitions['users']>('users')
      .on('*', (payload) => handleNewOrUpdatedUser(payload.new))
      .subscribe();
    // Listen for new channels
    const channelListener = supabase
      .from<definitions['channels']>('channels')
      .on('INSERT', (payload) => handleNewChannel(payload.new))
      .subscribe();
    // Cleanup on unmount
    return () => {
      messageListener.unsubscribe();
      userListener.unsubscribe();
      channelListener.unsubscribe();
    };
  }, []);

  // Update when the route changes
  useEffect(() => {
    if (props.channelId > 0) {
      fetchMessages(props.channelId, (messages) => {
        messages.forEach((m) => {
          users.set(m.user_id, m.author);
        });
        setMessages(messages);
      });
    }
  }, [props.channelId]);
  // New message recieved from Postgres
  useEffect(() => {
    if (newMessage && newMessage.channel_id === Number(props.channelId)) {
      const handleAsync = async (): Promise<void> => {
        let authorId = newMessage.user_id;
        if (!users.get(authorId)) {
          await fetchUser(authorId, (user: definitions['users']) =>
            handleNewOrUpdatedUser(user)
          );
        }
        const newMessages = messages;
        newMessages.push(newMessage);
        setMessages(messages.concat(newMessage));
      };
      handleAsync();
    }
  }, [newMessage]);
  // New channel recieved from Postgres
  useEffect(() => {}, [newChannel]);
  // New or updated user recieved from Postgres
  useEffect(() => {}, [newOrUpdatedUser]);

  return {
    // We can export computed values here to map the authors to each message
    messages: messages.map((x) => ({
      ...x,
      author: users.get(x.user_id),
    })),
    channels: channels.sort(
      (a: definitions['channels'], b: definitions['channels']) =>
        a.slug.localeCompare(b.slug)
    ),
    users,
  };
};

export const fetchChannels = async (setState) => {
  try {
    let { body } = await supabase
      .from<definitions['channels']>('channels')
      .select('*');
    if (setState) setState(body);
    return body;
  } catch (error) {
    console.log('error', error);
  }
};
export const fetchUser = async (userId: string, setState) => {
  try {
    let { body } = await supabase
      .from<definitions['users']>('users')
      .select('*')
      .eq('id', userId);
    let user = body[0];

    if (setState) setState(user);

    return user;
  } catch (error) {
    console.log('error', error);
  }
};
export const fetchMessages = async (channelId: number, setState) => {
  try {
    let { body } = await supabase
      .from<definitions['messages']>('messages')
      .select('*, author:user_id(*)')
      .eq('id', channelId)
      .order('inserted_at', { ascending: true });

    if (setState) setState(body);

    return body;
  } catch (error) {
    console.log('error', error);
  }
};
export const addChannel = async (slug: string) => {
  try {
    let { body } = await supabase
      .from<definitions['channels']>('channels')
      .insert([{ slug }]);
    return body;
  } catch (error) {
    console.log('error', error);
  }
};
export const addMessage = async (
  message: string,
  channel_id: number,
  user_id: string
) => {
  try {
    let { body } = await supabase
      .from<definitions['messages']>('messages')
      .insert([{ message, channel_id, user_id }]);
    return body;
  } catch (error) {
    console.log('error', error);
  }
};
