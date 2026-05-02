import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@app/store/store';
import { fetchRequests } from '../state';

export const useFriendRequests = () => {
  const dispatch = useDispatch<AppDispatch>();
  const requests = useSelector((state: RootState) => state.friends.requests);
  const loading = useSelector((state: RootState) => state.friends.requestsLoading);
  const error = useSelector((state: RootState) => state.friends.requestsError);

  useEffect(() => {
    dispatch(fetchRequests());
  }, []);

  return { requests, loading, error };
};
