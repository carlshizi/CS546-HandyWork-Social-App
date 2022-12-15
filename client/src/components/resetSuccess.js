import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom'
import { read_cookie } from 'sfcookies'


const Landing = () => {

  setTimeout(function () {
    window.location.replace("http://localhost:3000/login")
  }, 2000)

  const cookie_key = "navigate"
  const { isLoggedIn } = useSelector(state => state.auth);

  if (read_cookie(cookie_key) !== 'two' && isLoggedIn) {
    return <Navigate to="/profile" />;
  } else if (read_cookie(cookie_key) !== 'two' && !isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="container">
      <header className="login-page">
        <h4>
          Password reset successful
        </h4>
      </header>
    </div>
  );
};

export default Landing;
