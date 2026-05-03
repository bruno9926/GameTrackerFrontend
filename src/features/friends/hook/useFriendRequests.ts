import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@app/store/store';
import { fetchRequests, acceptRequest, rejectRequest } from '../state';

export const useFriendRequests = () => {
  const dispatch = useDispatch<AppDispatch>();
  const requests = useSelector((state: RootState) => state.friends.requests);
  const loading = useSelector((state: RootState) => state.friends.requestsLoading);
  const error = useSelector((state: RootState) => state.friends.requestsError);

  const fetch = () => dispatch(fetchRequests());
  const accept = (id: string) => dispatch(acceptRequest(id));
  const reject = (id: string) => dispatch(rejectRequest(id));

  return { requests, loading, error, fetch, accept, reject };
};
