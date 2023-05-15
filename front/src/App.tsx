import { Outlet } from 'react-router-dom';
import "./App.css";
Object.assign(global, { WebSocket });

function App() {
  return (
    <div className='App'>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
