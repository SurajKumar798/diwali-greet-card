import React from 'react'

function FooterComponent() {
  return (
    <div>
       <footer className="footer" style={{marginTop: '150px'}}>
        <p>&copy; 2024 Diwali Greetings. All rights reserved.</p>
        <p>Made with ❤️ for the festival of lights</p>
        <div className="social-links">
            <a href="#">📘</a>
            <a href="#">📷</a>
            <a href="#">🐦</a>
        </div>
       </footer>
    </div>
  )
}

export default FooterComponent
