import { UserActivity } from './types';

export const fetchUserActivities = async (containerId:string|undefined): Promise<UserActivity[]> => {
    try {
        const response = await fetch(`https://velocity-ten.vercel.app/api/analytics/${containerId}/events/time-line`);
        const data = await response.json();
        return data.data.map((item: any) => ({
            aId: item.anonymousId,
            userSessions: item.sessionDetails.map((session: any) => ({
              sessionDetails: {
                _id: session.sessionId,
                events: session.events.map((event: any) => ({
                  _id: event.event,
                  eventName: event.event,
                  time: event.createdAt,
                })),
              },
            })),
          }));
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};
