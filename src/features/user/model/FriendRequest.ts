import type { User } from './User';

export type FriendRequestStatus = 'pending' | 'accepted' | 'rejected';

export type FriendRequest = {
    id: string;
    sender: User;
    status: FriendRequestStatus;
}
