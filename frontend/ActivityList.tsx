import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllActivities, removeActivityById } from './activitiesSlice';
import { RootState } from './store';

interface FitnessActivity {
  id: string;
  name: string;
  duration: string;
  date: string;
}

const useDeleteActivityHandler = (dispatch) => (activityId: string) => () => dispatch(removeActivityById(activityId));

const FitnessActivitiesList: React.FC = () => {
  const dispatch = useDispatch();
  const activitiesList = useSelector((state: RootState) => state.activities.list);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(fetchAllActivities());
  }, [dispatch]);

  const handleDeleteActivity = useDeleteActivityHandler(dispatch);

  const filteredActivities = useMemo(() => activitiesList.filter(activity =>
    activity.name.toLowerCase().includes(filter.toLowerCase())
  ), [activitiesList, filter]);

  const handleFilterChange = useCallback((event) => {
    setFilter(event.target.value);
  }, []);

  return (
    <div>
      <h2>Fitness Activities</h2>
      <input
        type="text"
        placeholder="Filter activities by name..."
        value={filter}
        onChange={handleFilterChange}
      />
      <ul>
        {filteredActivities.map((activity: FitnessActivity) => (
          <li key={activity.id}>
            <p>Name: {activity.name}</p>
            <p>Duration: {activity.duration}</p>
            <p>Date: {activity.date}</p>
            <button>Edit</button>
            <button onClick={handleDeleteActivity(activity.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(FitnessActivitiesList);