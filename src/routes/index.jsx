import Home from "../pages/home/index.jsx"
import Users from "../pages/users/index.jsx"
import UserEdit from "../pages/user-edit/index.jsx"
import Workouts from "../pages/workouts/index.jsx"
import WorkoutEdit from "../pages/workouts-manage/index.jsx"
import Exercises from "../pages/exercises/index.jsx"

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/users/:id",
    element: <UserEdit />,
  },
  {
    path: "/workouts",
    element: <Workouts />,
  },
  {
    path: "/workouts/new",
    element: <WorkoutEdit />,
  },
  {
    path: "/workouts/manage/:workoutId",
    element: <WorkoutEdit />,
  },
  {
    path: "/exercises",
    element: <Exercises />,
  },
  {
    path: "/exercises/:id",
    element: <Exercises />,
  },
]
