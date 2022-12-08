import { convertPLNToUSD } from './../convertPLNtoUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });
  it('should return NaN when input is text', () => {
    expect(convertPLNToUSD('6')).toBeNaN();
    expect(convertPLNToUSD('1abc')).toBeNaN();
    expect(convertPLNToUSD('-3232')).toBeNaN();
  });
  it('should return NaN when input is empty', () => {
    expect(convertPLNToUSD()).toBeNaN();
  });
  it('Should return "Error" when input is not eaither string or number', () =>{
    expect(convertPLNToUSD({})).toBe('Error')
    expect(convertPLNToUSD([])).toBe('Error')
    expect(convertPLNToUSD(function() {})).toBe('Error')
  });
  it('should return "0" when input is lower than "0"', () => {
    expect(convertPLNToUSD(-1)).toBe('$0.00')
    expect(convertPLNToUSD(-10.1)).toBe('$0.00')
    expect(convertPLNToUSD(-5)).toBe('$0.00')
    expect(convertPLNToUSD(-1000)).toBe('$0.00')
  })

});