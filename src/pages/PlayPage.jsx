"use client"

import { useState } from "react"
import TowerOfHanoi from "../components/TowerOfHanoi"
import Controls from "../components/Controls"
import "./PlayPage.css"

function PlayPage() {
  const [diskCount, setDiskCount] = useState(3)
  const [speed, setSpeed] = useState(500)
  const [isPlaying, setIsPlaying] = useState(false)
  const [resetKey, setResetKey] = useState(0)

  const handleDiskCountChange = (count) => {
    if (!isPlaying) {
      setDiskCount(count)
      setResetKey((prev) => prev + 1)
    }
  }

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setResetKey((prev) => prev + 1)
  }

  return (
    <div className="play-page">
      <h1>Tower of Hanoi Interactive Visualization</h1>

      <div className="play-container">
        <div className="controls-container">
          <Controls
            diskCount={diskCount}
            speed={speed}
            isPlaying={isPlaying}
            onDiskCountChange={handleDiskCountChange}
            onSpeedChange={handleSpeedChange}
            onPlayPause={handlePlayPause}
            onReset={handleReset}
          />

          <div className="rules">
            <h3>Rules:</h3>
            <ol>
              <li>Only one disk can be moved at a time.</li>
              <li>Each move consists of taking the upper disk from one stack and placing it on another.</li>
              <li>No disk may be placed on top of a smaller disk.</li>
            </ol>
          </div>
        </div>

        <div className="visualization-container">
          <TowerOfHanoi key={resetKey} diskCount={diskCount} speed={speed} isPlaying={isPlaying} />
        </div>
      </div>

      <div className="explanation">
        <h3>How It Works</h3>
        <p>
          The visualization shows the Tower of Hanoi puzzle with {diskCount} disks. The goal is to move all disks from
          the leftmost peg to the rightmost peg following the rules above.
        </p>
        <p>
          The solution uses a recursive algorithm that solves the puzzle in the minimum number of moves: 2
          <sup>{diskCount}</sup> - 1 = {Math.pow(2, diskCount) - 1} moves.
        </p>
      </div>
    </div>
  )
}

export default PlayPage
