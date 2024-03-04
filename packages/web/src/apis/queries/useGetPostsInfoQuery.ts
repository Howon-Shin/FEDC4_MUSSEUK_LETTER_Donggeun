import { queryOptions } from '@tanstack/react-query';
import { baseInstance } from '@/apis/instance';
import { PostResponse } from 'common/types/raws';
import queryKey from '@/apis/queryKeys';
import parsePost from 'common/utils/parsePost';
import { Post } from 'common/types';

const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID;

export const getPostsInfo = async () => {
  const { data } = await baseInstance.get<(PostResponse | Post)[]>(`/posts/channel/${CHANNEL_ID}`);

  if (data.length <= 0) return [];

  if ('createdAt' in data[0]) {
    return data.map((post) => parsePost(post as PostResponse));
  }

  return data as Post[];
};

export const getPostsInfoQueryOption = queryOptions({
  queryKey: queryKey.posts.all,
  queryFn: () => getPostsInfo()
});
