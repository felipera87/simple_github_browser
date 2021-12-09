import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns';

export default function getElapsedTime(dateParam) {
  let unit;
  let referenceDate = dateParam;
  if (typeof dateParam === 'string') {
    referenceDate = new Date(dateParam);
  }
  const today = new Date();

  const dayDifference = differenceInDays(today, referenceDate);

  if (dayDifference > 0) {
    unit = 'days';
    if (dayDifference <= 1) {
      unit = 'day';
    }
    return [dayDifference, unit];
  }

  const hourDifference = differenceInHours(today, referenceDate);

  if (hourDifference > 0) {
    unit = 'hours';
    if (hourDifference <= 1) {
      unit = 'hour';
    }
    return [hourDifference, unit];
  }

  const minuteDifference = differenceInMinutes(today, referenceDate);

  unit = 'minutes';
  if (minuteDifference <= 1) {
    unit = 'minute';
  }
  return [minuteDifference, unit];
}
