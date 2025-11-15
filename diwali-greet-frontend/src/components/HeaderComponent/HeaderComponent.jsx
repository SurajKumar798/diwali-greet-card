import './HeaderComponent.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

function HeaderComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = Cookies.get("token");
 
    const handleLogout = () =>{
       Cookies.remove("token");
       navigate('/');
    }
    //if(!token) return null;
  return (
    <div>
      <div className="header">
        <div className='left-section'>
           <div className="logo">
            <img src="../images/diwali-img.jpg" alt="diwali-img" />
           </div>
          <h2 className="heading">Diwali Cards</h2>
        </div>
          {token && location.pathname === '/home' && (
              <button style={{marginRight: '10px'}} onClick={handleLogout}>Logout</button>
          )}         
      </div>
    </div>  
  )
}

export default HeaderComponent
