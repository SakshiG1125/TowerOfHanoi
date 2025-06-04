"use client"

import { useState } from "react"
import TowerOfHanoi from "../components/TowerOfHanoi"
import Controls from "../components/Controls"
import "./PlayPage.css"

function PlayPage() {
  const [diskCount, setDiskCount] = useState(3)
  const [speed, setSpeed] = useState(500) // milliseconds per move
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReset, setIsReset] = useState(false)

  const handleDiskCountChange = (count) => {
    if (!isPlaying) {
      setDiskCount(count)
      setIsReset(true)
      setTimeout(() => setIsReset(false), 100)
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
    setIsReset(true)
    setTimeout(() => setIsReset(false), 100)
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
              <li>
                Each move consists of taking the upper disk from one of the stacks and placing it on top of another
                stack or on an empty rod.
              </li>
              <li>No disk may be placed on top of a smaller disk.</li>
            </ol>
          </div>
        </div>

        <div className="visualization-container">
          <TowerOfHanoi diskCount={diskCount} speed={speed} isPlaying={isPlaying} isReset={isReset} />
        </div>
      </div>

      <div className="explanation">
        <h3>How It Works</h3>
        <p>
          The visualization above shows the Tower of Hanoi puzzle with {diskCount} disks. The goal is to move all disks
          from the leftmost peg to the rightmost peg, following these rules:
        </p>
        <ol>
          <li>
            <strong>One Disk at a Time:</strong> You can only move one disk at a time.
          </li>
          <li>
            <strong>Top Disk Only:</strong> You can only move the top disk of any stack.
          </li>
          <li>
            <strong>No Larger on Smaller:</strong> You cannot place a larger disk on top of a smaller disk.
          </li>
        </ol>
        <p>
          The solution shown uses a recursive algorithm that solves the puzzle in the minimum number of moves: 2
          <sup>{diskCount}</sup> - 1 = {Math.pow(2, diskCount) - 1} moves.
        </p>
      </div>
    </div>
  )
}

export default PlayPage
