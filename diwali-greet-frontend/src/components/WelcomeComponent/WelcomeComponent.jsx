import React from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import './WelcomeComponent.css';
import { useNavigate } from "react-router-dom";

function WelcomeComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('click');
    navigate('/login');
  }
  return (
    <div>
      <HeaderComponent />
      <div className='main-content'>
        <h1>Welcome to Diwali 
             <span style={{display: 'block', marginTop: '5px'}}> Greetings</span>
        </h1>
        <p className='para'>Create beautiful personalized Diwali greeting cards and share them with your loved ones</p>

         <div className="welcome-diyas">
                <div className="welcome-diya"><div className="welcome-flame"></div></div>
                <div className="welcome-diya"><div className="welcome-flame"></div></div>
                <div className="welcome-diya"><div className="welcome-flame"></div></div>
            </div>
      </div>

      <button className="login-btn" onClick={handleClick}>
            Login to Create Card
      </button>
    </div>
  )
}

export default WelcomeComponent;
