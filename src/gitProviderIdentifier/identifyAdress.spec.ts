import { identifyAdress } from './identifyAdress';

test('Should return provider and repoName if adress is known', () => {
  const mockResult = {
    provider: 'github',
    repoName: 'emre/deneme',
  };
  const providerAndRepo = identifyAdress('github.com/emre/deneme');

  expect(providerAndRepo).toStrictEqual(mockResult);
});

test('Should throw error if adress is not known', () => {
  const string = 'kestanebali.com/emre/deneme';
  expect(() => {
    identifyAdress(string);
  }).toThrowError('is not identified');
});
