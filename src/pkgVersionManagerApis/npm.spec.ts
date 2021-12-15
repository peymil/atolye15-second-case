const generateFetchMock = (shouldSucced: boolean) => async (url: RequestInfo, init?: RequestInit) => {
  return {
    json: async () => {
      if (shouldSucced) return mockDataBase64;
      return failedMock;
    },
  };
};

test('should get latest version of package', () => {});
