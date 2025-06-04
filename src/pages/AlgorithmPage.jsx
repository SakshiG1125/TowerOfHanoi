"use client"

import { useState } from "react"
import "./AlgorithmPage.css"

function AlgorithmPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { description: "Initial state: All 3 disks are on peg A.", pegs: { A: [3, 2, 1], B: [], C: [] } },
    { description: "Move disk 1 from peg A to peg C.", pegs: { A: [3, 2], B: [], C: [1] } },
    { description: "Move disk 2 from peg A to peg B.", pegs: { A: [3], B: [2], C: [1] } },
    { description: "Move disk 1 from peg C to peg B.", pegs: { A: [3], B: [2, 1], C: [] } },
    { description: "Move disk 3 from peg A to peg C.", pegs: { A: [], B: [2, 1], C: [3] } },
    { description: "Move disk 1 from peg B to peg A.", pegs: { A: [1], B: [2], C: [3] } },
    { description: "Move disk 2 from peg B to peg C.", pegs: { A: [1], B: [], C: [3, 2] } },
    { description: "Move disk 1 from peg A to peg C.", pegs: { A: [], B: [], C: [3, 2, 1] } },
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetSteps = () => {
    setCurrentStep(0)
  }

  return (
    <div className="algorithm-page">
      <h1>The Tower of Hanoi Algorithm</h1>

      <section className="algorithm-explanation">
        <h2>Recursive Solution</h2>
        <p>
          The Tower of Hanoi puzzle can be solved efficiently using recursion. The recursive algorithm breaks down the
          problem into smaller sub-problems:
        </p>

        <div className="code-block">
          <pre>
            <code>
              {`function hanoi(n, source, auxiliary, target) {
  if (n === 1) {
    console.log('Move disk 1 from ' + source + ' to ' + target);
    return;
  }
  
  // Move n-1 disks from source to auxiliary
  hanoi(n-1, source, target, auxiliary);
  
  // Move the nth disk from source to target
  console.log('Move disk ' + n + ' from ' + source + ' to ' + target);
  
  // Move n-1 disks from auxiliary to target
  hanoi(n-1, auxiliary, source, target);
}`}
            </code>
          </pre>
        </div>

        <h3>How the Algorithm Works</h3>
        <ol>
          <li>If there is only one disk, move it directly from source to target.</li>
          <li>
            Otherwise:
            <ol>
              <li>Move n-1 disks from source to auxiliary peg.</li>
              <li>Move the largest disk from source to target peg.</li>
              <li>Move the n-1 disks from auxiliary to target peg.</li>
            </ol>
          </li>
        </ol>
      </section>

      <section className="step-by-step">
        <h2>Step-by-Step Example (3 Disks)</h2>

        <div className="visualization">
          <div className="pegs-container">
            {["A", "B", "C"].map((pegName) => (
              <div key={pegName} className="peg-wrapper">
                <div className="peg-label">Peg {pegName}</div>
                <div className="peg">
                  <div className="disks-stack">
                    {steps[currentStep].pegs[pegName].map((diskSize, index) => (
                      <div
                        key={diskSize}
                        className="disk"
                        style={{
                          width: `${diskSize * 30 + 30}px`,
                          backgroundColor: `hsl(${diskSize * 30}, 70%, 50%)`,
                          bottom: `${index * 25 + 10}px`,
                        }}
                      >
                        {diskSize}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="step-description">
            <p>
              <strong>
                Step {currentStep + 1} of {steps.length}:
              </strong>{" "}
              {steps[currentStep].description}
            </p>
          </div>

          <div className="step-controls">
            <button onClick={prevStep} disabled={currentStep === 0}>
              Previous
            </button>
            <button onClick={resetSteps}>Reset</button>
            <button onClick={nextStep} disabled={currentStep === steps.length - 1}>
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AlgorithmPage
