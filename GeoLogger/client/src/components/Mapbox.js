import React, { Fragment, useRef, useState, useEffect } from 'react'
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
import { updateFill } from '../store/mapbox'
import Checklist from './Checklist'

mapboxgl.accessToken = 'pk.eyJ1IjoiY3NoYXR0bzk5IiwiYSI6ImNrZGR2bzN1cjRpbjcydHFyMThvczlzYTAifQ.unXf2zoBfeVM28V-tQSRPw'

const Mapbox = () => {
  const mapContainerRef = useRef(null)
  const dispatch = useDispatch()
  const { visited, fillColor } = useSelector(state => state.mapbox)

  const [state, setState] = useState({
    lng: -92,
    lat: 40,
    zoom: 3,
    fillColor
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
      if(visited.indexOf(source) > -1) {
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
              'fill-color': fillColor,
              'fill-opacity': 0.5
            }
          })
        })
      }
    })

    return () => map.remove()
  }, [visited, fillColor])

  const onChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    dispatch(updateFill(state.fillColor))
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
      <Row className='align-items-center mt-3'>
        <Col>
          <Checklist />
        </Col>
        <Col className='text-center'>
          <Form onSubmit={e => onSubmit(e)}>
            <FormGroup>
              <Label className='text-light' for='fillColor'>Change Highlight</Label>
              <Input
                onChange={e => onChange(e)}
                type='text' id='fillColor'
                name='fillColor'
                placeholder='Change Highlight'
                value={state.fillColor}
              />
            </FormGroup>
            <Button color='dark' block>Save</Button>
            <p className='text-light'>
              Click{' '}
              <a
                className='std-link'
                href='https://htmlcolorcodes.com/color-picker/'
                target='_blank'
                rel="noopener noreferrer"
              >
                here
              </a>{' '}
              for hex color codes
            </p>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
}

export default Mapbox
