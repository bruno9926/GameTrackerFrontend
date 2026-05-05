import { useState, useEffect } from 'react';
import type { Friend } from '@features/user/model/Friend';
import { friendsService } from '../api/FriendsService';
import { getErrorMessage } from '@shared/lib/error-messages';

export const useFriend = (friendId: string | undefined) => {
    const [friend, setFriend] = useState<Friend | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchFriend = async () => {
        if (!friendId) return;
        setLoading(true);
        setError(null);
        try {
            const data = await friendsService.fetchFriend(friendId);
            setFriend(data);
        } catch (e) {
            setError(getErrorMessage(e));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFriend();
    }, [friendId]);

    return { friend, loading, error, fetchFriend };
};
