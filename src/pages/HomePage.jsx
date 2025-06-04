import { Link } from "react-router-dom"
import "./HomePage.css"

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Tower of Hanoi</h1>
        <p>An ancient mathematical puzzle and its elegant solution</p>
        <Link to="/play" className="cta-button">
          Try It Yourself
        </Link>
      </section>

      <section className="info-section">
        <h2>History</h2>
        <p>
          The Tower of Hanoi is a mathematical puzzle that was invented by the French mathematician Édouard Lucas in
          1883. It is associated with a legend of a temple in Hanoi, Vietnam, where monks were given the task of moving
          64 golden disks from one peg to another, following specific rules. According to the legend, once they complete
          the task, the world will end.
        </p>

        <h2>Mathematical Background</h2>
        <p>The Tower of Hanoi puzzle has deep connections to several mathematical concepts:</p>
        <ul>
          <li>
            <strong>Recursive Problem Solving:</strong> The Tower of Hanoi is a classic example of a problem that can be
            solved using recursion.
          </li>
          <li>
            <strong>Binary Numbers:</strong> The states of the puzzle can be represented using binary numbers, with each
            bit representing the position of a disk.
          </li>
          <li>
            <strong>Exponential Complexity:</strong> The minimum number of moves required to solve the puzzle with n
            disks is 2<sup>n</sup> - 1.
          </li>
        </ul>

        <h2>Significance</h2>
        <p>The Tower of Hanoi puzzle is significant in computer science and mathematics for several reasons:</p>
        <ul>
          <li>It serves as an excellent introduction to recursive algorithms.</li>
          <li>It demonstrates how complex problems can be broken down into simpler sub-problems.</li>
          <li>It illustrates the concept of exponential growth in algorithm complexity.</li>
          <li>It's used in cognitive psychology to study problem-solving abilities.</li>
        </ul>

        <div className="action-links">
          <Link to="/play" className="action-link">
            Try the Interactive Visualization
          </Link>
          <Link to="/algorithm" className="action-link">
            Learn About the Algorithm
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
