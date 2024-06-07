import Calendar from "./components/calendar/Calendar";
import Login from "./components/auth/Login";
import useAuth from './hooks/useAuth';

function App() {
  const { user, loading } = useAuth()
  return (
    <>
      { loading && <h1>Loading...</h1>}
      { !user && <Login /> }
      { user && <Calendar /> }
    </>
  )
}

export default App

