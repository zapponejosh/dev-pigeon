import { fetchChannels } from '../../lib/UseStore';
import { useRouter } from 'next/router';
import { definitions } from '../../types/supabase';
import { useEffect, useState } from 'react';
import { Box, SimpleGrid, Skeleton } from '@chakra-ui/react';
import styles from './channelPage.module.css';

const channelDirectory = (props) => {
  const router = useRouter();

  const [channels, setChannels] = useState<definitions['channels'][]>([]);
  useEffect(() => {
    fetchChannels(setChannels);
  }, []);

  return (
    <Box
      h="100vh"
      bgGradient="linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(64,64,180,1) 35%, rgba(0,212,255,1) 100%)"
    >
      <SimpleGrid
        p="30px"
        m="0 auto"
        maxW="1000px"
        minChildWidth="280px"
        spacing="30px"
      >
        {channels.length ? (
          channels.map((ch) => (
            <Box
              className={styles.channelBox}
              as="a"
              fontSize="2rem"
              textAlign="center"
              color="white"
              h="70px"
              pt="7px"
              borderRadius="8px"
              key={ch.id}
              href={`channels/${ch.id}`}
              // _hover={{
              //   transform: 'scale(1.1)',
              // }}
            >
              {`#${ch.slug}`}
            </Box>
          ))
        ) : (
          <SimpleGrid>
            <Skeleton minWidth="280px" h="70px">
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
            <Skeleton minWidth="280px" h="70px">
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
            <Skeleton minWidth="280px" h="70px">
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
            <Skeleton minWidth="280px" h="70px">
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
            <Skeleton minWidth="280px" h="70px">
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
            <Skeleton minWidth="280px" h="70px">
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
          </SimpleGrid>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default channelDirectory;
