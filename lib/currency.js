class Currency {

  static Get(data) {
    if ((data !== null && !isNaN(data))) { 

      return parseFloat(data).toFixed(2);
    } else {
      return "0.00";
    }
  }
  static GetDifferenceInPercentage = (data1, data2) => {
    if (data1 && data2) {
      const diff = (data1 - data2) / data2 * 100;
      return Math.round(diff)
    } else {
      return "0";
    }
  };

  static CalculateProfitPercentage = (data1, data2) => {
    if (data1 && data2) {

      const profitPercentage = (data1 / data2) * 100;
      return Math.round(profitPercentage);
    } else {
      return "0";
    }
  }
  static IndianFormat = (value) => {
    if (value !== null) {
    let amount = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
    return amount;
    }else{
      return '0.00'
    }
  };
}
module.exports = Currency;
