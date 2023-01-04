import {describe, expect, it} from '@jest/globals';
import {getCharPositionInText} from "../../../src/helpers/string";
describe('getCharPositionInText', () => {
  it('should return undefined for negative char index', () => {
    const text = 'abc\ndef';
    const charIndex = -1;
    expect(getCharPositionInText(text, charIndex)).toBeUndefined();
  });

  it('should return undefined for char index beyond end of text', () => {
    const text = 'abc\ndef';
    const charIndex = 8;
    expect(getCharPositionInText(text, charIndex)).toBeUndefined();
  });

  it('should return correct char position for char at beginning of text', () => {
    const text = 'abc\ndef';
    const charIndex = 0;
    const expectedResult = {row: 0, col: 0};
    expect(getCharPositionInText(text, charIndex)).toEqual(expectedResult);
  });

  it('should return correct char position for char in middle of text', () => {
    const text = 'abc\ndef';
    const charIndex = 5;
    const expectedResult = {row: 1, col: 1};
    expect(getCharPositionInText(text, charIndex)).toEqual(expectedResult);
  });

  it('should return correct char position for char at end of text', () => {
    const text = 'abc\ndef';
    const charIndex = 6;
    const expectedResult = {row: 1, col: 2};
    expect(getCharPositionInText(text, charIndex)).toEqual(expectedResult);
  });
});
