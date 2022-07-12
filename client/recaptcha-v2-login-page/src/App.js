// import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from './pages/Login';

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit this <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
  return (
    <div className="App">
    {/* <Routes>
      <Route path="/" element={<Login />} />
    </Routes>    */}
      <div>
        {/* <h1>Login</h1> */}
        {/* <Route path="/login"> */}
          <Login />
        {/* </Route> */}
      </div>
  </div>
  );
}

export default App;
