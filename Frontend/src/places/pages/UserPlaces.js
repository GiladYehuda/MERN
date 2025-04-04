import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

// const DUMMY_PLACES = [
//   {
//     id: "p1",
//     title: "Empire State Building",
//     description: "One of the most famous sky scrapes in the world!",
//     imageUrl:
//       "https://travelmate.tech/media/images/cache/new_york_empire_state_building_01_introduzione_jpg_1920_1080_cover_70.jpg",
//     address: "20 W 34th St., New York, NY 10001",
//     location: {
//       lat: 40.74844054,
//       lng: -73.985664,
//     },
//     creator: "u1",
//   },
//   {
//     id: "p2",
//     title: "Emp. State Building",
//     description: "One of the most famous sky scrapers in the world!",
//     imageUrl:
//       "https://travelmate.tech/media/images/cache/new_york_empire_state_building_01_introduzione_jpg_1920_1080_cover_70.jpg",
//     address: "20 W 34th St., New York, NY 10001",
//     location: {
//       lat: 40.74844054,
//       lng: -73.985664,
//     },
//     creator: "u2",
//   },
// ];

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeleteHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlace) =>
      prevPlace.filter((place) => place.id !== deletedPlaceId)
    );
  };
  // const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner items={loadedPlaces} />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
