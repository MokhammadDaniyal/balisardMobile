import moment from "moment";

timeSlotsTemp = [];
var startTime = moment()
  .utc()
  .set({ hour: "9", minute: "00" });
var endTime = moment()
  .utc()
  .set({ hour: "21", minute: "59" });
while (startTime <= endTime) {
  this.timeSlotsTemp.push(new moment(startTime).format("HH:mm"));
  startTime.add(30, "minutes");
}
export const timeSlots = timeSlotsTemp;
