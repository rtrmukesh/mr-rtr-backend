

class Number {
  static Get(number, defaultValue = null) {
    let formatData = number ? parseInt(number) : defaultValue;
    return formatData;
  }

  static GetPositiveOnly(number, defaultValue = null) {
    number = number ? parseInt(number) : defaultValue;
    number = number >= 0 ? number : defaultValue;
    return number;
  }

  static GetFloat(number) {
    try {
      if (number) {

        let formatData = parseFloat(number);

        if (formatData) {

          let floatNumber = formatData.toFixed(2);

          return parseFloat(floatNumber);
        }
      }
      return null
    } catch (err) {
      console.log(err);
    }
  }


  static Multiply(number1, number2) {
    try {
      if (number1 && number2) {
        return this.GetFloat(number1) * this.GetFloat(number2)
      }
      return null;
    } catch (err) {
      console.log(err);
    }
  }

  static Addition(number1, number2) {
    try {
      if (number1 && number2) {
        return this.GetFloat(number1) + this.GetFloat(number2)
      }
      return null;
    } catch (err) {
      console.log(err);
    }
  }

  static Subtraction(number1, number2) {
    try {
      if (number1 && number2) {
        return this.GetFloat(number1) - this.GetFloat(number2)
      }
      return null;
    } catch (err) {
      console.log(err);
    }
  }

  static Division(number1, number2) {
    try {
      if (number1 && number2) {
        return this.GetFloat(number1) / this.GetFloat(number2)
      }
      return null;
    } catch (err) {
      console.log(err);
    }
  }

  static getPercentageValue(number, percentage) {
    try {
      if (number && percentage) {

        let percentageValue = this.GetFloat(number) * (this.GetFloat(percentage) / 100);

        if (percentageValue) {
          return this.GetFloat(percentageValue)
        }
      }
      return null;
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = Number;