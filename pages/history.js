import Link from 'next/link';
import useSWR from 'swr';

import { UnorderedList, ListItem, Text, Button, Badge } from '@chakra-ui/react';

export default function HistoryComponent() {
  const { data, error } = useSWR(`/api/history`);

  console.log(data?.data);

  if (!data?.data?.length) {
    return <Text>You didn`t watched anything yet</Text>;
  }
  if (error) {
    return (
      <Text color="red">
        Ooops, something went wrong: {JSON.stringify(error)}
      </Text>
    );
  }

  return (
    <UnorderedList stylePosition="inside">
      {data.data.map(({ id, title }) => (
        <ListItem key={id}>
          <Link href={`/movies/${id}`} passHref>
            <Button as="a" variant="link" rightIcon={<Badge></Badge>}>
              <Text as="span">{title} </Text>
            </Button>
          </Link>
        </ListItem>
      ))}
    </UnorderedList>
  );
}
