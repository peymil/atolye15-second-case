import fetch from 'node-fetch';
import { Server } from 'http';
import cmp from 'semver-compare';
import { UpdateableDependencies } from '../src/findLatestVers';
import server from '../src/server';
import deleteOtherThanVersionNumber from '../src/utils/deleteOtherThanVersionNumber';

describe('githubPhp', () => {
  let express: Server;

  beforeAll(async () => {
    express = await server(4001);
  });
  afterAll(async () => {
    await new Promise((resolve) => express.close(resolve));
  });
  it('should return updateable dependencies', async () => {
    expect.hasAssertions();
    const result = await fetch('http://localhost:4001/dependencybot/subscribe', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'example@email.com', gitRepo: 'https://github.com/peymil/php-test' }),
    });
    const resultJson = (await result.json()) as { updateableDependencies: UpdateableDependencies };
    for (const { newVersion, oldVersion } of resultJson.updateableDependencies) {
      const isGreater = cmp(newVersion, oldVersion);
      expect(isGreater).toBeGreaterThan(0);
    }
  });
});
