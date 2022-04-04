import './App.scss';
import  { HashRouter, Routes, Route } from "react-router-dom";

import ShowPage from './components/ShowPage/ShowPage';
import Home from './components/Home'
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
        <HashRouter>
            <div>
                <Header/>
                
                <div className="content">
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/show' element={<ShowPage/>}/>
                    </Routes>
                </div>
            </div>
        </HashRouter>
    </div>
  );
}

export default App;
