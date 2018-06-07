var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var res = generateMessage('David', 'This a test message');
    expect(res.from).toBe('David');
    expect(res.text).toBe('This a test message');
    expect(typeof res.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var res = generateLocationMessage('David', 1, 2);
    expect(res.from).toBe('David');
    expect(res.url).toBe('https://www.google.com/maps?q=1,2');
    expect(typeof res.createdAt).toBe('number');
  });
});
