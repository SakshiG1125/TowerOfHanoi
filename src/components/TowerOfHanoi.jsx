"use client"

import { useState, useEffect, useRef } from "react"
import "./TowerOfHanoi.css"

function TowerOfHanoi({ diskCount, speed, isPlaying, isReset }) {
  const [towers, setTowers] = useState([
    Array.from({ length: diskCount }, (_, i) => diskCount - i), // Source tower
    [], // Auxiliary tower
    [], // Target tower
  ])
  const [moves, setMoves] = useState([])
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1)
  const [isComplete, setIsComplete] = useState(false)
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  const animationRef = useRef(null)
  const [activeDisk, setActiveDisk] = useState(null)

  // Generate moves for Tower of Hanoi
  useEffect(() => {
    const generatedMoves = []

    function generateMoves(n, source, auxiliary, target) {
      if (n === 0) return

      // Move n-1 disks from source to auxiliary
      generateMoves(n - 1, source, target, auxiliary)

      // Move the nth disk from source to target
      generatedMoves.push({ from: source, to: target, disk: n })

      // Move n-1 disks from auxiliary to target
      generateMoves(n - 1, auxiliary, source, target)
    }

    // Start with disk numbers 1 to diskCount (smallest to largest)
    generateMoves(diskCount, 0, 1, 2)
    setMoves(generatedMoves)
    setCurrentMoveIndex(-1)
    setIsComplete(false)
    setShowCompletionModal(false)
  }, [diskCount])

  // Reset the towers when disk count changes or reset is triggered
  useEffect(() => {
    if (isReset) {
      setTowers([Array.from({ length: diskCount }, (_, i) => diskCount - i), [], []])
      setCurrentMoveIndex(-1)
      setIsComplete(false)
      setShowCompletionModal(false)
    }
  }, [diskCount, isReset])

  // Handle animation
  useEffect(() => {
    if (isPlaying && currentMoveIndex < moves.length - 1 && !isComplete) {
      animationRef.current = setTimeout(() => {
        const nextMoveIndex = currentMoveIndex + 1
        const { from: moveFrom, to: moveTo, disk } = moves[nextMoveIndex]
        setActiveDisk(disk)

        setTowers((prevTowers) => {
          // Create deep copy of towers
          const newTowers = prevTowers.map((tower) => [...tower])

          // Only move the top disk
          if (newTowers[moveFrom].length > 0) {
            const disk = newTowers[moveFrom].pop()

            // Check if this move is valid (smaller disk on larger disk or empty peg)
            const isValidMove = newTowers[moveTo].length === 0 || disk < newTowers[moveTo][newTowers[moveTo].length - 1]

            if (isValidMove) {
              newTowers[moveTo].push(disk)
            } else {
              // If invalid, put the disk back
              newTowers[moveFrom].push(disk)
              console.error("Invalid move attempted:", { disk, from: moveFrom, to: moveTo, towers: newTowers })
            }
          }

          return newTowers
        })

        setCurrentMoveIndex(nextMoveIndex)

        if (nextMoveIndex === moves.length - 1) {
          setIsComplete(true)
          // Show completion modal after a short delay
          setTimeout(() => {
            setShowCompletionModal(true)
          }, 1000)
        }
      }, speed)
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current)
      }
    }
  }, [isPlaying, currentMoveIndex, moves, speed, isComplete])

  const closeCompletionModal = () => {
    setShowCompletionModal(false)
  }

  return (
    <div className="tower-of-hanoi">
      <div className="towers-container">
        {towers.map((tower, towerIndex) => (
          <div key={towerIndex} className="tower">
            <div className="tower-label">Tower {String.fromCharCode(65 + towerIndex)}</div>
            <div className="pole"></div>
            <div className="base"></div>
            <div className="disks-container">
              {tower.map((diskSize, diskIndex) => (
                <div
                  key={`${towerIndex}-${diskIndex}-${diskSize}`}
                  className={`disk ${activeDisk === diskSize ? "active" : ""}`}
                  style={{
                    width: `${(diskSize / diskCount) * 80 + 20}%`,
                    backgroundColor: `hsl(${diskSize * 30}, 70%, 50%)`,
                    bottom: `${diskIndex * 25}px`,
                  }}
                >
                  {diskSize}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="status">
        {isComplete ? (
          <div className="complete-message">Puzzle solved in {moves.length} moves!</div>
        ) : (
          <div className="progress">
            Move: {currentMoveIndex + 1} / {moves.length}
          </div>
        )}
      </div>

      {showCompletionModal && (
        <div className="completion-modal-overlay">
          <div className="completion-modal">
            <h2>Congratulations!</h2>
            <p>You've successfully solved the Tower of Hanoi puzzle with {diskCount} disks.</p>
            <p>Total moves: {moves.length}</p>
            <p>Minimum possible moves: {Math.pow(2, diskCount) - 1}</p>
            <button onClick={closeCompletionModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TowerOfHanoi
