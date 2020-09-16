import React, { Fragment, useRef, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col } from "reactstrap";
import mapboxgl from "mapbox-gl";
import ReactMapGL, { FullscreenControl, Layer, Source } from "react-map-gl";
import geoJSON from "../json/geoJSON.json";
import "../css/mapbox.css";
import Checklist from "./Checklist";
import useWindowDimensions from "../hooks/windowDimensions";

// const Mapbox = () => {
//   const mapContainerRef = useRef(null);
//   const { profile, loading } = useSelector(state => state.profile);

//   const [state, setState] = useState({
//     lng: -92,
//     lat: 40,
//     zoom: 3,
//   });

//   useEffect(() => {
//     if (mapContainerRef.current) {
//       const map = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: `mapbox://styles/mapbox/dark-v10`,
//         center: [state.lng, state.lat],
//         zoom: state.zoom,
//       });

//       geoJSON.regions.map(region => {
//         const { source, coordinates } = region;
//         if (!loading) {
//           if (profile.visited.indexOf(source) > -1) {
//             map.on("load", function () {
//               map.addSource(source, {
//                 type: "geojson",
//                 data: {
//                   type: "Feature",
//                   geometry: {
//                     type: "Polygon",
//                     coordinates: coordinates,
//                   },
//                 },
//               });
//               map.addLayer({
//                 id: source,
//                 type: "fill",
//                 source: source,
//                 layout: {},
//                 paint: {
//                   "fill-color": profile.fillColor,
//                   "fill-opacity": 0.5,
//                 },
//               });
//             });
//           }
//         }
//       });
//       return () => map.remove();
//     }
//   }, [profile]);

//   return (
//     <div className="max-w-6xl mx-auto p-5 landing-div">
//       <div className="map-container" ref={mapContainerRef} />

//       <Checklist />

//       {/* <Row className="justify-content-center">
//         <Col sm={{ size: "auto" }}>
//           <div className="sidebarStyle">
//             <div>
//               Longitude: {state.lng} | Latitude: {state.lat} | Zoom:{" "}
//               {state.zoom}
//             </div>
//           </div>
//         </Col>
//       </Row> */}
//     </div>
//   );
// };

function Mapbox() {
  const { profile, loading } = useSelector(state => state.profile);
  const { height, width } = useWindowDimensions();
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
    height: height * 0.5,
    latitude: 40,
    longitude: -92,
    zoom: 3,
  });

  if (!localStorage.getItem("isAuth")) return <Redirect to="/" />;

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-start h-screen">
          <h1 className="mt-5 font-light">Loading...</h1>
        </div>
      ) : (
        <div className="p-5 h-screen">
          <div className="map-container grid grid-cols-1 mb-3">
            <ReactMapGL
              {...viewport}
              mapStyle={`mapbox://styles/mapbox/${profile.mapStyle}`}
              onViewportChange={nextViewport => setViewport(nextViewport)}
              mapboxApiAccessToken={
                "pk.eyJ1IjoiY3NoYXR0bzk5IiwiYSI6ImNrZGR2bzN1cjRpbjcydHFyMThvczlzYTAifQ.unXf2zoBfeVM28V-tQSRPw"
              }
              className=" rounded-lg"
            >
              {sources}
            </ReactMapGL>
          </div>
          <Checklist />
        </div>
      )}
    </>
  );
}

export default Mapbox;
