
import './App.css';
import { Routes, Route } from "react-router-dom";
import GoPage from './page/Go';
import Home from './page/Home';
import ShowUrls from './page/ShowUrls';
import Login from './page/Login';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='tp/:id' element={<GoPage/>}/>
        <Route path='/allUrls' element={<ShowUrls/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
