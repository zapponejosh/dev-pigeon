import { Box, Container } from '@chakra-ui/react';
import styles from './Layout.module.css';
// messages and input can be rendered in children
const Layout = (props) => {
  return (
    <Box>
      <Container
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        h="80vh"
        overflowY="scroll"
        className={styles.messages}
        p="20px"
        m="30px auto"
        maxW="1000px"
      >
        {props.children}
      </Container>
    </Box>
  );
};

export default Layout;
