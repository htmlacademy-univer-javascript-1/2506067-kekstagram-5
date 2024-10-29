/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const isMeetingWithinWorkHours = (startWork, endWork, startMeeting, duration) => {
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };
  const startWorkMinutes = timeToMinutes(startWork);
  const endWorkMinutes = timeToMinutes(endWork);
  const startMeetingMinutes = timeToMinutes(startMeeting);
  const endMeetingMinutes = startMeetingMinutes + duration;
  return startMeetingMinutes >= startWorkMinutes && endMeetingMinutes <= endWorkMinutes;
};
