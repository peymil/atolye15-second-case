import identifyAdress from './identifyAddress';

describe('identify address', () => {
  it('should return provider and repoName if adress is known', () => {
    expect.assertions(1);
    const mockResult = {
      provider: 'github',
      repoName: 'emre/deneme',
    };
    const providerAndRepo = identifyAdress('github.com/emre/deneme');

    expect(providerAndRepo).toStrictEqual(mockResult);
  });

  it('should throw error if adress is not known', () => {
    expect.assertions(1);
    const string = 'kestanebali.com/emre/deneme';
    expect(() => {
      identifyAdress(string);
    }).toThrow('is not identified');
  });
});
