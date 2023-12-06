import moment from "moment/moment";

// for handling the format of date and time
export const formatTime = (timeString) => {
  const formattedTime = moment(timeString).format("HH:mm:ss");
  return formattedTime;
};
