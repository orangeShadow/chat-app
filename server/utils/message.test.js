const expect = require('expect');

let {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
      
    let message = generateMessage('Anton','Hi');

    expect(message.from).toEqual('Anton');
    expect(message.text).toEqual('Hi');
    expect(typeof message.craetedAt).toBe('number');

  });
});

