import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

function Home() {
  // const [workouts, setWorkouts] = useState(null); // local state
  const { workouts, dispatch } = useWorkoutContext(); // global context state

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/workouts`
      );
      const json = await response.json(); // parse JSON response body as JS array of objects
      if (response.ok) {
        // setWorkouts(workouts);
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]); // external function must be in dependency array

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
