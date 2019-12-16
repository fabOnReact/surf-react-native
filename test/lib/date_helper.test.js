import DateHelper from '../../app/lib/date_helper'

test('returns the date object', async () => {
  var date = new DateHelper('December 17, 1995 03:24:00');
  expect(date).toEqual(new Date("1995-12-17T02:24:00.000Z"));
});
