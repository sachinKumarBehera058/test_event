import { useState, useEffect } from 'react';
import { IoChevronDownSharp } from 'react-icons/io5';
import moment from 'moment';
import { fetchUserActivities } from '../api';
import { Navbar } from '@attrybtech/attryb-ui';
import SingleSessionData from './SingleSessionData';
import { useParams } from "react-router-dom";
import './UserActivities.css'

interface UserActivity {
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

function UserActivities() {
    const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

    const routeParams = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserActivities(routeParams.containerId);
      setUserActivities(data);
    };
    if (routeParams)
    fetchData();
  }, [routeParams]);

  const toggleUserActivity = (userId: string) => {
    setSelectedUserId((prevUserId) => (prevUserId === userId ? null : userId));
    setSelectedSessionId(null);
  };

  const toggleSessionDetails = (sessionId: string) => {
    setSelectedSessionId((prevSessionId) => (prevSessionId === sessionId ? null : sessionId));
  };


  return (
    <div className="user-activities">
      <Navbar />
        <div className="user-activities">
          {userActivities.map((userActivity) => (
            <div key={userActivity.aId} className="user-activity">
              <div className="user-activity-head" onClick={() => toggleUserActivity(userActivity.aId)}>
                <div className="text-md">
                  <span className="text-md--md">Anonymous ID :</span> {userActivity.aId}
                </div>
                <div>
                  <IoChevronDownSharp />
                </div>
              </div>
              <div className="user-activity-body">
                {selectedUserId === userActivity.aId && (
                  <>
                    {userActivity.userSessions.map((session:any, index:any) => (
                      <div key={index} className="session">
                        <div
                          onClick={() => toggleSessionDetails(session.sessionDetails._id)}
                          className="dropdown-arrow"
                        >
                          <div className="session-details text-sm--md">
                            {moment(session.sessionDetails.events[0].time).format('DD MMM YYYY, hh:mm A')}
                          </div>
                          <div className="session-details text-sm">
                            <span className="text-sm--sb">Session ID :</span> {session.sessionDetails._id}
                          </div>
                          <div className="session-details">
                            <IoChevronDownSharp />
                          </div>
                        </div>
                        {selectedSessionId === session.sessionDetails._id && <SingleSessionData session={session} />}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

export default UserActivities;


