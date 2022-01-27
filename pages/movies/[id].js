import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import useSWR from 'swr';
import { buildImageUrl } from '../../utils/api';
import {
  Badge,
  Box,
  Center,
  CircularProgress,
  Container,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
  Image as ChakraImage,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import Layout from '../../components/Layout';
import HistoryButton from '../../components/HistoryButton';
import Link from 'next/link';
import WatchlistButton from '../../components/WatchlistButton';

const MovieContent = () => {
  const router = useRouter();
  const { id } = useRouter().query;
  const { data, error } = useSWR(id && `/api/movies/${id}`);

  console.log({ data });

  if (error) {
    return (
      <Text color="red">
        Error fetching movie with ID {id}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  return (
    <Stack direction={['column', 'row']} spacing={4}>
      <Head>
        <title>
          {data.title} {`${data.vote_average}`}
        </title>
      </Head>
      <Box minW="300px" pos="relative">
        <HStack pos="absolute" zIndex={1} top={2} right={2}>
          <HistoryButton />
        </HStack>
        <HStack pos="absolute" zIndex={1} top={2} left={2}>
          <WatchlistButton />
        </HStack>
        <Image
          src={buildImageUrl(data.poster_path, 'w300')}
          alt="Movie poster"
          layout="responsive"
          width="300"
          height="450"
          objectFit="contain"
          unoptimized
        />
        <Flex align="center" mt="20px">
          <Box>
            <Link
              href={
                data?.imdb_id
                  ? `https://www.imdb.com/title/${data?.imdb_id}`
                  : `/movies/${id}`
              }
              passHref
            >
              <ChakraImage
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/60px-IMDB_Logo_2016.svg.png"
                alt="imdb btn"
              />
            </Link>
          </Box>
          <Spacer />
          <Box>
            <Link
              href={data?.homepage ? `${data?.homepage}` : `/movies/${id}`}
              passHref
            >
              <ChakraImage
                src="https://i.postimg.cc/c4sfzr0k/image.png"
                alt="website btn"
              />
            </Link>
          </Box>
        </Flex>
      </Box>
      <Stack>
        <HStack justify="space-between">
          <Heading as="h2">{data.title}</Heading>
          <Box>
            <Tag colorScheme="purple" variant="solid">
              {data.release_date}
            </Tag>
          </Box>
        </HStack>
        <Box>{data.tagline}</Box>

        <Stack direction="row">
          {data.genres?.map((genre) => (
            <Badge key={genre.id} colorScheme="purple" variant="outline">
              {genre.name}
            </Badge>
          ))}
        </Stack>
        <Box>{data.overview}</Box>
        <Box>
          <Stack direction="row" justify="space-between" mt="30px">
            <Box>Score: {data.vote_average}</Box>
            <Box>Votes: {data.vote_count}</Box>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default function Movie() {
  return (
    <Layout>
      <Container h="full">
        <MovieContent />
      </Container>
    </Layout>
  );
}
