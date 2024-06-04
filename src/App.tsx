import Calendar from "./components/Calendar";
import Login from "./components/auth/Login";
import useAuth from './hooks/useAuth';

function App() {
  const { user, loading } = useAuth()
  console.log(user)
  return (
    <>
      { loading && <h1>Loading...</h1>}
      { !user && <Login /> }
      { user && <Calendar /> }
    </>
  )
}

export default App

