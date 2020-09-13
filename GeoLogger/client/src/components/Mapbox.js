import React, { Fragment, useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Col} from "reactstrap";
import mapboxgl from "mapbox-gl";
import geoJSON from "../json/geoJSON.json";
import "../css/mapbox.css";
import Checklist from "./Checklist";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY3NoYXR0bzk5IiwiYSI6ImNrZGR2bzN1cjRpbjcydHFyMThvczlzYTAifQ.unXf2zoBfeVM28V-tQSRPw";

const Mapbox = () => {
  const mapContainerRef = useRef(null);
  const { profile, loading } = useSelector(state => state.profile);

  const [state, setState] = useState({
    lng: -92,
    lat: 40,
    zoom: 3,
  });

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: `mapbox://styles/mapbox/${profile.mapStyle}`,
        center: [state.lng, state.lat],
        zoom: state.zoom,
      });

      geoJSON.regions.map(region => {
        const { source, coordinates } = region;
        if (!loading) {
          if (profile.visited.indexOf(source) > -1) {
            map.on("load", function () {
              map.addSource(source, {
                type: "geojson",
                data: {
                  type: "Feature",
                  geometry: {
                    type: "Polygon",
                    coordinates: coordinates,
                  },
                },
              });
              map.addLayer({
                id: source,
                type: "fill",
                source: source,
                layout: {},
                paint: {
                  "fill-color": profile.fillColor,
                  "fill-opacity": 0.5,
                },
              });
            });
          }
        }
      });
      return () => map.remove();
    }
  }, [profile]);

  return (
    <div className="">
      <Row className="justify-content-center">
        <div className="map-container" ref={mapContainerRef} />
      </Row>
      <Row className="justify-content-center mt-3">
        <Col sm={{ size: "auto" }}>
          <Checklist />
        </Col>
      </Row>

      {/* <Row className="justify-content-center">
        <Col sm={{ size: "auto" }}>
          <div className="sidebarStyle">
            <div>
              Longitude: {state.lng} | Latitude: {state.lat} | Zoom:{" "}
              {state.zoom}
            </div>
          </div>
        </Col>
      </Row> */}
    </div>
  );
};

export default Mapbox;
