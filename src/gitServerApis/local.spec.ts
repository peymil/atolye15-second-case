import * as local from './local';
import fs from 'fs/promises';
test('Should find git repo in filesystem and return dpendencies', async () => {
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

  //@ts-ignore
  jest.spyOn(fs, 'readFile').mockImplementation(async () => mockData);

  await local.searchForFile('d/d', 'sadf');
  expect(fs.readFile).toBeCalled();
});
test('If there is no file it must return undefined', async () => {
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

  //@ts-ignore
  jest.spyOn(fs, 'readFile').mockImplementation(async () => {
    throw new Error();
  });

  const text = await local.searchForFile('/usr/bin', 'noPackage.json');
  expect(text).toEqual(undefined);
});
