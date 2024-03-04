import { queryOptions } from '@tanstack/react-query';
import { baseInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import { UserResponse } from 'common/types/raws';
import parseUser from 'common/utils/parseUser';
import { User } from 'common/types';

export const getUserInfo = async (userId: string) => {
  const { data } = await baseInstance.get<UserResponse | User>(`/users/${userId}`);

  if ('isOnline' in data) {
    return parseUser(data);
  }

  return data;
};

export const userInfoQueryOption = (userId: string) =>
  queryOptions({
    queryKey: queryKey.users.detail(userId),
    queryFn: () => getUserInfo(userId)
  });
