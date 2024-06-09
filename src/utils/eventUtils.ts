export const dailyEventCount = (events: { dateString: string }[]) => {
  const eventCount: { [key: string]: number } = {};

  events.forEach((event) => {
    const eventDate = new Date(event.dateString).toDateString();
    if (!eventCount[eventDate]) {
      eventCount[eventDate] = 0;
    }
    eventCount[eventDate]++;
  });

  return eventCount;
};
