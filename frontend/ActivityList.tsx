import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllActivities, removeActivityById } from './activitiesSlice';
import { RootState } from './store';

interface FitnessActivity {
  id: string;
  name: string;
  duration: string;
  date: string;
}

const FitnessActivitiesList: React.FC = () => {
  const dispatch = useDispatch();
  const activitiesList = useSelector((state: RootState) => state.activities.list);

  useEffect(() => {
    dispatch(fetchAllActivities());
  }, [dispatch]);

  const handleDeleteActivity = (activityId: string) => {
    dispatch(removeActivityById(activityId));
  }

  return (
    <div>
      <h2>Fitness Activities</h2>
      <ul>
        {activitiesList.map((activity: FitnessActivity) => (
          <li key={activity.id}>
            <p>Name: {activity.name}</p>
            <p>Duration: {activity.duration}</p>
            <p>Date: {activity.date}</p>
            <button onClick={() => {}}>Edit</button> 
            <button onClick={() => handleDeleteActivity(activity.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FitnessActivitiesList;