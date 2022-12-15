import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { delete_cookie } from 'sfcookies'

const Landing = () => {
  const { isLoggedIn } = useSelector(state => state.auth);

  const cookie_key = "navigate"   // clear cookie for navigating to reset page
  delete_cookie(cookie_key)


  if (isLoggedIn) {
    return <Navigate to="/profile" />;
}

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Landing Page</strong>
        </h3>
      </header>
    </div>
  );
};

export default Landing;
