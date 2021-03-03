import { Box, Container, Skeleton } from '@chakra-ui/react';
import { useState } from 'react';
import styles from './Layout.module.css';
// messages and input can be rendered in children
const Layout = (props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  setTimeout(() => {
    setIsLoaded(true);
  }, 600);

  return (
    <Skeleton
      borderRadius="10px"
      h="80vh"
      maxW="1000px"
      m="0 auto"
      colorScheme="brand"
      speed="0.4"
      isLoaded={isLoaded}
    >
      <Box as="main" m="30px auto">
        <Container
          w="inherit"
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          h="80vh"
          className={styles.messages}
          p="20px"
          m="0 10px"
          maxW="1000px"
        >
          {props.children}
        </Container>
      </Box>
    </Skeleton>
  );
};

export default Layout;
