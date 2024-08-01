import React from 'react'
import ReactDOM from 'react-dom/client'
import CountryInfos from './CountryInfo'
import './index.css'

function App() {
  return (
    <div className="App">
      <CountryInfos />
    </div>
  );
}

export default App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
