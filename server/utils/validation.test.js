const expect = require('expect');

// imprt isRealString
var {isRealString} = require('./validation');

// isRealString
  // should reject non string values
  // should reject strings with only spaces
  // should allow strings with non space characters




  describe('isRealString', () => {
    it('should reject non string values', () => {
      var name = isRealString(1234);
      expect(name).toBe(false);
    });

    it('should reject strings with only spaces', () => {
      var name = isRealString('        ');
      expect(name).toBe(false);
    });

    it('should allow strings with non space characters', () => {
      var name = isRealString('  f e s  ');
      expect(name).toBe(true);
    });
  });
