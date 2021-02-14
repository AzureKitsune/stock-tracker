import logo from './logo.svg';
import './App.css';

import Header from "./components/Header";
import StockFeeds from "./components/StockFeeds";

function App() {
  return (
    <div className="App">
      <Header />
      <StockFeeds />
    </div>
  );
}

export default App;
