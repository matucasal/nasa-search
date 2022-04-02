import './App.scss';
import  { HashRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header/Header';
import Search from './components/Search/Search';
import ShowPage from './components/ShowPage/ShowPage';

function App() {
  return (
    <div className="App">
        <HashRouter>
            <div>
                <Header></Header>
                <Search></Search>
                <div className="content">
                    <Routes>
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
