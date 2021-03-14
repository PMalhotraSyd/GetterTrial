
import './styles/App.css';
import './components/Tindercard.js'
import Tindercard from './components/Tindercard.js';


function App() {
  return (
    <div className="app">
      <h1>Getter Products</h1>
      {/*  Custom Component */}
      <Tindercard></Tindercard>
    </div>
  );
}

export default App;
