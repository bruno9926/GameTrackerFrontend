import { useState, useEffect } from 'react';
import type { Friend } from '@features/user/model/Friend';
import friendsData from '../ui/friends.json';
import { getErrorMessage } from '@shared/lib/error-messages';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@app/store/store';
import { setFriends } from '../state';

const storedFriends = friendsData as Array<Friend>;

export const useFriends = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const friends = useSelector((state: RootState) => state.friends.friends);
  const dispatch = useDispatch();

  const fetchFriends = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2 * 1000));
      dispatch(setFriends(storedFriends));
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const {
    online: onlineFriends,
    offline: offlineFriends,
    busy: busyFriends
  } = friends.reduce(
    (acc, friend) => {
      acc[friend.status].push(friend);
      return acc;
    },
    { online: [], offline: [], busy: [] } as Record<Friend['status'], Friend[]>
  );

  return { friends, onlineFriends, offlineFriends, busyFriends, loading, error, fetchFriends };
};