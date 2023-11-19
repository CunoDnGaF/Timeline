export default function coordinatesValidator(input) {
    let resultArr;
    
    if (input == '') {
        return ('Введите значение');
      }

    if (input.startsWith('[') && input.endsWith(']')) {
        resultArr = input.slice(1, input.length - 1).split(',');
    } else {
        resultArr = input.split(',');
    }
    
    if (resultArr.length !== 2) {
        return ('Некорректные координаты');
      }

    const latitude = parseFloat(resultArr[0].trim());
    const longitude = parseFloat(resultArr[1].trim());

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
        return ('Некорректные значения широты и/или долготы');
      }

      return {
        latitude,
        longitude,
      }
  }