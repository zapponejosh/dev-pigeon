import { Message as Msg } from '../types/types';
import { Box, Text } from '@chakra-ui/react';
const Message = ({ message, self }: { message: Msg; self: boolean }) => (
  <>
    <Box borderBlockEnd="1px solid rgba(254,254,254,0.3)">
      <Text color={self ? 'red.600' : 'brand.500'} fontWeight="bold">
        {self ? 'Me' : message.author.username}
      </Text>
      <Text color="brand.700">{message.message}</Text>
    </Box>
  </>
);

export default Message;
