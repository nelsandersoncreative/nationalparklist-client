const Utils = {
  // verify if a given park is already in the user's park list
  userParkSearch(parkItemCode, parkList) {
    for (let i = 0; i < parkList.length; i += 1) {
      if (parkList[i].parkCode === parkItemCode) {
        return true;
      }
    }
    return null;
  },

  // handles temperature conversion of data from the Open Weather API
  fromKelvin(temp) {
    return Math.floor((temp - 273.15) * 1.8000 + 32.00) + ' °F';
  },

  // handles formatting for phone number data from National Park Service API
  formatPhoneNumber(number) {
    const isFormatted = n => n[0] === '(' || n[3] === '.' || n[3] === '-';
    const format = n => '(' + n.slice(0, 3) + ') ' + n.slice(3, 6) + '-' + n.slice(6);
    return number && number.length ? isFormatted(number) ? number : format(number) : 'No phone number available';
  },

  // format the city that displays under the park title and picture for a Park Page
  cityFormat(parkAddress) {
    if (parkAddress === undefined) {
      return 'no city available';
    } return parkAddress[0] ? parkAddress[0].city : 'no city available';
  },

  // format the state that displays under the park title and picture for a Park Page
  stateFormat(address) {
    if (address === undefined) {
      return 'no city available';
    } return address[0] ? address[0].stateCode : 'no state available';
  },

  // generate uuid for unique keys for .map() generated components
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
      (c) => {
        // eslint-disable-next-line
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
  },
};

export default Utils;
