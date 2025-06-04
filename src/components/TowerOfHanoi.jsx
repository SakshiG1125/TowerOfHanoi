"use client"

import { useState, useEffect, useRef } from "react"
import "./TowerOfHanoi.css"

function TowerOfHanoi({ diskCount, speed, isPlaying }) {
  const [towers, setTowers] = useState([Array.from({ length: diskCount }, (_, i) => diskCount - i), [], []])
  const [moves, setMoves] = useState([])
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1)
  const [isComplete, setIsComplete] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const timeoutRef = useRef(null)

  // Generate moves
  useEffect(() => {
    const generatedMoves = []

    function generateMoves(n, source, auxiliary, target) {
      if (n === 0) return
      generateMoves(n - 1, source, target, auxiliary)
      generatedMoves.push({ from: source, to: target, disk: n })
      generateMoves(n - 1, auxiliary, source, target)
    }

    generateMoves(diskCount, 0, 1, 2)
    setMoves(generatedMoves)
    setCurrentMoveIndex(-1)
    setIsComplete(false)
    setShowModal(false)
    setTowers([Array.from({ length: diskCount }, (_, i) => diskCount - i), [], []])
  }, [diskCount])

  // Handle animation
  useEffect(() => {
    if (isPlaying && currentMoveIndex < moves.length - 1 && !isComplete) {
      timeoutRef.current = setTimeout(() => {
        const nextIndex = currentMoveIndex + 1
        const move = moves[nextIndex]

        setTowers((prevTowers) => {
          const newTowers = prevTowers.map((tower) => [...tower])
          if (newTowers[move.from].length > 0) {
            const disk = newTowers[move.from].pop()
            newTowers[move.to].push(disk)
          }
          return newTowers
        })

        setCurrentMoveIndex(nextIndex)

        if (nextIndex === moves.length - 1) {
          setIsComplete(true)
          setTimeout(() => setShowModal(true), 500)
        }
      }, speed)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isPlaying, currentMoveIndex, moves, speed, isComplete])

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
                  className="disk"
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

      {showModal && (
        <div className="completion-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="completion-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Congratulations!</h2>
            <p>You solved the Tower of Hanoi puzzle with {diskCount} disks!</p>
            <p>Total moves: {moves.length}</p>
            <p>Minimum possible: {Math.pow(2, diskCount) - 1}</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TowerOfHanoi
