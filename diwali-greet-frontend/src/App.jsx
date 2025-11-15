import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import HomeComponent from './components/HomeComponent/HomeComponent';
import LoginComponent from './components/LoginComponent/LoginComponent';
import PrivateRoute from './PrivateRoute/PrivateRouter';
import WelcomeComponent from './components/WelcomeComponent/WelcomeComponent';

function App() {
  
  return (
    <>
     <BrowserRouter>
       <Routes>
          <Route path="/home" element={
            <PrivateRoute>
              <HomeComponent />
            </PrivateRoute>
           } 
          />
          <Route path='/login' element={<LoginComponent />} />
          <Route path='/' element={<WelcomeComponent />} />
       </Routes>
     </BrowserRouter>
    
    </>
  )
}

export default App
