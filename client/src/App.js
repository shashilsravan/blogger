import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router} from 'react-router-dom'
import AppWithRouterAccess from './AppWithRouterAccess';
import ContextProvider from './context/ContextProvider';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

function App() {
  return (
    <div>
      <ContextProvider>
        <Router>
          <AppWithRouterAccess/>
        </Router>
      </ContextProvider>
    </div>
  );
}

export default App;
