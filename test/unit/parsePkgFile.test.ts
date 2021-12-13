import pkgParsers from '../../src/pkgParsers';

test('should parse package.json', () => {
  const stringifiedPackageJson = `{
        "name": "atolye15-task",
        "version": "1.0.0",
        "description": "",
        "main": "index.ts",
        "scripts": {
          "dev": "ts-node src/index.ts",
          "build": "tsc",
          "test": "jest"
        },
        "author": "",
        "license": "ISC",
        "devDependencies": {
          "@types/jest": "^27.0.3",
          "eslint": "^8.4.1",
          "jest": "^27.4.3",
          "prettier": "^2.5.1",
          "ts-jest": "^27.1.1",
          "ts-node": "^10.4.0",
          "typescript": "^4.5.2"
        },
        "dependencies": {
          "cron": "^1.8.2",
          "dotenv": "^10.0.0",
          "express": "^4.17.1",
          "simple-git": "^2.48.0",
          "smtp-client": "^0.4.0"
        }
      }`;
  const result = {
    devDeps: {
      '@types/jest': '^27.0.3',
      eslint: '^8.4.1',
      jest: '^27.4.3',
      prettier: '^2.5.1',
      'ts-jest': '^27.1.1',
      'ts-node': '^10.4.0',
      typescript: '^4.5.2',
    },
    deps: {
      cron: '^1.8.2',
      dotenv: '^10.0.0',
      express: '^4.17.1',
      'simple-git': '^2.48.0',
      'smtp-client': '^0.4.0',
    },
  };
  const parsedPackageJson = pkgParsers('node', stringifiedPackageJson);
  expect(result).toStrictEqual(parsedPackageJson);
});
test('should parse composer.json', () => {
  const stringifiedComposerJson = `{
    "name": "codecov/codecov-php",
    "type": "library",
    "license": "MIT",
    "homepage": "https://github.com/codecov/codecov-php",
    "description": "demo repo",
    "keywords": ["code coverage", "codecov", "coverage reports"],
    "authors": [
        {
            "name": "codecov.io",
            "email": "hello@codecov.io"
        }
    ],
    "require": {
        "php": ">=7.2"
    },
    "require-dev": {
        "phpunit/phpunit": "~8.0"
    },
    "autoload": {
        "psr-0": {
            "Example": "src/"
        }
    }
}`;
  const result = {
    deps: {
      php: '>=7.2',
    },
    devDeps: {
      'phpunit/phpunit': '~8.0',
    },
  };
  const parsedComposerJson = pkgParsers('php', stringifiedComposerJson);
  expect(result).toStrictEqual(parsedComposerJson);
});
