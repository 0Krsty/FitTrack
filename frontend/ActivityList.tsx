import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchActivities, deleteActivity } from './activitiesSlice';
import { RootState } from './store';

interface Activity {
  id: string;
  name: string;
  duration: string;
  date: string;
}

const FitnessActivities: React.FC = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state: RootState) => state.activities.list);

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteActivity(id));
  }

  return (
    <div>
      <h2>Fitness Activities List</h2>
      <ul>
        {activities.map((activity: Activity) => (
          <li key={activity.id}>
            <p>Name: {activity.name}</p>
            <p>Duration: {activity.duration}</p>
            <p>Date: {activity.date}</p>
            <button onClick={() => {}}>Edit</button>
            <button onClick={() => handleDelete(activity.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FitnessActivities;