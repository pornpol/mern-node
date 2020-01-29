const axios = require("axios");

const httpError = require("../models/http-error");

const API_KEY = "AIzaSyDZ7J1SeDJ_6rczH0bu-UjyBuwMpP7yHdM";

const getCoordsForAddress = async address => {
  //   return {
  //     lat: 40.7484405,
  //     lng: -73.9878584
  //   };

  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new httpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
};

module.exports = getCoordsForAddress;
