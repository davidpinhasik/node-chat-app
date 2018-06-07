var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var res = generateMessage('David', 'This a test message');
    expect(res.from).toBe('David');
    expect(res.text).toBe('This a test message');
    expect(typeof res.createdAt).toBe('number');
  });
});
