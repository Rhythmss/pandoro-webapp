import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
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

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname.toLowerCase() === "/signin" || location.pathname.toLowerCase() === "/signup" ? null : <Menu />}
      <Routes>
        <Route path='/' element={<Projects />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/overview' element={<Overview />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/project' element={<Project />} />
        <Route path='/group' element={<Group />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
