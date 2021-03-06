import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactMapGL, { Layer, Source } from "react-map-gl";
import { Spinner } from "reactstrap";
import geoJSON from "../json/geoJSON.json";
import "../css/mapbox.css";
import Checklist from "./Checklist";
import useWindowDimensions from "../hooks/windowDimensions";

function Mapbox() {
  const { profile, loading } = useSelector(state => state.profile);
  const { width, height } = useWindowDimensions();
  const [sources, setSources] = useState([]);

  let geoJSONRegions = [];

  useEffect(() => {
    if (!loading) {
      profile.visited.map(region => {
        const { source, coordinates } = geoJSON.regions.find(
          ({ source }) => source === region
        );

        geoJSONRegions.push(
          <Source
            key={source}
            id={source}
            type="geojson"
            data={{
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: { type: "Polygon", coordinates: coordinates },
                },
              ],
            }}
          >
            <Layer
              id={source}
              type="fill"
              paint={{
                "fill-color": profile.fillColor,
                "fill-opacity": 0.5,
              }}
            />
          </Source>
        );
      });
      setSources(geoJSONRegions);
    }
  }, [profile]);

  const [viewport, setViewport] = useState({
    width: 1152,
    height: height * 0.9,
    latitude: 40,
    longitude: -92,
    zoom: 3,
  });

  if (!localStorage.getItem("isAuth")) return <Redirect to="/" />;

  if (!profile) return <Redirect to="/create" />;

  return (
    <>
      {loading ? (
        <div className="spinner-div">
          <Spinner />
        </div>
      ) : (
        <div className="map-container">
          <ReactMapGL
            {...viewport}
            mapStyle={`mapbox://styles/mapbox/${profile.mapStyle}`}
            onViewportChange={nextViewport => setViewport(nextViewport)}
            mapboxApiAccessToken={
              "pk.eyJ1IjoiY3NoYXR0bzk5IiwiYSI6ImNrZGR2bzN1cjRpbjcydHFyMThvczlzYTAifQ.unXf2zoBfeVM28V-tQSRPw"
            }
          >
            {sources}
            <Checklist />
          </ReactMapGL>
        </div>
      )}
    </>
  );
}

export default Mapbox;
