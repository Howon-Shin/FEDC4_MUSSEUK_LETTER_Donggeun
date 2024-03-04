import { faker } from '@faker-js/faker';
import { DECORATION_IMAGE_NAME, MUSSEUK_IMAGE_NAME } from 'common/constants/imageNames';
import { Comment, Post, User } from 'common/types';
import { HttpResponse, delay, http } from 'msw';

const users: User[] = [
  {
    _id: '123',
    email: faker.internet.email(),
    username: '머쓱이',
    introduce: faker.lorem.sentence(),
    slackId: faker.string.sample(),
    slackWorkspace: 'Frontend',
    image: 'https://d2pu0ruyxf50in.cloudfront.net/머쓱레터_og.png',
    commentCount: faker.number.int({ min: 0, max: 100 }),
    postCount: faker.number.int({ min: 0, max: 100 })
  },
  {
    _id: '1234',
    email: faker.internet.email(),
    username: '머쓱이2',
    introduce: faker.lorem.sentence(),
    slackId: faker.string.sample(),
    slackWorkspace: 'Frontend',
    image: 'https://d2pu0ruyxf50in.cloudfront.net/머쓱레터_og.png',
    commentCount: faker.number.int({ min: 0, max: 100 }),
    postCount: faker.number.int({ min: 0, max: 100 })
  }
];

const comments: Comment[] = [
  {
    _id: '123',
    author: users[0],
    content: faker.lorem.sentence(),
    position: [faker.number.int({ min: 0, max: 100 }), faker.number.int({ min: 0, max: 100 })],
    nickname: '익명의 머쓱이',
    decorationImageName: faker.helpers.arrayElement(Object.values(DECORATION_IMAGE_NAME))
  },
  {
    _id: '1234',
    author: users[1],
    content: faker.lorem.sentence(),
    position: [faker.number.int({ min: 0, max: 100 }), faker.number.int({ min: 0, max: 100 })],
    nickname: '익명의 머쓱이',
    decorationImageName: faker.helpers.arrayElement(Object.values(DECORATION_IMAGE_NAME))
  },
  {
    _id: '1235',
    author: users[1],
    content: faker.lorem.sentence(),
    position: [faker.number.int({ min: 0, max: 100 }), faker.number.int({ min: 0, max: 100 })],
    nickname: '익명의 머쓱이',
    decorationImageName: faker.helpers.arrayElement(Object.values(DECORATION_IMAGE_NAME))
  }
];

const posts: Post[] = [
  {
    _id: '123',
    title: '머쓱이',
    content: faker.lorem.sentence(),
    musseukImageName: faker.helpers.arrayElement(Object.values(MUSSEUK_IMAGE_NAME)),
    comments: comments,
    author: users[0]
  },
  {
    _id: '1234',
    title: '머쓱이2',
    content: faker.lorem.sentence(),
    musseukImageName: faker.helpers.arrayElement(Object.values(MUSSEUK_IMAGE_NAME)),
    comments: comments,
    author: users[1]
  },
  {
    _id: '12345',
    title: '머쓱이3',
    content: faker.lorem.sentence(),
    musseukImageName: faker.helpers.arrayElement(Object.values(MUSSEUK_IMAGE_NAME)),
    comments: comments,
    author: users[1]
  }
];

export const handlers = [
  http.get('*/posts/channel/:channelId', async () => {
    await delay(1000);

    return new HttpResponse(JSON.stringify(posts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.get('*/posts/:postId', async ({ request, params }) => {
    await delay(1000);

    const postId = params.postId;
    const myPost = posts.find((post) => post._id === postId);

    return new HttpResponse(JSON.stringify(myPost), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.get('*/posts/author/:userId', async ({ request, params }) => {
    await delay(1000);

    const userId = params.userId;
    const myPosts = posts.filter((post) => post.author._id === userId);

    return new HttpResponse(JSON.stringify(myPosts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  })
];
