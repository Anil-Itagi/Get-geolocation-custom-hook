import { useState } from "react";
function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);
  function getPosition() {
    if (!navigator.geolocation)
      return setError("you browser does not support geolocation");
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    )
  }
  return { isLoading, position, error, getPosition };
}
export default function App() {
  const { isLoading, position: { lat, lng }, error, getPosition } = useGeolocation();
  const [countClicks, setCountClicks] = useState(0);
  function handleClick() {
    setCountClicks((count) => count + 1)
    getPosition();
  }
    return (
        <div className="box">
        <button onClick={handleClick} disabled={isLoading}>
          Get the position
        </button>
        {isLoading && <p>Loading Position...</p>}
        {error && <p>{error}</p>}
        {!isLoading && !error && lat && lng && (<p>
          your GPS position : {" "}
          <a target="_blank" rel="noreferrer" href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}>
            {lat},{lng}
          </a>
        </p>)}
        <p>you requested position {countClicks} times</p>
        </div>
    )
}