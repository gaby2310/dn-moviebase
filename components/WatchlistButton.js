import { TimeIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import { fetcher } from '../utils/api';

export default function WatchlistButton() {
  const { id } = useRouter().query;
  const { data } = useSWR(`/api/watchlist/${id}`);
  const { mutate } = useSWRConfig();

  return (
    <Tooltip
      label={
        data?.found ? 'Remove from your WatchList' : 'Add to your WatchList'
      }
    >
      <IconButton
        isLoading={!data}
        colorScheme={data?.found ? 'purple' : 'gray'}
        size="md"
        onClick={() => {
          mutate(`/api/watchlist/${id}`, () =>
            fetcher(`/api/watchlist/${id}`, {
              method: data.found ? 'DELETE' : 'PUT',
            })
          );
        }}
      >
        <TimeIcon />
      </IconButton>
    </Tooltip>
  );
}
