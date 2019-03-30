import ClientDate from '../../app/lib/client_date'

test('returns the correct date', () => {
  let date = new ClientDate('December 17, 1995 03:24:00')
  expect(date.iso).toBe("1995-12-17T02:24:00.000Z")
});
