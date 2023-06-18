import { useState } from "react";

import PortalGraph from "./components/PortalGraph";
import PortalGraphExit from "./components/PortalGraphExit";

import './App.css'

function App() {
  const [xValue, setXValue] = useState('0')
  const [yValue, setYValue] = useState('0')

  let m = 6;
  return (
    <div>
      {/* <SevenSegment x={xValue} y={yValue}/> */}
      <div className="abs-container">
        <div className="portal">
          <PortalGraph points={portals2} multiplyer={m} />
          

        </div>
        <div className="portal">
          {/* <PortalGraphExit points={portals} multiplyer={m}/> */}
          <PortalGraph points={portals2} multiplyer={m} type={1} />
        </div>
      </div>
    </div>
  );
}


const portals2 = [
  {ow: [-10599, 75, -1729], n: [-1326, 53, -222], name: 'MAIN'},
  {ow: [-10563, 65, -1697], n: [-1328, 45, -208], name: 'DYE'},
  {ow: [-10663, 33, -2417], n: [-1335, 61, -297], name: 'END'},
  {ow: [-10457, 72, -923], n: [-1303, 74, -115], name: 'CITY'},
  {ow: [-10164, 61, -1056], n:  [-1267, 50, -132], name: 'INK'},
  {ow: [-10680, 56, -2171], n:  [-1337, 56, -274], name: 'PAPER'},
  {ow: [-10672, 97, -2144], n:  [-1335, 129, -268], name: 'R'},


]





export default App;