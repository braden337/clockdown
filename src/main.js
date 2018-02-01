import { DateTime } from 'luxon'

const hms = ['hours', 'minutes', 'seconds']
const hhmm = /^([0-1]?[0-9]|2[0-4]):?([0-5][0-9])$/;
const zeroPad = n => String(Math.floor(n)).padStart(2, '0')

const clockOutput = document.querySelector('#clock')
const stopTimeInput = document.querySelector('#stopTime')

let clockInterval = null

stopTimeInput.addEventListener('keyup', function(e) {
  let m = e.target.value.match(hhmm)
  if (m) {
    clearInterval(clockInterval)
    let [hour, minute] = m.splice(1, 2).map(Number)
    localStorage.setItem('stopTime', JSON.stringify({hour, minute}))
    clockInterval = setInterval(getClock, 1000)
  }
  else {
    localStorage.removeItem('stopTime')
  }
})

stopTimeInput.focus()

function getClock() {
  let stopTime = JSON.parse(localStorage.getItem('stopTime'))
  stopTime.second = 0
  let later = DateTime.fromObject(stopTime)
  let { hours, minutes, seconds } = DateTime.local().until(later).toDuration(hms)
  clockOutput.innerText = [hours, minutes, seconds].map(zeroPad).join(':')
}