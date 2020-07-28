import React, { Fragment, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import EventModal from './EventModal'
import moment from 'moment'

const CountDownTimer = () => {


  const [time, setTime] = useState('')

  const [dateFields, setDateFields] = useState([])

  const [timeFields, setTimeFields] = useState([])

  const { timer } = useSelector(state => state.timer)

  useEffect(() => {
    setInterval(() => {
      setDateFields(moment().format('YYYY/MM/DD').split('/').map(num => {
        num.trim()
        return parseInt(num)
      }))

      setTimeFields(moment().format('hh:mm:ss').split(':').map(num => {
        num.trim()
        return parseInt(num)
      }))

      setTime(moment().format('hh:mm:ss'))
    }, 1000)
  })

  return (
    <div>
      <EventModal />
      {timer.date && timer.time ? (
        <Fragment>
          <p>Year | Month | Day</p>
          <p>{timer.date[0]}{' | '}{timer.date[1]}{' | '}{timer.date[2]}</p>
          <p>Hour | Minute | Second</p>
          <p>{timer.time[0]}{' | '}{timer.time[1]}{' | '}{timer.time[2]}</p>

          <p>{moment().to([timer.date[0], timer.date[1], timer.date[2]])}</p>

        </Fragment>
      ) : ''}
      <p>{dateFields[0]}</p>
      <p>{timeFields}</p>
    </div>
  )
}

export default CountDownTimer
