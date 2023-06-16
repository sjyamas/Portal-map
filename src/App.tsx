import { useState } from "react";
import SevenSegment from "./components/SevenSegment";

import {
  rootStyle,
  flexRow,
  flexCol,
  container,
  label,
} from "./global/globalStyles";
import PortalGraph from "./components/PortalGraph";
import PortalGraphExit from "./components/PortalGraphExit";

import './App.css'

function App() {
  const [xValue, setXValue] = useState('0')
  const [yValue, setYValue] = useState('0')

  let m = 2;
  return (
    <div>
      <input type="range" min='0' max='1000' onChange={(e) => setXValue(e.target.value)} />
      <p>X value: {xValue}</p>

      <input type="range" min='0' max='1000' onChange={(e) => setYValue(e.target.value)} />
      <p>Y value: {yValue}</p>
      {/* <SevenSegment x={xValue} y={yValue}/> */}
      <div className="abs-container">
        <div className="abs-container">
          <PortalGraph points={portals} multiplyer={m} />
        </div>
        <div className="abs-container">
          <PortalGraphExit points={portals} multiplyer={m}/>
        </div>
        
        

      </div>
    </div>
  );
}

const portals = [
  [[-10599, 75, -1729], [-1326, 53, -222], 'MAIN'],
  [[-10563, 65, -1697], [-1328, 45, -208], 'DYE'],
  [[-10663, 33, -2417], [-1335, 61, -297], 'end'],
  [[-10457, 72, -923], [-1303, 74, -115], 'city'],
  [[-10164, 61, -1056], [-1267, 50, -132], 'ink'],
]








export default App;