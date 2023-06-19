import { useState } from "react";

import PortalGraph from "./components/PortalGraph";
import PortalGraph2 from "./components/PortalGraph2";

import './App.css'

function App() {
  let m = 6;
  return (
    <div className="app-container">
      {/* <SevenSegment x={xValue} y={yValue}/> */}
      <div className="abs-container">
        <div className="portal">
          <PortalGraph2 points={portals3} multiplyer={m} />


        </div>
        <div className="portal">
        <PortalGraph2 points={portals3} multiplyer={m} type={1}/>

        </div>
      </div>
    </div>
  );
}


const portals2 = [
  { ow: [-10599, 75, -1729], n: [-1326, 53, -222], name: 'MAIN' },
  { ow: [-10563, 65, -1697], n: [-1328, 45, -208], name: 'DYE' },
  { ow: [-10663, 33, -2417], n: [-1335, 61, -297], name: 'END' },
  { ow: [-10457, 72, -923], n: [-1303, 74, -115], name: 'CITY' },
  { ow: [-10164, 61, -1056], n: [-1267, 50, -132], name: 'INK' },
  { ow: [-10680, 56, -2171], n: [-1337, 56, -274], name: 'PAPER' },
  { ow: [-10672, 97, -2144], n: [-1335, 129, -268], name: 'R' },
  { ow: [], n: [-1322, 55, -117], name: 'OLD CITY' },

]

const portals3 = [
  { type: 'Overworld', coord: [-10599, 75, -1729], name: 'MAIN' },
  { type: 'Nether', coord: [-1326, 53, -222], name: 'MAIN' },
  { type: 'Overworld', coord: [-10563, 65, -1697], name: 'DYE' },
  { type: 'Nether', coord: [-1328, 45, -208], name: 'DYE' },
  { type: 'Overworld', coord: [-10663, 33, -2417], name: 'END' },
  { type: 'Nether', coord: [-1335, 61, -297], name: 'END' },
  { type: 'Overworld', coord: [-10457, 72, -923], name: 'CITY' },
  { type: 'Nether', coord: [-1303, 74, -115], name: 'CITY' },
  { type: 'Overworld', coord: [-10164, 61, -1056], name: 'INK' },
  { type: 'Nether', coord: [-1267, 50, -132], name: 'INK' },
  { type: 'Overworld', coord: [-10680, 56, -2171], name: 'PAPER' },
  { type: 'Nether', coord: [-1337, 56, -274], name: 'PAPER' },
  { type: 'Overworld', coord: [-10672, 97, -2144], name: 'R' },
  { type: 'Nether', coord: [-1335, 129, -268], name: 'R' },
  { type: 'Nether', coord: [-1322, 55, -117], name: 'OLD CITY' }
];



export default App;