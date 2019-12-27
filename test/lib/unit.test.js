import Unit from '../../app/lib/unit';

describe('Unit', () => {
  describe('#to_ft()', () => {
    it('returns the correct value', () => {
      const unit = new Unit({ value: 1 })
      expect(unit.to_ft).toEqual(3.28)
    })
  })
})
