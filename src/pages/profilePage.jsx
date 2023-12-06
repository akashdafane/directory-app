import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/profilePage.css";
import { formatTime } from "../utility";
import { Container, Row, Col } from "react-bootstrap";
import { Button, Popup } from "../components";
import UserNameCards from "./userNameCards";
import { useNavigate } from "react-router-dom";
import PostComponent from "./userPosts";

const ProfilePage = () => {
  const [userData, setUserData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [clockRunning, setClockRunning] = useState(true);
  const [pausedTime, setPausedTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const params = useParams();
  const { id } = params;

  const navigate = useNavigate();

  useEffect(() => {
    axios(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((e) => console.log("ee", e));
  }, []);

  // Fetch countries from the API
  useEffect(() => {
    fetch("http://worldtimeapi.org/api/timezone")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        // For example, setting the default selected country to the first one in the list
        if (data.length > 0) {
          setSelectedCountry(data[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  // Fetch current time based on selected country
  useEffect(() => {
    const fetchCurrentTime = () => {
      if (selectedCountry) {
        fetch(`http://worldtimeapi.org/api/timezone/${selectedCountry}`)
          .then((response) => response.json())
          .then((data) => {
            setCurrentTime(data?.datetime);
          })
          .catch((error) => {
            console.error("Error fetching current time:", error);
          });
      }
    };

    if (clockRunning) {
      const interval = setInterval(fetchCurrentTime, 1000); // Fetch time every second
      return () => clearInterval(interval); // Cleanup on unmount or when paused
    }
  }, [selectedCountry, clockRunning]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleNavigation = () => {
    navigate(`/`);
  };

  const handlePauseStart = () => {
    setClockRunning(!clockRunning);
    if (!clockRunning) {
      setPausedTime(new Date().getTime()); // Store the timestamp when paused
    } else {
      if (pausedTime) {
        const now = new Date().getTime();
        setElapsedTime(elapsedTime + (now - pausedTime)); // Calculate elapsed time
        setPausedTime(null); // Reset paused time
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="back-button">
            <Button label="Back" onClick={handleNavigation} />
          </div>
        </Col>
        <Col>
          <div className="country-dropdown">
            <h5>Country Dropdown</h5>
            <select value={selectedCountry} onChange={handleCountryChange}>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </Col>
        <Col>
          <div className="clock">
            <h5>Digital Clock</h5>
            <div className="time">{formatTime(currentTime)}</div>
          </div>
        </Col>
        <Col>
          <div className="start-button">
            <Button
              onClick={handlePauseStart}
              label={clockRunning ? "Pause" : "Start"}
              variant={clockRunning ? "danger" : "success"}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>Profile Page</Col>
        <UserNameCards data={userData} />
      </Row>
      <PostComponent />

      <button onClick={togglePopup}>Open Popup</button>

      <Popup isOpen={isOpen} onClose={togglePopup}>
        {/* Content inside the popup */}
        <h2>Popup Content</h2>
        <p>This is the content of the popup.</p>
      </Popup>
    </Container>
  );
};

export default ProfilePage;
