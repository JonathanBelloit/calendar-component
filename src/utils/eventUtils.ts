import { Event } from "../redux/eventSlice";

export const dailyEventCount = (events: { dateString: string }[]) => {
  const eventCount: { [key: string]: number } = {};

  events.forEach((event) => {
    const eventDate = new Date(event.dateString);
    eventDate.setDate(eventDate.getDate() - 1);
    const adjustedDate = eventDate.toDateString();
    if (!eventCount[adjustedDate]) {
      eventCount[adjustedDate] = 0;
    }
    eventCount[adjustedDate]++;
  });

  return eventCount;
};

export const getEventsForDate = (events: Event[], targetDate: string) => {
  const target = new Date(targetDate);
  const adjustedTargetDate = target.toDateString();

  return events.filter(event => {
    const eventDate = new Date(event.dateString);
    return eventDate.toDateString() === adjustedTargetDate;
  })
  .sort((a, b) => {
    const timeA = new Date(`${adjustedTargetDate} ${a.time}`);
    const timeB = new Date(`${adjustedTargetDate} ${b.time}`);
    return timeA.getTime() - timeB.getTime();
  });
};
