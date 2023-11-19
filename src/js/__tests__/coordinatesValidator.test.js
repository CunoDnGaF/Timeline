import coordinatesValidator from '../coordinatesValidator';

test("Should return the correct coordinates without a space", () => {
    const result = coordinatesValidator('0.123,0.123');
    const expected = {
        latitude: 0.123,
        longitude: 0.123,
      };
    
    expect(result).toEqual(expected);
  });

  test("Should return the correct coordinates with a space", () => {
    const result = coordinatesValidator('0.123, 0.123');
    const expected = {
        latitude: 0.123,
        longitude: 0.123,
      };
    
    expect(result).toEqual(expected);
  });

  test("Should return the correct coordinates in brackets", () => {
    const result = coordinatesValidator('[3.123, 4.123]');
    const expected = {
        latitude: 3.123,
        longitude: 4.123,
      };
    
    expect(result).toEqual(expected);
  });

  test("Should return the correct coordinates", () => {
    const result = coordinatesValidator('-0.123, -0.123');
    const expected = {
        latitude: -0.123,
        longitude: -0.123,
      };
    
    expect(result).toEqual(expected);
  });

  test("Should return the error 'Введите значение'", () => {
    const result = coordinatesValidator('');
    const expected = 'Введите значение';
    
    expect(result).toEqual(expected);
  });

  test("Should return the error 'Некорректные координаты'", () => {
    const result = coordinatesValidator('34.23');
    const expected = 'Некорректные координаты';
    
    expect(result).toEqual(expected);
  });

  test("Should return the error 'Некорректные значения широты и/или долготы'", () => {
    const result = coordinatesValidator('sss,ddd');
    const expected = 'Некорректные значения широты и/или долготы';
    
    expect(result).toEqual(expected);
  });