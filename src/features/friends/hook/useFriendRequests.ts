import { useState, useEffect } from 'react';
import type { FriendRequest } from '@features/user/model/FriendRequest';
import requestsData from '../ui/requests.json';
import { getErrorMessage } from '@shared/lib/error-messages';

const storedRequests = requestsData as Array<FriendRequest>;

export const useFriendRequests = () => {
  const [data, setData] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2 * 1000));
      setData(storedRequests);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return { requests: data, loading, error };
};
