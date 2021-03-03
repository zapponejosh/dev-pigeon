import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Input,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { addChannel } from '../lib/UseStore';

const NewChannelButton = (props) => {
  const router = useRouter();

  const { onOpen, onClose, isOpen } = useDisclosure();

  // clearing state when popover is closed
  useEffect(() => {
    if (!isOpen) {
      setMsg('May include numbers, letters, and spaces. Up to 15 characters.');
      setSpinner(false);
      setChannelName('');
    }
  }, [isOpen]);

  const [msg, setMsg] = useState(
    'May include numbers, letters, and spaces. Up to 15 characters.'
  );
  const [channelName, setChannelName] = useState<string>('');
  const [spinner, setSpinner] = useState(false);

  const validateChannel = async (name: string) => {
    const regex = /^[a-z0-9-]*$/g;

    const channel = name.trim().replace(' ', '-').toLowerCase();
    if (channel.length < 4) {
      setMsg('Too short. Must be at least 4 characters.');
      return;
    }
    if (channel.length > 15) {
      setMsg('Too Long. 15 character limit');
      return;
    }

    if (regex.test(channel)) {
      setMsg('Creating channel: ' + channel);
      setSpinner(true);

      const result = await addChannel(channel);
      router.push(`/channels/${result[0].id}`);
    } else {
      setMsg('Invalid characters. May only include numbers, letters, and spaces');
    }
  };
  return (
    <Popover onClose={onClose}>
      <PopoverTrigger>
        <Button onClick={onOpen}>{props.children}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form
          action="submit"
          onSubmit={(e) => {
            e.preventDefault();
            validateChannel(channelName);
          }}
        >
          <Input
            type="text"
            name="channel"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
          <Button type="submit">{props.children}</Button>
        </form>
        <PopoverArrow />

        <PopoverCloseButton />

        <PopoverBody>
          {spinner && <Spinner />}
          {msg}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default NewChannelButton;
