import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@app/store/store';
import { fetchRequests, acceptRequest, rejectRequest, fetchFriends } from '../state';

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

  return { requests, loading, error, fetch, accept, reject };
};
