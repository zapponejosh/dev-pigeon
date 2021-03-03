import { useState, useContext } from 'react';
import AuthContext from '../lib/AuthContext';
import { supabase } from '../lib/client';
import { Box, Button, ButtonGroup, Flex, Input } from '@chakra-ui/react';

import styles from '../styles/Home.module.css';

const Home = () => {
  const { signIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (type: string, username: string, password: string) => {
    try {
      const { error, user } =
        type === 'LOGIN'
          ? await supabase.auth.signIn({ email: username, password })
          : await supabase.auth.signUp({ email: username, password });
      // If the user doesn't exist here and an error hasn't been raised yet,
      // that must mean that a confirmation email has been sent.
      // NOTE: Confirming your email address is required by default.
      if (error) {
        alert('Error with auth: ' + error.message);
      } else if (!user)
        alert('Signup successful, confirmation mail should be sent soon!');
    } catch (error) {
      console.log('error', error);
      alert(error.error_description || error);
    }
  };

  return (
    <Box m="0 20px">
      <Flex
        m="60px auto"
        maxW="700px"
        p="20px"
        className={styles.loginBox}
        flexWrap="wrap"
      >
        <Box m="0 8px">
          <label>email</label>
          <Input
            variant="flushed"
            colorScheme="brand"
            type="email"
            required
            placeholder="Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box m="0 8px">
          <label>password</label>
          <Input
            variant="flushed"
            type="password"
            required
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        <ButtonGroup colorScheme="brand" mt="10px" alignSelf="center">
          <Button
            variant="solid"
            onClick={(e) => {
              e.preventDefault();
              handleLogin('LOGIN', username, password);
            }}
            href={'/channels'}
          >
            login
          </Button>
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              handleLogin('SIGNUP', username, password);
            }}
            href={'/channels'}
          >
            sign-up
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default Home;
