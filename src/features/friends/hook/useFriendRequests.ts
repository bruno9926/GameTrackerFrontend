import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@app/store/store';
import { fetchRequests, acceptRequest, rejectRequest, fetchFriends, sendRequest } from '../state';
import toast from '@shared/ui/Atoms/Toast';

export const useFriendRequests = () => {
  const dispatch = useDispatch<AppDispatch>();
  const requests = useSelector((state: RootState) => state.friends.requests);
  const loading = useSelector((state: RootState) => state.friends.requestsLoading);
  const error = useSelector((state: RootState) => state.friends.requestsError);

  const fetch = () => dispatch(fetchRequests());

  const accept = async (id: string) => {
    await dispatch(acceptRequest(id));
    dispatch(fetchFriends());
  };

  const reject = (id: string) => dispatch(rejectRequest(id));
  
  const sendFriendRequest = async (friendId: string) => {
    const result = await dispatch(sendRequest(friendId));
    if (sendRequest.fulfilled.match(result)) {
      toast.success('Friend request sent!');
    }
    if (sendRequest.rejected.match(result)) {
      toast.error(result.error.message as string);
    }
  };

  return { requests, loading, error, fetch, accept, reject, sendFriendRequest };
};
