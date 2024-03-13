import React, { useState } from 'react';
import { UserActivity } from '../types';
import './SingleSessionData.css';
import moment from "moment";

interface SingleSessionProps {
  session: UserActivity['userSessions'][0];
}

const SingleSessionData: React.FC<SingleSessionProps> = ({ session }) => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const sortedEvents = session.sessionDetails.events?.sort((a: any, b: any) => {
    return new Date(b.time).getTime() - new Date(a.time).getTime();
  });

  return (
    <div className="session">
      <ul>
        {sortedEvents.map((event: any) => (
          <li
            key={event._id}
            className={`session-item ${selectedEvent === event._id ? 'selected' : ''}`}
            onClick={() => setSelectedEvent(event._id)}
            onMouseEnter={() => setSelectedEvent(event._id)}
            onMouseLeave={() => setSelectedEvent(null)}
          >
            <div className='session-item-list text-sm'>
              {moment(event.time).format('DD MMM YYYY, hh:mm A')}
            </div>
            <div className='session-item-list text-sm'>
              {event.eventName}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleSessionData;

