import { useRouter } from 'next/router';
import { useContext } from 'react';
import AuthContext from '../lib/AuthContext';

import { FaGithubSquare } from 'react-icons/fa';

import { Box, Flex, Button, Heading, Icon } from '@chakra-ui/react';
import NewChannelButton from './NewChannelButton';

const Nav = (props) => {
  const router = useRouter();
  const { userLoaded, signIn, signOut } = useContext(AuthContext);
  return userLoaded ? (
    <Flex
      as="nav"
      justifyContent="space-between"
      alignItems="center"
      h="80px"
      p="0 20px"
      backgroundColor="#2b2a83"
    >
      <Box as="a" href="/channels">
        <Heading as="h1" color="white">
          dev-pigeon
        </Heading>
      </Box>

      <Box>
        <Button m="0 10px" onClick={() => signOut()}>
          sign-out
        </Button>

        <NewChannelButton>add-channel</NewChannelButton>
      </Box>
    </Flex>
  ) : (
    <Flex
      as="nav"
      justifyContent="space-between"
      alignItems="center"
      h="80px"
      p="0 20px"
      backgroundColor="darkblue"
    >
      <Box as="a" href="/">
        <Heading as="h1" color="white">
          dev-pigeon
        </Heading>
      </Box>
      <Box
        as="a"
        rel="noopener noreferrer"
        target="blank"
        href="https://github.com/zapponejosh/dev-pigeon"
      >
        <Icon
          w="40px"
          h="40px"
          color="brand.100"
          _hover={{ transform: 'rotate(15deg) scale(1.1)' }}
          as={FaGithubSquare}
        />
      </Box>
    </Flex>
  );
};

export default Nav;
