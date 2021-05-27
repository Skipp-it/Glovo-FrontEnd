import React, { useState, useEffect } from 'react';
import loginImg from '../../logo.png';
import Login from './Login';
import Register from './Register';
import RightSide from './RightSide';
import './Style.scss';

export default function AppLogin() {
  const [toggle, setToggle] = useState(false);
  const current = toggle ? 'Register' : 'Login';
  const [rightSide, setRightSide] = useState('right');

  //TODO de facut state la get cookie-uri! si de bagat dependency  pe slide sa se mute de pe register pe loginRegister
  // const currentActive = isLoginActive ? 'loginRegister' : 'register';

  const handleOnClick = () => {
    setToggle(!toggle);
   
    if (rightSide === 'right') {
      setRightSide('left');
    } else {
      setRightSide('right');
    }
  };

  useEffect(() => {
  }, [toggle]);

  return (
    <div className="App">
      <div className="login">
        <div className="container">
          <div className="image">
            <img src={loginImg} alt={loginImg}></img>
          </div>
          {toggle ? (
            <Login containerRef={current} />
          ) : (
            <Register containerRef={current} />
          )}
        </div>
        <RightSide current={current} side={rightSide} onClick={handleOnClick} />
      </div>
    </div>
  );
}
