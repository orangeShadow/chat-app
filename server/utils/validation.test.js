const expect = require('expect');

let { isRealString } = require('./validation');

describe('isRealString', () => {

  it('should reject non-string values ', () => {

    expect(isRealString('')).toEqual(false);
    expect(isRealString(98)).toEqual(false);

  });

  it('should reject string with only spaces', () => {
    expect(isRealString('    ')).toEqual(false);
  });

  it('should allow string with non space characters', () => {
    expect(isRealString(' a bc!  ')).toEqual(true);
  });

});
