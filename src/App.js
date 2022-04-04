import './App.scss';
import  { HashRouter, Routes, Route } from "react-router-dom";

import ShowPage from './components/ShowPage/ShowPage';
import Home from './components/Home'
import Header from './components/Header/Header';
import Results from './components/Search/Results'

function App() {
  return (
    <div className="App">
        <HashRouter>
            <div>
                <Header/>
                <Home/>
                
                <div className="content">
                    <Routes>
                        <Route path='/' element={<Results/>}/>
                        <Route path='/results' element={<Results/>}/>
                        <Route path='/show' element={<ShowPage/>}/>
                    </Routes>
                </div>
            </div>
        </HashRouter>
    </div>
  );
}

export default App;
