
import "./LandingPage.css";
import sinkpic from "./img/LP-sinkrepair.png";
import lightpic from "./img/LP-lightrepair.png";
import windowpic from "./img/LP-windowrepair.jpg";


const Landing = () => {
 

  return (
    <div className="landing-page">
      <header>
        <h3>HandyWork</h3>
        <p className="purpose">A website designed to connect you to a local, trustworthy handyman.</p>
        <a href="/Register"  id="registerBtn" class="registerBtn">Sign Up</a>
      </header>
      <div className="img-container">
        <img className="homeImg" alt="handyman fixing sink" title="Sink Repairs" src={sinkpic}></img>   
        <img className="homeImg" alt="handyman fixing lights" title="Light Repairs" src={lightpic}></img>    
        <img className="homeImg" alt="handyman fixing window" title="Window Repairs"src={windowpic}></img>
      </div>
    </div>

  );
};

export default Landing;
