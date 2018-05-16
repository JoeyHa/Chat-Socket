const expect = require('expect');

const {isRealString} = require('./validation.js');
//import isRealString
describe('isRealString', () => {
    it('should reject non-string values', () => {
        var res = isRealString(98);
        expect(res).toBe(false);
    });
    it('should reject string with only spaces', () => {
        var res = isRealString('   ');
        expect(res).toBe(false);
    });
    it('Should allow string with non-spcae characters', () =>{
        var res = isRealString('  NoSpace  ');
        expect(res).toBe(true);
    });
});
