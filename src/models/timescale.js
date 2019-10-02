/**
 * @param {{start: Date, end: Date }} params
 */
export function getTimeSpan({ start, end }) {
  let scaleStart = new Date(start.getFullYear(), 0, 1, 0, 0, 0, 0);
  let scaleEnd = new Date(end.getFullYear() + 1, 0, 1, 0, 0, 0, 0);
  let timespan = scaleEnd.getTime() - scaleStart.getTime();

  return {
    start: scaleStart,
    end: scaleEnd,
    timespan,
    years: Array.from(range(scaleStart.getFullYear(), scaleEnd.getFullYear())),
  };
}

function* range(start, end, scale = 1) {
  for (let i = start; i <= end; i += scale) {
    yield i;
  }
}

export const labels = {
  short: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

export const time = {
  second,
  minute,
  hour,
  day,
};
