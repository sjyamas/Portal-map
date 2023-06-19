import { useEffect } from "react";

export default function PortalGraph2({ points, multiplyer = 16, type = 0, title = '2rem', num = '1rem' }) {
    //type 0 = overword to nether, type 1 nether to overworld
    let padding, pad;
    pad = padding = 5
    let mult;
    let search;
    let bgColor = 'rgb(120, 120, 120)';
    let markerStart = '';
    let markerEnd = '';

    let norms;
    let largestX, largestZ;
    let norm;
    let line, minLine;

    let allOW, allNether;

    let { Nether: trueNether, Overworld: trueOW } = splitArrayByType(points);

    if (type === 0) {
        mult = multiplyer * 8
        search = 16
        bgColor = 'rgb(140, 120, 120)';
        markerEnd = "url(#arrow)";
        allOW = divOWCoords(trueOW)
        allNether = trueNether

    } else {
        mult = multiplyer
        search = 128
        pad = 8 * pad
        bgColor = 'rgb(120, 140, 120)';
        markerStart = "url(#arrow)"
        allNether = multNetherCoords(trueNether)
        allOW = trueOW
    }

    norms = findNormalize(allOW, allNether)
    largestX = norms.maxX - (norms.minX - pad)
    largestZ = norms.maxZ - (norms.minZ - pad)
    norm = { minX: norms.minX - pad, maxX: norms.maxX - pad, minZ: norms.minZ - pad, maxZ: norms.maxZ - pad }
    line = lines(allOW, allNether, search)
    minLine = minLines(allOW, allNether, search, type)

    // console.log('ye', allNether, allOW)
    // console.log('test', allNether, allOW, norms, largestX, largestZ)
    // console.log('minline', minLine)
    // console.log('inti', largestX, largestZ, mult, pad)

    return !minLine ? null : (
        <svg
            width={largestX * mult + pad * 50}
            height={largestZ * mult + pad * 50}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="5"
                    refY="5"
                    markerWidth="12"
                    markerHeight="6"
                    orient="auto-start-reverse">
                    <path d="M 0 0 L 15 5 L 0 10 z" stroke='cyan' fill='cyan' />
                </marker>
            </defs>
            {/* <g transform="scale(1)"> */}
            <line x1="0" y1="10" x2="5000" y2="10" stroke="blue" />


            <rect width={largestX * mult + padding * 50} height={largestZ * mult + padding * 50} fill={bgColor} />

            {minLine.map((p, v) =>
                <>
                    <line x1={((p.x1 - (norm.minX)) * mult)} y1={((p.z1 - (norm.minZ)) * mult)} x2={((p.x2 - (norm.minX)) * mult)} y2={((p.z2 - (norm.minZ)) * mult)} stroke="cyan" stroke-width="3" marker-end={markerEnd} marker-start={markerStart} />
                </>
            )}

            {line.map((p, v) =>
                <>
                    <line x1={((p.x1 - (norm.minX)) * mult)} y1={((p.z1 - (norm.minZ)) * mult)} x2={((p.x2 - (norm.minX)) * mult)} y2={((p.z2 - (norm.minZ)) * mult)} stroke="yellow" />
                    <text x={(((p.x1 - (norm.minX)) * mult) + ((p.x2 - (norm.minX)) * mult)) / 2} y={(((p.z1 - (norm.minZ)) * mult) + ((p.z2 - (norm.minZ)) * mult)) / 2} font-size={num}> {p.dis} </text>
                </>
            )}

            {allOW.map((p, v) =>
                <>
                    <circle cx={((p.coord[0] - (norm.minX)) * mult)} cy={((p.coord[2] - (norm.minZ)) * mult)} r="5" fill="green" />
                    <text x={((p.coord[0] - (norm.minX)) * mult) + 10} y={((p.coord[2] - (norm.minZ)) * mult + 10)} font-size={title}> {p.name} </text>
                    <text x={((p.coord[0] - (norm.minX)) * mult)} y={((p.coord[2] - (norm.minZ)) * mult + 25)} font-size={num}> {p.coord[0]}, {p.coord[1]}, {p.coord[2]} </text>

                </>
            )}

            {allNether.map((p, v) =>
                <>
                    <circle cx={((p.coord[0] - (norm.minX)) * mult)} cy={((p.coord[2] - (norm.minZ)) * mult)} r="5" fill="red" />
                    <text x={((p.coord[0] - (norm.minX)) * mult) + 10} y={((p.coord[2] - (norm.minZ)) * mult + 10)} font-size={title}> {p.name} </text>
                    <text x={((p.coord[0] - (norm.minX)) * mult)} y={((p.coord[2] - (norm.minZ)) * mult + 25)} font-size={num}> {p.coord[0]}, {p.coord[1]}, {p.coord[2]} </text>
                </>
            )}

            {/* <circle cx={(wid * mult)} cy={( hei * mult)} r="5" fill="yellow" />
                <circle cx={(500)} cy={(1050)} r="5" fill="yellow" /> */}

            {/* <line x1="0" y1="10" x2="5000" y2="10" stroke="blue" /> */}
            {/* </g> */}
        </svg>
    );
}


function findNormalize(setA, setB) {
    let minX = Math.min(...setA.map(d => d.coord[0]).concat(setB.map(d => d.coord[0])))
    let minZ = Math.min(...setA.map(d => d.coord[2]).concat(setB.map(d => d.coord[2])))

    let maxX = Math.max(...setA.map(d => d.coord[0]).concat(setB.map(d => d.coord[0])))
    let maxZ = Math.max(...setA.map(d => d.coord[2]).concat(setB.map(d => d.coord[2])))

    return { minX: minX, maxX: maxX, minZ: minZ, maxZ: maxZ }
}


function lines(setA, setB, search) {
    let pts = []; // [{x1: 0, z1: 0 x2: 0, z2: 0, dist}]

    for (let i = 0; i < setA.length; i++) {
        for (let j = 0; j < setB.length; j++) {
            let dis = eclid3(setA[i].coord, setB[j].coord)
            if (Math.abs(setA[i].coord[0] - setB[j].coord[0]) <= search && Math.abs(setA[i].coord[2] - setB[j].coord[2]) <= search) {
                pts.push({ x1: setA[i].coord[0], z1: setA[i].coord[2], x2: setB[j].coord[0], z2: setB[j].coord[2], dis: dis.toFixed(2) })
            }
        }
    }
    return pts
}

function normMin(ptA, ptB, type, units = 4) {
    if (type === 0) {
        units = units / 8
    }
    let dist = Math.sqrt((ptA[0] - ptB[0]) ** 2 + (ptA[1] - ptB[1]) ** 2)
    let dirX = ((ptA[0] - ptB[0]) / dist) * units
    let dirZ = ((ptA[1] - ptB[1]) / dist) * units
    let x1, x2, z1, z2;

    if (type === 1) {
        x1 = ptA[0] - dirX
        z1 = ptA[1] - dirZ
        x2 = ptB[0]
        z2 = ptB[1]
    } else {
        x1 = ptA[0]
        z1 = ptA[1]
        x2 = ptB[0] + dirX
        z2 = ptB[1] + dirZ
    }
    return { x1: x1, z1: z1, x2: x2, z2: z2 }
}

function minLines(setA, setB, search, type) {
    let pts = []; // [{x1: 0, z1: 0 x2: 0, z2: 0, dist}]
    let minPt;

    for (let i = 0; i < setA.length; i++) {
        let minDis = Infinity;
        for (let j = 0; j < setB.length; j++) {
            let dis = eclid3(setA[i].coord, setB[j].coord)
            if (Math.abs(setA[i].coord[0] - setB[j].coord[0]) <= search && Math.abs(setA[i].coord[2] - setB[j].coord[2]) <= search && minDis > dis) {
                minDis = dis
                let newPts = normMin([setA[i].coord[0], setA[i].coord[2]], [setB[j].coord[0], setB[j].coord[2]], type)
                // minPt = { x1: setA[i][0], z1: setA[i][2], x2: setB[j][0], z2: setB[j][2], dis: dis.toFixed(2) }
                minPt = { ...newPts, dis: dis.toFixed(2) }
            }
        }
        pts.push(minPt)
    }
    return pts
}

function eclid3(arr1, arr2) {
    return (Math.sqrt(((arr1[0] - arr2[0]) ** 2) + ((arr1[1] - arr2[1]) ** 2) + ((arr1[2] - arr2[2]) ** 2)))
}

function splitArrayByType(arr) {
    return arr.reduce((result, obj) => {
        const { type } = obj;

        // If the type array doesn't exist, create it
        if (!result[type]) {
            result[type] = [];
        }

        // Push the object into the respective type array
        result[type].push(obj);

        return result;
    }, {});
}

function multNetherCoords(arr) {
    let newArr = []
    arr.map((object) => {
        let obj = Object.create(object)
        const [x, y, z] = obj.coord;
        obj.coord = [x * 8, y, z * 8];
        newArr.push(obj)
    });
    return newArr;
}

function divOWCoords(arr) {
    let newArr = []
    arr.map((object) => {
        let obj = Object.create(object)
        const [x, y, z] = obj.coord;
        obj.coord = [Math.floor((x / 8)), y, Math.floor((z / 8))];
        newArr.push(obj)
    });
    return newArr;
}