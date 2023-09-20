import { useQuery } from '@tanstack/react-query';
import { baseInstance } from '@/apis/instance';
import { PostResponse } from '@/apis/types';
import queryKey from '@/apis/queryKeys';
import parsePost from '../utils/parsePost';
import { Post } from '@/types';

export const getPostDetail = async (id: string) => {
  const { data } = await baseInstance.get<PostResponse>(`/posts/${id}`);

  if (!data) throw new Error('Unvalid post ID');

  return parsePost(data);
};

const usePostDetailQuery = (id: string) => {
  return useQuery<Post>({
    queryKey: queryKey.posts.detail(id),
    queryFn: () => getPostDetail(id),
    retry: 0
  });
};

export default usePostDetailQuery;
