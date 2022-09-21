import { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import './App.css';
import { Login } from './pages/Login';

function App() {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    setLogged(Boolean(Number(localStorage.getItem('logged') || '0')))
  }, []);

  return logged? <Home setLogged={setLogged} />: <Login setLogged={setLogged} />
}

export default App;
