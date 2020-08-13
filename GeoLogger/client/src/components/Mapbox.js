import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import mapboxgl from 'mapbox-gl'
import geoJSON from '../json/geoJSON.json'
import '../css/mapbox.css'
import Checklist from './Checklist'

mapboxgl.accessToken = 'pk.eyJ1IjoiY3NoYXR0bzk5IiwiYSI6ImNrZGR2bzN1cjRpbjcydHFyMThvczlzYTAifQ.unXf2zoBfeVM28V-tQSRPw'

const Mapbox = () => {
  const mapContainerRef = useRef(null)
  const dispatch = useDispatch()
  const { profile } = useSelector(state => state.profile)

  const [state, setState] = useState({
    lng: -92,
    lat: 40,
    zoom: 3,
    fillColor: profile.fillColor
  })

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [state.lng, state.lat],
      zoom: state.zoom
    })

    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.on("moveend", () => {
      setState({
        ...state,
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      })
    })

    geoJSON.regions.map(region => {
      const { source, coordinates } = region
      if(profile.visited) {
        if(profile.visited.indexOf(source) > -1) {
          console.log('display' + source)
          map.on('load', function() {
            map.addSource(source, {
              'type': 'geojson',
              'data': {
                'type': 'Feature',
                'geometry': {
                  'type': 'Polygon',
                  'coordinates': coordinates
                }
              }
            })
            map.addLayer({
              'id': source,
              'type': 'fill',
              'source': source,
              'layout': {},
              'paint': {
                'fill-color': profile.fillColor,
                'fill-opacity': 0.5
              }
            })
          })
        }
      }

    })

    return () => map.remove()
  }, [profile.visited, profile.fillColor])

  const onChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    //dispatch(updateFill(state.fillColor))
  }

  return (
    <Fragment>
      <Row className='justify-content-center'>
        <Col sm={{size: 'auto'}}>
          <div className="sidebarStyle">
            <div>
              Longitude: {state.lng} | Latitude: {state.lat} | Zoom: {state.zoom}
            </div>
          </div>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <div className="map-container" ref={mapContainerRef} />
      </Row>
      <Row className='justify-content-center mt-3'>
        <Col sm={{size: 'auto'}}>
          <Checklist />
        </Col>
        <Col sm={{size: 'auto'}}>
          <Button color='dark' href='/settings'>
            Map Settings <i className="fa fa-cog" aria-hidden="true"></i>
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
}

export default Mapbox
