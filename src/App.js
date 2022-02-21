import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import dvd from './dvd.png'
const colors = ["#AD1EC2", "#D36EA6", "#D0BDD1", "#83BD16", "#16BDB1"];
const size = 180;
function App() {
  const container = useRef()
  const [box, setBox] = useState({
    color: 0,
    top: 0,
    left: 0,
    topDir: 1,
    leftDir: 1
  })
  const { color, top, left, topDir, leftDir } = box
  useEffect(() => {
    if (!container.current) return
    window.requestAnimationFrame(() => {
      const width = container.current.offsetWidth;
      const height = container.current.offsetHeight;
      if ((leftDir === 1 && left + size >= width) || (leftDir === -1 && left <= 0)) {
        setBox(val => ({ ...val, color: color + 1, leftDir: leftDir * -1 }))
      } else if ((topDir === 1 && top + size >= height) || (topDir === -1 && top <= 0)) {
        setBox(val => ({ ...val, color: color + 1, topDir: topDir * -1 }))

      } else {
        setBox(prev => ({ ...prev, top: top + topDir, left: left + leftDir }))
      }
    });
  }, [color, top, left, topDir, leftDir])

  return (
    <div className="App" ref={container}>
      <div className='hover-able-element' style={{ top, left, background: colors[color % colors?.length] }}>
        <img src={dvd} alt="DVD" />
      </div>
      <div className='hover-able-element' style={{ bottom: top, right: left, background: colors[(color + 1) % colors?.length] }}>
        <img src={dvd} alt="DVD" />
      </div>
    </div>
  );
}

export default App;
