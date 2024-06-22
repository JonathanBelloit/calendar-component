export const dailyEventCount = (events: { dateString: string }[]) => {
  const eventCount: { [key: string]: number } = {};

  events.forEach((event) => {
    const eventDate = new Date(event.dateString)
    eventDate.setDate(eventDate.getDate() - 1)
    const adjustedDate = eventDate.toDateString()
    if (!eventCount[adjustedDate]) {
      eventCount[adjustedDate] = 0;
    }
    eventCount[adjustedDate]++;
  });

  return eventCount;
};
