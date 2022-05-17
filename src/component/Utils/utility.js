export const meetingTimes = [
  "07:00 A.M.",
  "08:00 A.M.",
  "09:00 A.M.",
  "10:00 A.M.",
  "11:00 A.M.",
  "12:00 A.M.",
  "13:00 P.M.",
  "14:00 P.M.",
  "15:00 P.M.",
  "16:00 P.M.",
  "17:00 P.M.",
  "18:00 P.M.",
  "19:00 P.M.",
  "20:00 P.M.",
  "21:00 P.M.",
  "22:00 P.M.",
  "23:00 P.M."
]

export const isEmpty = (field) => {
  if (!field || field.length <= 0)
    return false;
  return true;
}

export const validMeetingTimeSelected = (fromTime, toTime) => {
  if (fromTime.substring(0, 2) >= toTime.substring(0, 2))
    return false;
  return true;
}

export const isTimestamp = (timestamp) => {
  return typeof timestamp === "object" && ((timestamp.seconds && timestamp.nanoseconds === 0) || (timestamp.seconds && timestamp.nanoseconds));
};