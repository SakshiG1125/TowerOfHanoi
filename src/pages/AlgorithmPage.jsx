
"use client"

import { useState } from "react"
import "./AlgorithmPage.css"

function AlgorithmPage() {
  const [currentStep, setCurrentStep] = useState(0)

  // Example with 3 disks
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
    console.log(\`Move disk 1 from \${source} to \${target}\`);
    return;
  }
  
  // Move n-1 disks from source to auxiliary, using target as auxiliary
  hanoi(n-1, source, target, auxiliary);
  
  // Move the nth disk from source to target
  console.log(\`Move disk \${n} from \${source} to \${target}\`);
  
  // Move n-1 disks from auxiliary to target, using source as auxiliary
  hanoi(n-1, auxiliary, source, target);
}`}
            </code>
          </pre>
        </div>

        <h3>How the Algorithm Works</h3>
        <p>The recursive solution follows these steps:</p>
        <ol>
          <li>If there is only one disk, move it directly from the source to the target peg.</li>
          <li>
            Otherwise:
            <ol>
              <li>Move n-1 disks from the source to the auxiliary peg, using the target peg as a temporary storage.</li>
              <li>Move the largest disk from the source to the target peg.</li>
              <li>
                Move the n-1 disks from the auxiliary peg to the target peg, using the source peg as a temporary
                storage.
              </li>
            </ol>
          </li>
        </ol>

        <h3>Time Complexity</h3>
        <p>
          The time complexity of the Tower of Hanoi algorithm is O(2<sup>n</sup>), where n is the number of disks. This
          is because for n disks, we need exactly 2<sup>n</sup> - 1 moves to solve the puzzle.
        </p>
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
                          bottom: `${index * 25 + 10}px` /* Added 10px to raise disks above the base */,
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

        <div className="step-explanation">
          <h3>Explanation of the Solution</h3>
          <p>
            For 3 disks, the minimum number of moves required is 2<sup>3</sup> - 1 = 7 moves. The solution follows the
            recursive pattern described above:
          </p>
          <ol>
            <li>Move the n-1 (2) disks from A to B (this takes 3 moves)</li>
            <li>Move the largest disk from A to C</li>
            <li>Move the n-1 (2) disks from B to C (this takes 3 more moves)</li>
          </ol>
          <p>
            This pattern ensures that we never place a larger disk on top of a smaller one, and it guarantees that we
            solve the puzzle in the minimum number of moves.
          </p>
        </div>
      </section>
    </div>
  )
}

export default AlgorithmPage
