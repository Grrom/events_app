import type EventModel from "@/types/EventModel";
import { defineStore } from "pinia";

export const useEventsStore = defineStore("events", {
  state: () => {
    return {
      events: undefined as Array<EventModel> | undefined,
      needsRefresh: true,
    };
  },
  actions: {
    setNeedsRefresh() {
      this.needsRefresh = true;
    },
    setEvents(events: Array<EventModel>) {
      this.events = events;
      this.needsRefresh = false;
    },
    getByIndex(i: number) {
      return this.events === undefined ? undefined : this.events![i];
    },
  },
});
