import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Menu from './components/Menu';
import Projects from './screens/Projects';
import Notes from './screens/Notes';
import Overview from './screens/Overview';
import Profile from './screens/Profile';
import Project from './screens/Project';
import Group from './screens/Group';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import PrivateRoute from './components/PrivateRoute';
import paths from './paths';
import Logout from './screens/Logout';


function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname.toLowerCase() === paths.signIn.toLocaleLowerCase() || location.pathname.toLowerCase() === paths.signUp.toLocaleLowerCase() ? null : <Menu />}
      <Routes>
        <Route path={paths.projects} element={<PrivateRoute><Projects /></PrivateRoute>} />
        <Route path={paths.notes} element={<PrivateRoute><Notes /></PrivateRoute>} />
        <Route path={paths.overview} element={<PrivateRoute><Overview /></PrivateRoute>} />
        <Route path={paths.profile} element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path={paths.project} element={<PrivateRoute><Project /></PrivateRoute>} />
        <Route path={paths.group} element={<PrivateRoute><Group /></PrivateRoute>} />
        <Route path={paths.signIn} element={<SignIn />} />
        <Route path={paths.signUp} element={<SignUp />} />
        <Route path={paths.logout} element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
