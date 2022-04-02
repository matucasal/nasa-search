import './App.scss';
import  { HashRouter, Routes, Route } from "react-router-dom";

import ShowPage from './components/ShowPage/ShowPage';
import Home from './components/Home'

function App() {
  return (
    <div className="App">
        <HashRouter>
            <div>
                
                <div className="content">
                    <Routes>
                    <Route path='/' element={<Home/>}/>
                        <Route path='/results' element={<ShowPage/>}/>
                        <Route path='/show' element={<ShowPage/>}/>
                    </Routes>
                </div>
            </div>
        </HashRouter>
    </div>
  );
}

export default App;
