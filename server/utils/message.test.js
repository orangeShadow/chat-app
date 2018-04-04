const expect = require('expect');

let { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
      
    let message = generateMessage('Anton','Hi');

    expect(message.from).toEqual('Anton');
    expect(message.text).toEqual('Hi');
    expect(typeof message.craetedAt).toBe('number');

  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let lat = 46.34234;
    let lon = 36.45434;
    let message = generateLocationMessage('Anton',lat, lon);
    expect(message.from).toBe('Anton');
    expect(message.url).toBe(`https://google.com/maps?q=${lat},${lon}`);

    expect(typeof message.craetedAt).toBe('number');

  });
});