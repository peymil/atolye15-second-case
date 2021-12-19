import { Server } from 'http';
import fetch from 'node-fetch';
import server from '../src/server';

describe('githubNode', () => {
  let express: Server;
  beforeAll(async () => {
    express = await server();
  });
  afterAll(async () => {
    await new Promise((resolve) => express.close(resolve));
  });
  it('should return updateable dependencies', async () => {
    expect.assertions(1);
    const result = await fetch('http://localhost:4000/dependencybot/subscribe', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'example@email.com', gitRepo: 'https://github.com/peymil/node-test' }),
    });
    const resultJson = await result.text();
    // resultJson.split('\n').forEach((str) => {
    //   str.split(': ')[1].split(' ---> ').forEach(([old,new]) => {

    //   });
    // });
    expect(resultJson).toMatchInlineSnapshot(`
      "eslint: 7.9.0 ---> 8.5.0
      lodash: 4.0.0 ---> 4.17.21
      mongodb: 3.6.5 ---> 4.2.2
      prettier: 1.15.3 ---> 2.5.1"
    `);
  });
});
