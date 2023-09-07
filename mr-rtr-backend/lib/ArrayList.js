
class ArrayList {
  // Array List is Empty
  static isEmpty = (arrayList) => {
    if (arrayList && arrayList.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  // Array List is Not Empty
  static isNotEmpty = (arrayList) => {
    return !this.isEmpty(arrayList);
  };

  // Array List is Not Empty
  static removeDuplicate = (arrayList) => {
    if (this.isNotEmpty(arrayList)) {
      let uniqueArr = arrayList.reduce((result, obj) => {
        let duplicate = result.find((o) => o.id === obj.id);
        if (!duplicate) {
          result.push(obj);
        }
        return result;
      }, []);

      return uniqueArr;
    }
    return [];
  };

  static sort = (data, sort, sortDirection) => {
    if (!Array.isArray(data)) {
      throw new Error('Data must be an array');
    }

    if (sortDirection) {
      let sortArray = data.sort((a, b) => a[sort] - b[sort]);
      return sortArray;
    } else {
      let sortArray = data.sort((a, b) => b[sort] - a[sort]);
      return sortArray;
    }
  };
  /**
   * Is data False
   * @param value
   */

  static StringIntoArray = (string) => {
    let arrayData;
    if (string) {
      arrayData = string.split(',');

      if (arrayData && arrayData.length > 0) {
        arrayData = arrayData.map((data) => parseInt(data));
      }
    }

    return arrayData;
  };
  static groupBy = (data) => {
    const groupedData = data.reduce((acc, { date, quantity }) => {
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += quantity;
      return acc;
    }, {});

    const groupedDataArray = Object.entries(groupedData).map(([date, quantity]) => ({ date, quantity }));
    return groupedDataArray;
  };
  static groupByName = (data) => {
    const groupedData = data.reduce((acc, { name, quantity }) => {
      if (!acc[name]) {
        acc[name] = 0;
      }
      acc[name] += quantity;
      return acc;
    }, {});

    const groupedDataArray = Object.entries(groupedData).map(([name, quantity]) => ({ name, quantity }));
    let arrayValue = groupedDataArray.sort((a, b) => a.name.localeCompare(b.name));
    return arrayValue;
  };


  static getLength(array) {
    return array && array.length > 0 ? array.length : 0
  }

  static splitArray(array, numberOfElement) {
    try {
      const chunks = [];
      if (array && array.length > 0) {
        for (let i = 0; i < array.length; i += numberOfElement) {
          const chunk = array.slice(i, i + numberOfElement);
          chunks.push(chunk);
        }
      }
      return chunks;

    } catch (err) {
      console.log(err);
    }
  }


}

module.exports = ArrayList;
