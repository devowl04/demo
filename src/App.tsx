import './App.css';
import Home from './Components/home';
import Form from './Components/form';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <nav className='nav nav-tabs py-3 px-5'>
        <Link to="/" className='nav-item'>Hero</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/home">Home</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/form">Form</Link>&nbsp;&nbsp;&nbsp;
      </nav>
      <Routes>
        <Route path='/' element={<h1> Hello </h1>} />
        <Route path='/home' element={<Home />} />
        <Route path='/home/test' element={<h1>Testing</h1>} />
        <Route path='/form' element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
