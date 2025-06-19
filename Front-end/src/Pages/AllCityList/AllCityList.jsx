import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AllCityList.module.css";
import bg1 from "../../assets/bg2.jpg";
import AllCity from "../../components/CityList/AllCity";

export default function AllCityList({ trending }) {
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all places from the backend
  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/get-city-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ trending }), // you can include trending if needed
        });

        const data = await response.json();
        setCities(data);
        console.log("Fetched cities/places:", data);
      } catch (error) {
        console.error("Error fetching city/place data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [trending]);

  // Scroll to the top of the page when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles["all-city-list-container"]} id="all-city-list-container">
      <div className={styles["all-city-list-header"]} id="all-city-list-header">
        <img className={styles["all-city-list-bg"]} id="all-city-list-bg" src={bg1} alt="" />
        <h1 className={styles["all-city-title"]} id="all-city-title">
          Explore All Trending {trending === "trendingcity" ? "Cities" : "Places"}
        </h1>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <AllCity cities={cities} trending={trending} navigate={navigate} />
      )}
    </div>
  );
}
