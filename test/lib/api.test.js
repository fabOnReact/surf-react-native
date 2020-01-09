import Api from '../../app/lib/api';

jest.mock('@react-native-community/google-signin', () => ({
  'SIGN_IN_CANCELLED': jest.fn()
}))
jest.mock('../../app/lib/support')
// jest.mock('@react-native-community/async-storage')

describe('Api', () => {
  describe('#getConfig', () => {
    it('returns the config object', () => {
      const api = new Api()  
      expect(api.getConfig()).toBe("")
    })
  })
})
