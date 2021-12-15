import dayjs from 'dayjs';

export const generateCronStringFor24HoursLater = (date: Date) => {
  const dayjsDate = dayjs(date).subtract(1, 'minute');
  const minute = dayjsDate.minute();
  const hour = dayjsDate.hour();
  return `${minute} ${hour} * * *`;
};
