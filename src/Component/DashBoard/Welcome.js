import React from 'react'

const Welcome = () => {
  const birdsContainerStyle = {
    position: "absolute",
    top: "15vw",
    animationName: "birdsFlying",
    animationDelay: "0s",
    animationDuration: "30s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
    zIndex: "-1"
  };

  const welcomeStyle = {
    color: "#3f5efb",
    textShadow: "2px 2px 5px black",
    position: "fixed",
    textAlign: "center",
    height: "100vh",
    lineHeight: "100vh",
    fontSize: "40px",
    fontFamily: '"Courier New", Courier, monospace',
    width: "100%",
    top: "0",
    left: "0",
    zIndex: "0"
  };

  return (
    
    <div className='container d-flex justify-content-center'>
        <div id="birdsContainer" style={birdsContainerStyle}>
        <img
          src="https://clipart-library.com/img1/1663317.gif"
          height="100px"
          draggable="false"
        />
      </div>
      <div id="welcome" style={welcomeStyle}>
        Welcome!
      </div>  
    </div>
  )
}

export default Welcome
