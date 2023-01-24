import EventModel from "@/types/EventModel";

export default class ApiHelper {
  static url = "http://localhost:8080/";

  static async getEvents(): Promise<Array<EventModel>> {
    return await fetch(this.url + "list_events", {
      method: "GET",
    }).then(async (data) => {
      let response = await data.json();
      let events: Array<EventModel> = [];
      response.forEach((element: any) => {
        console.log(element);
        events.push(
          new EventModel(element.id, element.name, element.date, element.time)
        );
      });

      return events;
    });
  }

  static async createEvent(
    name: string,
    date: string,
    time: string
  ): Promise<boolean> {
    let formData = new FormData();
    formData.append("event_name", name);
    formData.append("event_date", date);
    formData.append("event_time", time);
    return await fetch(this.url + "create_event", {
      method: "POST",
      body: formData,
    })
      .then(async (data) => {
        return true;
      })
      .catch((e) => {
        return false;
      });
  }

  static async updateEvent(
    id: string,
    name: string,
    date: string,
    time: string
  ): Promise<boolean> {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("event_name", name);
    formData.append("event_date", date);
    formData.append("event_time", time);
    return await fetch(this.url + "update_event", {
      method: "POST",
      body: formData,
    })
      .then(async (data) => {
        return true;
      })
      .catch((e) => {
        return false;
      });
  }

  static async deleteEvent(id: string): Promise<boolean> {
    let formData = new FormData();
    formData.append("id", id);
    return await fetch(this.url + "delete_event", {
      method: "POST",
      body: formData,
    })
      .then(async (data) => {
        return true;
      })
      .catch((e) => {
        return false;
      });
  }
}
