import { useState, useEffect } from 'react';
import type { FriendRequest } from '@features/user/model/FriendRequest';
import requestsData from '../ui/requests.json';
import { getErrorMessage } from '@shared/lib/error-messages';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@app/store/store';
import { setRequests } from '../state';

const storedRequests = requestsData as Array<FriendRequest>;

export const useFriendRequests = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requests = useSelector((state: RootState) => state.friends.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2 * 1000));
      dispatch(setRequests(storedRequests.filter(r => r.status === 'pending')));
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return { requests, loading, error, fetchRequests };
};
