import type { User } from './User';

export type FriendRequestStatus = 'pending' | 'accepted' | 'rejected';

export type FriendRequest = {
    id: number;
    sender: User;
    status: FriendRequestStatus;
}
