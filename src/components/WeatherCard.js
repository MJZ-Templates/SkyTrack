import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const WeatherCard = ({ weather, unit }) => {
  if (!weather || !weather.main || !weather.weather) {
    return null;
  }

  // Convert Fahrenheit to Celsius for icon decision purposes
  const convertToCelsius = (temp) => {
    return unit === 'imperial' ? (temp - 32) * 5 / 9 : temp;
  };

  const getTemperature = (temp) => {
    return unit === 'metric' ? `${Math.round(temp)}°C` : `${Math.round(temp)}°F`;
  };

  const { name, main, weather: weatherData } = weather;
  const description = weatherData[0].description;
  const humidity = main.humidity;
  
  const celsiusTemp = convertToCelsius(main.temp);

  const getWeatherElements = (weatherMain) => {
    switch (weatherMain) {
      case 'Rain':
        return Array(10).fill().map((_, i) => (
          <Raindrop key={i} delay={Math.random() * 2} left={`${Math.random() * 100}%`} />
        ));
      case 'Snow':
        return Array(10).fill().map((_, i) => (
          <Snowflake key={i} delay={Math.random() * 2} left={`${Math.random() * 100}%`} />
        ));
      case 'Clear':
        return <SunRays />;
      case 'Clouds':
        return Array(3).fill().map((_, i) => (
          <Cloud key={i} delay={i * 2} left={`${i * 30}%`} />
        ));
      default:
        return null;
    }
  };

  const getTemperatureIcon = (temp) => {
    if (temp >= 35) {
      return '🌡️🔥';
    } else if (temp >= 25) {
      return '🪭';
    } else if (temp >= 20) {
      return '😊';
    } else if (temp >= 15) {
      return '🌥️';
    } else if (temp >= 10) {
      return '💨';
    } else if (temp >= 0) {
      return '☃️';
    } else {
      return '🧊';
    }
  };

  return (
    <CardContainer>
      <Card weatherType={weatherData[0].main}>
        <WeatherElements>
          {getWeatherElements(weatherData[0].main)}
        </WeatherElements>
        <MainInfo>
          <CityName>{name}</CityName>
          <Temperature>
            {getTemperature(main.temp)}
            <TemperatureAnimation temp={celsiusTemp}>
              {getTemperatureIcon(celsiusTemp)}
            </TemperatureAnimation>
          </Temperature>
          <Description>{description}</Description>
        </MainInfo>
        <AdditionalInfo>
          <InfoItem>
            <Label>Feels like</Label>
            <Value>{getTemperature(main.feels_like)}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Humidity</Label>
            <Value>
              <HumidityBar value={humidity}>
                <span>{humidity}%</span>
              </HumidityBar>
            </Value>
          </InfoItem>
        </AdditionalInfo>
      </Card>
    </CardContainer>
  );
};

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const rainfall = keyframes`
  0% { transform: translateY(-50px); }
  100% { transform: translateY(calc(100vh + 50px)); }
`;

const snowfall = keyframes`
  0% {
    transform: translateY(-50px) rotate(0deg);
  }
  100% {
    transform: translateY(calc(100vh + 50px)) rotate(360deg);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const shiver = keyframes`
0% { transform: translate(1px, 1px) rotate(0deg); }
10% { transform: translate(-1px, -2px) rotate(-1deg); }
20% { transform: translate(-3px, 0px) rotate(1deg); }
30% { transform: translate(3px, 2px) rotate(0deg); }
40% { transform: translate(1px, -1px) rotate(1deg); }
50% { transform: translate(-1px, 2px) rotate(-1deg); }
60% { transform: translate(-3px, 1px) rotate(0deg); }
70% { transform: translate(3px, 1px) rotate(-1deg); }
80% { transform: translate(-1px, -1px) rotate(1deg); }
90% { transform: translate(1px, 2px) rotate(0deg); }
100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

const CardContainer = styled.div`
  perspective: 1000px;
  margin: 40px;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  box-sizing: border-box;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px; 
  padding: 40px;
  border-radius: 20px;
  background: ${props => {
    switch (props.weatherType) {
        case 'Clear':
            return 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)'; 
        case 'Rain':
            return 'linear-gradient(135deg, #616161 0%, #9bc5c3 100%)'; 
        case 'Snow':
            return 'linear-gradient(135deg, #e6e6e6 0%, #ffffff 100%)'; 
        case 'Clouds':
            return 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)'; 
        default:
            return 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)';
    }
  }};
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  backdrop-filter: blur(10px);
  transform-style: preserve-3d;
  transition: transform 0.6s;

  &:hover {
    transform: rotateY(10deg) rotateX(5deg);
  }
`;

const WeatherElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  border-radius: 20px;
`;

const Raindrop = styled.div`
  position: absolute;
  width: 2px;
  height: 20px;
  background: rgba(255,255,255,0.6);
  left: ${props => props.left};
  animation: ${rainfall} 1s linear infinite;
  animation-delay: ${props => props.delay}s;
`;

const Snowflake = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  left: ${props => props.left};
  animation: ${snowfall} 3s linear infinite;
  animation-delay: ${props => props.delay}s;
`;

const Cloud = styled.div`
  position: absolute;
  width: 60px;
  height: 30px;
  background: rgba(255,255,255,0.8);
  border-radius: 20px;
  left: ${props => props.left};
  top: 20%;
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;

  &:before {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    background: rgba(255,255,255,0.8);
    border-radius: 50%;
    top: -15px;
    left: 12px;
  }
`;

const SunRays = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
  top: 20px;
  right: 20px;
  animation: ${rotate} 20s linear infinite;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: inherit;
    border-radius: inherit;
    transform: rotate(45deg);
  }
`;

const MainInfo = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
`;

const CityName = styled.h2`
  font-size: 38px;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
`;

const Temperature = styled.div`
  font-size: 48px;
  font-weight: bold;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Description = styled.p`
  font-size: 20px;
  text-transform: capitalize;
  margin-bottom: 30px;
`;

const AdditionalInfo = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.3);
`;

const InfoItem = styled.div`
  text-align: center;
  color: white;
`;

const Label = styled.p`
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 5px;
`;

const Value = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const HumidityBar = styled.div`
  width: 100px;
  height: 10px;
  background: rgba(255,255,255,0.2);
  border-radius: 5px;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.value}%;
    background: rgba(255,255,255,0.8);
    transition: width 1s ease-in-out;
  }

  span {
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
  }
`;

const TemperatureAnimation = styled.span`
  display: inline-block;
  animation: ${props => {
    switch (true) {
      case props.temp >= 25:
        return css`${pulse} 0.8s infinite`;
      case props.temp >= 15:
        return css`${float} 2s infinite ease-in-out`;
      case props.temp >= 5:
        return css`${rotate} 3s infinite linear`;
      default:
        return css`${shiver} 0.3s infinite`;
    }
  }};
`;

export default WeatherCard;
