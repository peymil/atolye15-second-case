import { Server } from 'http';
import fetch from 'node-fetch';
import cmp from 'semver-compare';
import { UpdateableDependencies } from '../src/findLatestVers';
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
    expect.hasAssertions();
    const result = await fetch('http://localhost:4000/dependencybot/subscribe', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'example@email.com', gitRepo: 'https://github.com/peymil/node-test' }),
    });
    const resultJson = (await result.json()) as { updateableDependencies: UpdateableDependencies };
    for (const { newVersion, oldVersion } of resultJson.updateableDependencies) {
      const isGreater = cmp(newVersion, oldVersion);
      expect(isGreater).toBeGreaterThan(0);
    }
  });
});
