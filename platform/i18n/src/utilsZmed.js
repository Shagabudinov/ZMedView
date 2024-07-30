import i18n from 'i18next';
import moment from 'moment';

const timeZoneOffsetInMinutes = new Date().getTimezoneOffset();
const timeZoneOffset = -timeZoneOffsetInMinutes;

function formatFullDateWithTimezone(
  date,
  time = undefined,
  dateFormat = i18n.t('Common:localDateFormat', 'MMM D, YYYY'),
  timeFormat = i18n.t('Common:localTimeFormat', 'HH:mm')
) {
  const getDateWithTimezoneFunc = fullDate => {
    const momentDateTime = moment.utc(fullDate).utcOffset(timeZoneOffset);

    const convertedDate = momentDateTime.format(dateFormat);
    const convertedTime = momentDateTime.format(timeFormat);

    return [convertedDate, convertedTime];
  };

  if (time === undefined) {
    return getDateWithTimezoneFunc(date);
  } else {
    return getDateWithTimezoneFunc(`${date}T${time}`);
  }
}

function formatDate(date, format = i18n.t('Common:localDateFormat', 'MMM D, YYYY')) {
  return date ? moment(date).format(format) : '';
}

export { formatDate, formatFullDateWithTimezone };
