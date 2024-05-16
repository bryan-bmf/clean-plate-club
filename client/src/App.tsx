import { Route, Routes } from "react-router-dom";
import './App.css';
import AddNewRecipe from './pages/AddNewRecipe';
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <div className="App">
      <Routes>
					<Route path="/" element={<Main />} />
					<Route path="/add" element={<AddNewRecipe />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
    </div>
  );
}

export default App;
