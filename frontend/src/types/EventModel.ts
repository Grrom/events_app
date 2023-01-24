export default class EventModel {
  name: string;
  date: string;
  time: string;
  id: string;

  constructor(id: string, name: string, date: string, time: string) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.time = time;
  }
}
