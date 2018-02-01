const ONE_DAY = 86400000
const HHMM = /^([0-1]?[0-9]|2[0-4]):?([0-5][0-9])$/
const zeroPad = n => String(Math.floor(n)).padStart(2, '0')
const saveTime = (x) => localStorage.setItem('end', JSON.stringify(x))
const getTime = (x) => JSON.parse(localStorage.getItem('end'))
const removeTime = () => localStorage.removeItem('end')

const clock = document.querySelector('#clock')
const endInput = document.querySelector('#end')
endInput.addEventListener('input', handleEndChange)

function handleEndChange(e) {
  let time = e.target.value
  if (time) {
    let m = time.match(HHMM)
    if (m) {
      let [hour, minute] = m.splice(1, 2)
      let ms = milliseconds(hour, minute)
      console.log(ms)
      saveTime(ms)
      resetDisplay()
      window.timer = createTimer(ms)
    }
    else {
      resetDisplay()
      removeTime()
    }
  }
}

function hourMinute() {
  let d = new Date(getTime())
  return [d.getHours(), d.getMinutes()].map(zeroPad).join(':')
}

function milliseconds(hour, minute) {
  let d = new Date()
  d.setHours(hour)
  d.setMinutes(minute)
  d.setSeconds(0)
  return d.valueOf()
}

function resetDisplay() {
  clearInterval(window.timer)
  clock.innerText = clock.dataset.default
}

function getTimeRemaining(later) {
  let diff = later - Date.now()

  if (diff < 0) {
    diff += ONE_DAY
  }
  else if (diff == 0) {
    clearInterval(window.timer)
  }

  diff /= 1000
  
  let hour = diff / 60 / 60
  let minute = (diff / 60) % 60
  let second = diff % 60

  return [hour, minute, second].map(zeroPad).join(':')
}

function createTimer(ms) {
  endInput.value = hourMinute()

  return setInterval(function() {
    clock.innerText = document.title = getTimeRemaining(new Date(ms))
  }, 1000)
}

(function() {
  window.time = getTime()
  if (window.time) {
    endInput.value = hourMinute()
    window.timer = createTimer(window.time)
  }
})()