import { useRouter } from 'next/router';
import { useContext } from 'react';
import AuthContext from '../lib/AuthContext';

import { Box, Flex, Button, Heading } from '@chakra-ui/react';

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
      <Heading as="h1" color="white">
        dev-pigeon
      </Heading>

      <Box>
        <Button m="0 10px" onClick={() => signOut()}>
          sign-out
        </Button>

        <Button onClick={() => router.push('/channels')}>all-channels</Button>
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
      <Heading as="h1" color="white">
        dev-pigeon
      </Heading>
    </Flex>
  );
};

export default Nav;
