import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import LoadingAnimation from '../components/LoadingAnimation';
import styled, { keyframes } from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeScreen = () => {
  const [location, setLocation] = useState('Seoul');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric'); 

  const fetchWeather = async () => {
    if (!location.trim()) {
      toast.error('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${unit}`;
      const response = await axios.get(url);
      setWeather(response.data);
      toast.success(`Weather data loaded for ${location}!`);
    } catch (error) {
      setError('City not found. Please check the city name.');
      toast.error('City not found. Please check the city name.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [unit]); // Re-fetch data when unit changes

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  // Toggle unit function
  const toggleUnit = () => {
    setUnit(prevUnit => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <Container>
      <ContentWrapper>
        <Title>Weather Tracker</Title>
        <InputWrapper>
          <Input 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter city name..."
          />
          <SearchButton onClick={fetchWeather}>
            <SearchIcon>🔍</SearchIcon>
          </SearchButton>
          <UnitToggle onClick={toggleUnit}>
            <ToggleIndicator isMetric={unit === 'metric'}>
              {unit === 'metric' ? '°C' : '°F'}
            </ToggleIndicator>
          </UnitToggle>
        </InputWrapper>
        
        {loading ? (
          <LoadingAnimation />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          weather && <WeatherCard weather={weather} unit={unit} />
        )}
      </ContentWrapper>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Container>
  );
};

const slideUp = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f4f4f4 100%);
  padding: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  animation: ${slideUp} 0.8s ease-out;
`;

const Title = styled.h1`
  font-size: 42px;
  color: #333;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  font-weight: 700;
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 500px;
  margin-bottom: 30px;
  position: relative;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background: white;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
  }
`;

const SearchIcon = styled.span`
  font-size: 20px;
`;

const UnitToggle = styled.button`
  background: #f8f9fa;
  border: none;
  border-radius: 25px;
  width: 80px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }

  &:focus {
    outline: none;
  }
`;

const ToggleIndicator = styled.span`
  position: relative;
  width: 40px;
  height: 32px;
  background: ${props => props.isMetric ? '#66a6ff' : '#ff6b6b'};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s ease;
  transform: translateX(${props => props.isMetric ? '0' : '32px'});

  &::after {
    content: '${props => !props.isMetric ? '°C' : '°F'}';
    position: absolute;
    color: #666;
    font-size: 14px;
    font-weight: 500;
    left: ${props => props.isMetric ? '45px' : '-30px'};
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
  padding: 15px 25px;
  border-radius: 10px;
  margin-top: 20px;ㄴ
  animation: ${slideUp} 0.5s ease-out;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

export default HomeScreen;