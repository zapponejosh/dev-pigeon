import { fetchChannels } from '../../lib/UseStore';
import { useRouter } from 'next/router';
import { definitions } from '../../types/supabase';
import { useEffect, useState } from 'react';
import { Box, SimpleGrid, Skeleton } from '@chakra-ui/react';

const channelDirectory = (props) => {
  const router = useRouter();

  const [channels, setChannels] = useState<definitions['channels'][]>([]);
  useEffect(() => {
    fetchChannels(setChannels);
  }, []);

  return (
    <SimpleGrid m="30px auto" maxW="900px" minChildWidth="280px" spacing="30px">
      {channels.length ? (
        channels.map((ch) => (
          <Box
            as="a"
            fontSize="2rem"
            textAlign="center"
            color="white"
            bgGradient="linear(to-r, #6cb86c, #c98181)"
            h="70px"
            pt="7px"
            borderRadius="8px"
            key={ch.id}
            href={`channels/${ch.id}`}
            _hover={{
              bgGradient: 'linear(to-r, #5ca15c, #c98181)',
              transform: 'scale(1.1)',
            }}
          >
            {`#${ch.slug}`}
          </Box>
        ))
      ) : (
        <>
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
        </>
      )}
    </SimpleGrid>
  );
};

export default channelDirectory;
