import { faker } from '@faker-js/faker';
import { User } from 'common/types';
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

export const handlers = [
  http.get('*/auth-user', async () => {
    await delay(1000);

    return new HttpResponse(JSON.stringify(users[0]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.get('*/users/:userId', async ({ request, params }) => {
    await delay(1000);

    const userId = params.userId;
    const myUser = users.find((user) => user._id === userId);

    return new HttpResponse(JSON.stringify(myUser), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  })
];
