import dayjs from 'dayjs';

export default (date: Date): string => {
  const dayjsDate = dayjs(date).subtract(1, 'minute');
  const minute = dayjsDate.minute();
  const hour = dayjsDate.hour();
  return `${minute} ${hour} * * *`;
};
