import moment from 'moment';

const desiredDateFormat = 'DD.MM.YYYY';
const desiredTimeFormat = 'HH:mm';

const timeZoneOffsetInMinutes = new Date().getTimezoneOffset();
const timeZoneOffset = -timeZoneOffsetInMinutes;

const getDateWithTimezone = (date, time) => {
  const getDateWithTimezoneFunc = fullDate => {
    const momentDateTime = moment.utc(fullDate).utcOffset(timeZoneOffset);

    const convertedDate = momentDateTime.format(desiredDateFormat);
    const convertedTime = momentDateTime.format(desiredTimeFormat);

    return [convertedDate, convertedTime];
  };

  if (time === undefined) {
    return getDateWithTimezoneFunc(date);
  } else {
    return getDateWithTimezoneFunc(`${date}T${time}`);
  }
};

export default getDateWithTimezone;
