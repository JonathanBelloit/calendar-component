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

export const getEventsForDate = (events: { dateString: string }[], targetDate: string) => {
  const target = new Date(targetDate);
  target.setDate(target.getDate() - 1);
  const adjustedTargetDate = target.toDateString();

  return events.filter(event => {
    const eventDate = new Date(event.dateString);
    eventDate.setDate(eventDate.getDate() - 1);
    return eventDate.toDateString() === adjustedTargetDate;
  });
};