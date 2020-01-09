import MockAsyncStorage from 'mock-async-storage';

const mockImpl = new MockAsyncStorage();
jest.mock('@react-native-community/async-storage', () => mockImpl);
jest.mock('native-base', () => {
  return {
    getModel: jest.fn(),
  };
});
