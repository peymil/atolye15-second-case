import fetch from 'node-fetch';
import * as github from './github';

const failedMock = {
  message: 'NOT FOUND',
};
const mockDataBase64 = {
  content:
    'ewogICJuYW1lIjogImF0b2x5ZTE1LXRhc2siLAogICJ2ZXJzaW9uIjogIjEu\nMC4wIiwKICAiZGVzY3JpcHRpb24iOiAiIiwKICAibWFpbiI6ICJpbmRleC50\ncyIsCiAgInNjcmlwdHMiOiB7CiAgICAiZGV2IjogInRzLW5vZGUgc3JjL2lu\nZGV4LnRzIiwKICAgICJidWlsZCI6ICJ0c2MiLAogICAgInRlc3QiOiAiamVz\ndCIKICB9LAogICJhdXRob3IiOiAiIiwKICAibGljZW5zZSI6ICJJU0MiLAog\nICJkZXZEZXBlbmRlbmNpZXMiOiB7CiAgICAiQHR5cGVzL2Nyb24iOiAiXjEu\nNy4zIiwKICAgICJAdHlwZXMvZXhwcmVzcyI6ICJeNC4xNy4xMyIsCiAgICAi\nQHR5cGVzL2plc3QiOiAiXjI3LjAuMyIsCiAgICAiQHR5cGVzL25vZGUtZmV0\nY2giOiAiMiIsCiAgICAiQHR5cGVzL25vZGVtYWlsZXIiOiAiXjYuNC40IiwK\nICAgICJlc2xpbnQiOiAiXjguNC4xIiwKICAgICJqZXN0IjogIl4yNy40LjMi\nLAogICAgInByZXR0aWVyIjogIl4yLjUuMSIsCiAgICAidHMtamVzdCI6ICJe\nMjcuMS4xIiwKICAgICJ0cy1ub2RlIjogIl4xMC40LjAiLAogICAgInR5cGVz\nY3JpcHQiOiAiXjQuNS4yIgogIH0sCiAgImRlcGVuZGVuY2llcyI6IHsKICAg\nICJjcm9uIjogIl4xLjguMiIsCiAgICAiZGF5anMiOiAiXjEuMTAuNyIsCiAg\nICAiZG90ZW52IjogIl4xMC4wLjAiLAogICAgImV4cHJlc3MiOiAiXjQuMTcu\nMSIsCiAgICAibm9kZS1mZXRjaCI6ICIyIiwKICAgICJub2RlbWFpbGVyIjog\nIl42LjcuMiIsCiAgICAic2ltcGxlLWdpdCI6ICJeMi40OC4wIgogIH0KfQo=\n',
};
const mockData = {
  name: 'atolye15-task',
  version: '1.0.0',
  description: '',
  main: 'index.ts',
  scripts: {
    dev: 'ts-node src/index.ts',
    build: 'tsc',
    test: 'jest',
  },
  author: '',
  license: 'ISC',
  devDependencies: {
    '@types/cron': '^1.7.3',
    '@types/express': '^4.17.13',
    '@types/jest': '^27.0.3',
    '@types/node-fetch': '2',
    '@types/nodemailer': '^6.4.4',
    eslint: '^8.4.1',
    jest: '^27.4.3',
    prettier: '^2.5.1',
    'ts-jest': '^27.1.1',
    'ts-node': '^10.4.0',
    typescript: '^4.5.2',
  },
  dependencies: {
    cron: '^1.8.2',
    dayjs: '^1.10.7',
    dotenv: '^10.0.0',
    express: '^4.17.1',
    'node-fetch': '2',
    nodemailer: '^6.7.2',
    'simple-git': '^2.48.0',
  },
};
const generateFetchMock = (shouldSucced: boolean) => () => {
  return {
    json: () => {
      if (shouldSucced) return mockDataBase64;
      return failedMock;
    },
  };
};
describe('github api testes', () => {
  it('should fetch base64 file from github and parse it to utf8', async () => {
    expect.assertions(1);
    // @ts-ignore
    fetch = generateFetchMock(true);
    // @ts-ignore
    const text = await github.searchForFile('repo/name', 'package.json');
    expect(JSON.parse(text as string)).toStrictEqual(mockData);
  });
  it('if there is not file it must return undefined', async () => {
    expect.assertions(1);
    // @ts-ignore
    fetch = generateFetchMock(false);
    const text = await github.searchForFile('repo/name', 'package.json');

    expect(text).toBeUndefined();
  });
});
