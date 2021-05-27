import React from 'react';

export default function RightSide(props) {

  return (
    <div
      className={`right-side ${props.side}`}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
}
