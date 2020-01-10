import Data from '../../app/lib/data';
import Unit from '../../app/lib/unit';

jest.mock('../../app/lib/unit');
const props = { swellHeight: 0, swellPeriod: 0, windSpeed: 0, imperial: true, i: 0 }
describe('Data', () => {
  beforeEach(() => {
    Unit.mockClear()
  });

  describe('constructor', () => {
    it('We can check if Data called the class constructor', () => {
      const data = new Data(props)
      expect(Unit).toHaveBeenCalledTimes(2)
    })
  })

  describe('#swellHeight', () => {
    it('returns the swell height in feet', () => {
      const data = new Data(props)
      const mockUnitInstance = Unit.mock.instances[0]
      mockUnitInstance.ft = jest.fn()
      mockUnitInstance.mt = jest.fn()
      expect(mockUnitInstance.ft).toHaveBeenCalledTimes(0)
      data.swellHeight()
      expect(mockUnitInstance.ft).toHaveBeenCalled()
      expect(mockUnitInstance.mt).toHaveBeenCalledTimes(0)
    })

    it('returns the swell height in meters', () => {})
  })
})
