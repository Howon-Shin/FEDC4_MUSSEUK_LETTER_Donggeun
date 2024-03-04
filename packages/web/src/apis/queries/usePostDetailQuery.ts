import { baseInstance } from '@/apis/instance';
import { PostResponse } from 'common/types/raws';
import { queryOptions } from '@tanstack/react-query';
import queryKey from '@/apis/queryKeys';
import parsePost from 'common/utils/parsePost';
import { Post } from 'common/types';

export const getPostDetail = async (id: string) => {
  const { data } = await baseInstance.get<PostResponse | Post>(`/posts/${id}`);

  if (!data) throw new Error('Unvalid post ID');

  if ('channel' in data) {
    return parsePost(data);
  }

  return data;
};

export const postDetailQueryOption = (id: string) =>
  queryOptions({
    queryKey: queryKey.posts.detail(id),
    queryFn: () => getPostDetail(id),
    retry: 0
  });
