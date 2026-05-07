import { useState, useEffect, useMemo } from 'react';
import type { Friend } from '@features/user/model/Friend';
import { friendsService } from '../api/FriendsService';
import { getErrorMessage } from '@shared/lib/error-messages';
import { useSelector } from 'react-redux';
import type { RootState } from '@app/store/store';
import type { Game } from '@features/games/model/Game';

export const useFriend = (friendId: string | undefined) => {
    const [friend, setFriend] = useState<Friend | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const myGames = useSelector((state: RootState) => state.games.list);

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

    const gamesInCommon = useMemo<Game[]>(() => {
        if (!friend?.games) return [];
        const friendTitleIds = new Set(friend.games.map(g => g.gameTitleId).filter(id => id !== null));
        return myGames.filter(g => g.gameTitleId && friendTitleIds.has(g.gameTitleId));
    }, [friend?.games, myGames]);

    useEffect(() => {
        fetchFriend();
    }, [friendId]);

    return { friend, loading, error, fetchFriend, gamesInCommon };
};
