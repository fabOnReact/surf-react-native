jest.mock('native-base', () => {
  return {
    getModel: jest.fn(),
  };
});
