import React from 'react';


function About() {
  return (
    <div className="aboutpage">
      <h1> {localStorage.getItem("products")}</h1>
    </div>
  );
}

export default About;