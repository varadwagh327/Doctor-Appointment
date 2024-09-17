import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Dr. Varad Wagh</h3>
          <h4>Specialty: Cardiology</h4>
          <h5>Years of Experience: 5+ years</h5>
          <p>
            Welcome to my practice! I am Dr. Varad Wagh, a Cardiology with over
            five years of experience. I am passionate about providing
            personalized care to each of my patients and ensuring they receive
            the highest quality treatment.
          </p>

          <p>
            Outside of the clinic, I enjoy doing hardwork and I am dedicated. My
            goal is to make your healthcare experience as comfortable and
            effective as possible. Whether you’re here for a routine checkup or
            specialized care, I look forward to supporting your health and
            well-being.
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
