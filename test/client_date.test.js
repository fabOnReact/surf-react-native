import Picture from '../app/lib/picture';
import { AsyncStorage } from 'react-native';
const sum = require('../app/lib/client_date');
function FormDataMock() {
  this = jest.fn(x => { return "picture"} )
  this.append = jest.fn();
}
global.FormData = FormDataMock

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('create form data instance', () => {
  const picture = new Picture('test');
  expect(picture.data).toBeInstanceOf(FormDataMock)
});

// Complete FormDataMock
test('set form data instance', () => {
  const picture = new Picture('test');
  expect(picture.data).toBe("post[picture][type]")
});
