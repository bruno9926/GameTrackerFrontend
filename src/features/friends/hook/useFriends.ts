import { useEffect } from 'react';
import type { Friend } from '@features/user/model/Friend';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@app/store/store';
import { fetchFriends } from '../state';

export const useFriends = () => {
  const dispatch = useDispatch<AppDispatch>();
  const friends = useSelector((state: RootState) => state.friends.friends);
  const loading = useSelector((state: RootState) => state.friends.friendsLoading);
  const error = useSelector((state: RootState) => state.friends.friendsError);

  useEffect(() => {
    dispatch(fetchFriends());
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

  return { friends, onlineFriends, offlineFriends, busyFriends, loading, error };
};