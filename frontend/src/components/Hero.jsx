import React from "react";

const Hero = ({  imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>Welcome to VCare Medical Institute | Your Trusted Healthcare Provider</h1>
          <p>
            We glad your here. Easily book appointments, view your medical
            records, and manage your healthcare needs all in one place. If you
            need assistance, we're always here to help. Your health is our
            priority!
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
