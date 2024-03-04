import { queryOptions } from '@tanstack/react-query';
import { authInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import parseUser from 'common/utils/parseUser';
import storage from '@/utils/storage';
import { AUTH_TOKEN } from '@/constants/storageKey';
import type { UserResponse } from 'common/types/raws';
import { User } from 'common/types';

export const getAuthUser = async () => {
  const { data } = await authInstance.get<UserResponse | User | ''>('/auth-user');

  if (data === '') {
    storage('local').removeItem(AUTH_TOKEN);
    throw new Error('Not authenticated yet');
  }

  if ('username' in data) {
    return data;
  }

  return parseUser(data);
};

export const authCheckOption = queryOptions({
  queryKey: queryKey.auth,
  queryFn: getAuthUser,
  staleTime: Infinity
});
