export default class EventModel {
  name: string;
  date: string;
  id: string;

  constructor(id: string, name: string, date: string) {
    this.id = id;
    this.name = name;
    this.date = date;
  }
}
