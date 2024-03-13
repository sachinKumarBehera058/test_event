export interface UserActivity {
    aId: string;
    userSessions: {
      sessionDetails: {
        _id: string;
        events: {
          _id: string;
          eventName: string;
          time: string;
        }[];
      };
    }[];
}
