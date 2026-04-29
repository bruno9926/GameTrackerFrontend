import { useState, useEffect } from 'react';
import type { Friend } from '@features/user/model/Friend';
import friendsData from '../ui/friends.json';
import { getErrorMessage } from '@shared/lib/error-messages';

const storedFriends = friendsData as Array<Friend>;

export const useFriends = () => {
  const [data, setData] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFriends = async () => {
    try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2 * 1000));
        setData(storedFriends);
    } catch (e) {
        setError(getErrorMessage(e));
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    fetchFriends();
  }, []);

  return { friends: data, loading, error };
};