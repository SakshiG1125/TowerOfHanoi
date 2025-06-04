"use client"

import "./Controls.css"

function Controls({ diskCount, speed, isPlaying, onDiskCountChange, onSpeedChange, onPlayPause, onReset }) {
  const handleDiskCountChange = (e) => {
    const count = Number.parseInt(e.target.value, 10)
    onDiskCountChange(count)
  }

  const handleSpeedChange = (e) => {
    const sliderValue = Number.parseInt(e.target.value, 10)
    const speedValue = 1100 - sliderValue * 100
    onSpeedChange(speedValue)
  }

  const sliderValue = Math.round((1100 - speed) / 100)

  return (
    <div className="controls">
      <div className="control-group">
        <label htmlFor="disk-count">Number of Disks:</label>
        <div className="disk-count-control">
          <input
            type="range"
            id="disk-count"
            min="3"
            max="8"
            value={diskCount}
            onChange={handleDiskCountChange}
            disabled={isPlaying}
          />
          <span className="disk-count-value">{diskCount}</span>
        </div>
        <div className="info">Minimum moves required: {Math.pow(2, diskCount) - 1}</div>
      </div>

      <div className="control-group">
        <label htmlFor="speed">Animation Speed:</label>
        <div className="speed-control">
          <span>Slow</span>
          <input type="range" id="speed" min="1" max="10" value={sliderValue} onChange={handleSpeedChange} />
          <span>Fast</span>
        </div>
      </div>

      <div className="control-buttons">
        <button className={`play-pause-button ${isPlaying ? "pause" : "play"}`} onClick={onPlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button className="reset-button" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default Controls
