import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timerLimitSetInMinutes: 25,
    minutes: 25,
    seconds: 0,
  }

  componentDidMount() {
    this.timerId = setInterval(this.updateTime, 1000)
  }

  componentWillUnmount() {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      clearInterval(this.timerId)
    }
  }

  onClickStartOrPauseButton = () => {
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onClickResetButton = () => {
    this.setState({
      isTimerRunning: false,
      timerLimitSetInMinutes: 25,
      minutes: 25,
      seconds: 0,
    })
  }

  updateTime = () => {
    const {isTimerRunning, minutes, seconds} = this.state
    if (isTimerRunning) {
      if (minutes <= 0 && seconds <= 0) {
        clearInterval(this.timerId)
        this.setState({isTimerRunning: false})
      }
      if (seconds <= 0 && !minutes <= 0) {
        this.setState(prevState => ({
          seconds: 60,
          minutes: prevState.minutes - 1,
        }))
      }
      this.setState(prevState => {
        if (prevState.minutes <= 0 && prevState.seconds <= 0) {
          return {seconds: prevState.seconds}
        }
        return {seconds: prevState.seconds - 1}
      })
    }
  }

  onClickDecreaseSetTime = () => {
    const {timerLimitSetInMinutes} = this.state
    if (timerLimitSetInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitSetInMinutes: prevState.timerLimitSetInMinutes - 1,
        minutes: prevState.minutes - 1,
      }))
    }
  }

  onClickIncreaseSetTime = () => {
    this.setState(prevState => ({
      timerLimitSetInMinutes: prevState.timerLimitSetInMinutes + 1,
      minutes: prevState.minutes + 1,
    }))
  }

  render() {
    const {
      isTimerRunning,
      timerLimitSetInMinutes,
      minutes,
      seconds,
    } = this.state
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return (
      <div className="app-bg-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="timer-display-card">
              <h1 className="timer-in-min-sec">
                {stringifiedMinutes}:{stringifiedSeconds}
              </h1>
              <p className="timer-status">
                {isTimerRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="timer-controllers-container">
            <div className="timer-start-pause-reset-controls-container">
              <button
                type="button"
                className="timer-controller-btn"
                onClick={this.onClickStartOrPauseButton}
              >
                <img
                  className="timer-control-icon"
                  src={
                    !isTimerRunning
                      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                  }
                  alt={!isTimerRunning ? 'play icon' : 'pause icon'}
                />
                <p className="btn-name">
                  {!isTimerRunning ? 'Start' : 'Pause'}
                </p>
              </button>
              <button
                type="button"
                className="timer-controller-btn"
                onClick={this.onClickResetButton}
              >
                <img
                  className="timer-control-icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <p className="btn-name">Reset</p>
              </button>
            </div>
            <p className="set-timer-limit">Set Timer Limit</p>
            <div className="timer-set-container">
              <button
                type="button"
                className="timer-set-btn"
                disabled={isTimerRunning}
                onClick={this.onClickDecreaseSetTime}
              >
                -
              </button>
              <p className="timer-set-in-minutes">{timerLimitSetInMinutes}</p>
              <button
                type="button"
                className="timer-set-btn"
                disabled={isTimerRunning}
                onClick={this.onClickIncreaseSetTime}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
