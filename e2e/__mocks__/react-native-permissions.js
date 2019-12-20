import * as RNPermission from 'react-native-permissions';
const { PERMISSIONS, RESULTS } = require('react-native-permissions/lib/commonjs/constants.js');

export { PERMISSIONS, RESULTS };
// mock out any functions you want in this style...
export async function check(permission) {
  jest.fn();
}
// const {
//   PERMISSIONS,
//   RESULTS,
// } = require('react-native-permissions/lib/commonjs/constants.js');
