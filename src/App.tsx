import './App.css';
import Header from './components/Header';
import Recipes from './components/Recipes';

function App() {
  return (
    <div className="App">
			<Header />
      {/* <Filters /> */}
			<Recipes />
    </div>
  );
}

export default App;
