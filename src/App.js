import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SemesterSelect from './page/SemesterSelect'
import Semester from './page/Semester'
import Navbar from './component/Navbar';
import Login from './page/Login';
import Signup from './page/Signup';
import { useDispatch } from 'react-redux';
import { getUser } from './redux/slices/authentication';
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Dispatch the getUser action when the component mounts
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/semester/:semester" element={<Semester />} />
          <Route exact path="/" element={<SemesterSelect />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
