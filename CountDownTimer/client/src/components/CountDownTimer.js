import React, { Fragment, useState, useEffect } from 'react'
import { Button, Container, Row, Col } from 'reactstrap'
import { useSelector } from 'react-redux'
import moment from 'moment'
import EventModal from './EventModal'
import ModifyModal from './ModifyModal'

const CountDownTimer = () => {
  const [state, setState] = useState({
    days: undefined,
    hours: undefined,
    minutes: undefined,
    seconds: undefined
  })

  const { name, date, time, loading } = useSelector(state => state.timer)
  const then = moment(date + time, 'MM-DD-YYYY hh:mm:ss')
  useEffect(() => {
    setInterval(() => {

      const now = moment()
      const countdown = moment(then - now)
      const days = countdown.format('D')
      const hours = countdown.format('HH')
      const minutes = countdown.format('mm')
      const seconds = countdown.format('ss')
      setState({
        ...state,
        days,
        hours,
        minutes,
        seconds
      })
    }, 1000)
  })

  const { days, hours, minutes, seconds } = state

  return (
    <div className='timer'>
      {!name && <EventModal />}
      {name && date && !loading && (
        <Fragment>
          <Container className='text-center'>
            <Row className='m-3'>
              <Col><h1>Time until {name}</h1></Col>
            </Row>
            <Row>
              <Col>
                <h1>{days}</h1>
                <h5>Days</h5>
              </Col>
              <Col>
                <h1>{hours}</h1>
                <h5>Hours</h5>
              </Col>
              <Col>
                <h1>{minutes}</h1>
                <h5>Minutes</h5>
              </Col>
              <Col>
                <h1>{seconds}</h1>
                <h5>Seconds</h5>
              </Col>
            </Row>
          </Container>
        </Fragment>
      )}
      {name && <ModifyModal />}
    </div>
  )
}

export default CountDownTimer
