import { queryOptions } from '@tanstack/react-query';
import { baseInstance } from '@/apis/instance';
import queryKey from '@/apis/queryKeys';
import { PostResponse } from 'common/types/raws';
import parsePost from 'common/utils/parsePost';
import { Post } from 'common/types';

export const getUserPostList = async (userId: string) => {
  const { data } = await baseInstance.get<(PostResponse | Post)[]>(`/posts/author/${userId}`);

  if (data.length <= 0) return [];

  if ('createdAt' in data[0]) {
    return data.map((post) => parsePost(post as PostResponse));
  }

  return data as Post[];
};

export const userPostListQueryOption = (userId: string) =>
  queryOptions({
    queryKey: queryKey.posts.search(userId),
    queryFn: () => getUserPostList(userId)
  });
