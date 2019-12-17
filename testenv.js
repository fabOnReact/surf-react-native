// jest.mock('react-native-device-info', () => {
//   return {
//     getModel: jest.fn(),
//   };
// });

jest.mock('native-base', () => {
  return {
    getModel: jest.fn(),
  };
});
