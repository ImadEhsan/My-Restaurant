import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { Link } from "react-router-dom";
import "../styles/HomeStyles.css";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const backgrounds = [
    "https://res.cloudinary.com/dv02aogoo/image/upload/v1745527130/banner_p3lskj.png",
    "https://res.cloudinary.com/dv02aogoo/image/upload/v1745527317/banner.2_p8qsvh.png",
    "https://res.cloudinary.com/dv02aogoo/image/upload/v1745528043/Screenshot_2025-04-24_135347_fudnwd.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="home" style={{ backgroundImage: `url(${backgrounds[activeIndex]})` }}>
        <div className="headerContainer">
          <h1 className="">Food Website</h1>
          <p>Your hunger just met its match.</p>
          <Link to="/menu">
            <button>ORDER NOW</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
