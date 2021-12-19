import fetch from 'node-fetch';
import server from '../src/server';

describe('githubPhp', () => {
  beforeAll(async () => {
    await server(4001);
  });
  it('should return updateable dependencies', async () => {
    expect.assertions(1);
    const result = await fetch('http://localhost:4001/dependencybot/subscribe', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'example@email.com', gitRepo: 'https://github.com/peymil/php-test' }),
    });
    const resultJson = await result.text();
    expect(resultJson).toMatchInlineSnapshot(`
      "doctrine/annotations: 1.2 ---> 1.14.x-dev
      php-parallel-lint/php-console-highlighter: 0.5.0 ---> dev-feature/update-code-style
      php-parallel-lint/php-parallel-lint: 1.3.1 ---> dev-master
      phpcompatibility/php-compatibility: 9.3.5 ---> dev-feature/phpunit-update-config
      dealerdirect/phpcodesniffer-composer-installer: 0.7.0 ---> dev-master
      squizlabs/php_codesniffer: 3.6.2 ---> 4.0.x-dev
      yoast/phpunit-polyfills: 1.0.0 ---> dev-develop"
    `);
  });
});
