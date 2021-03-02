import { useState, useEffect } from 'react';
import { supabase } from './client';
import { definitions } from '../types/supabase';
import { Message } from '../types/types';

type appProps = { channelId: string };

export const useStore = (
  props: appProps
): { messages: Message[]; channels: definitions['channels'][]; users } => {
  const [channels, setChannels] = useState<definitions['channels'][]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users] = useState<Record<string, definitions['users']> | Record<any, any>>(
    new Map()
  );
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
    if (Number(props.channelId) > 0) {
      fetchMessages(props.channelId, (messages: Message[]) => {
        // console.log(messages);
        messages.forEach((m) => {
          users.set(m.user_id, m.author);
        });
        setMessages(messages);
      });
    }
  }, [props.channelId]);
  // New message recieved from Postgres (triggered by addMessage)
  useEffect(() => {
    if (newMessage && newMessage.channel_id === Number(props.channelId)) {
      const handleAsync = async (): Promise<void> => {
        let authorId = newMessage.user_id;
        if (!users.get(authorId)) {
          await fetchUser(authorId, (user: definitions['users']) =>
            handleNewOrUpdatedUser(user)
          );
        }
        // const newMessages = messages;
        // newMessages.push(newMessage);
        setMessages(messages.concat(newMessage));
      };
      handleAsync();
    }
  }, [newMessage]);
  // New channel recieved from Postgres
  useEffect(() => {
    if (newChannel) setChannels(channels.concat(newChannel));
  }, [newChannel]);
  // New or updated user recieved from Postgres
  useEffect(() => {
    if (newOrUpdatedUser) users.set(newOrUpdatedUser.id, newOrUpdatedUser);
  }, [newOrUpdatedUser]);

  return {
    // We can export computed values here to map the authors to each message
    messages: messages.map((m) => ({
      ...m,
      author: users.get(m.user_id),
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

export const fetchMessages = async (
  channelId: string,
  setState
): Promise<Message[]> => {
  try {
    const channel_id = Number(channelId);
    let { body }: { body: Message[] } = await supabase
      .from('messages')
      .select('*, author:user_id(*)')
      .eq('channel_id', channel_id)
      .order('inserted_at', { ascending: true });

    if (setState) setState(body);
    console.log(body);
    return body;
  } catch (error) {
    console.log('error', error);
  }
};
export const addChannel = async (slug: string) => {
  //TODO make max length 11ch
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
  channel: string,
  user_id: string
) => {
  try {
    const channel_id = Number(channel);
    let { body } = await supabase
      .from<definitions['messages']>('messages')
      .insert([{ message, channel_id, user_id }]);
    return body;
  } catch (error) {
    console.log('error', error);
  }
};
