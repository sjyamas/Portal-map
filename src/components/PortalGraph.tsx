export default function PortalGraph({ points, multiplyer = 16, type = 0, title = '2rem', num = '1rem' }) {
    //type 0 = overword to nether, type 1 nether to overworld
    let padding;
    let pad;
    pad = padding = 5
    let mult;
    let search;
    let Nether = false;
    let Overworld = false;
    let bgColor = 'rgb(120, 120, 120)';
    let markerStart = '';
    let markerEnd = '';

    if (type === 0) {
        mult = multiplyer * 8
        search = 16
        Nether = true
        bgColor = 'rgb(140, 120, 120)';
        markerEnd = "url(#arrow)";
    } else {
        mult = multiplyer
        search = 128
        pad = 8 * pad
        Overworld = true
        bgColor = 'rgb(120, 140, 120)';
        markerStart = "url(#arrow)"
    }

    let allOW = points.map(d => toNether(d.ow, Nether)).filter(c => c.length > 0) //array of all ow pts
    let allNether = points.map(d => toOW(d.n, Overworld)).filter(c => c.length > 0) //array of all nether pts
    let names = points.map(d => d.name)

    let norms = findNormalize(allOW, allNether)
    let largestX = norms.maxX - (norms.minX - pad)
    let largestZ = norms.maxZ - (norms.minZ - pad)

    let norm = { minX: norms.minX - pad, maxX: norms.maxX - pad, minZ: norms.minZ - pad, maxZ: norms.maxZ - pad }

    let line = lines(allOW, allNether, search)
    let minLine = minLines(allOW, allNether, search, type)

    return (
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
                    <circle cx={((p[0] - (norm.minX)) * mult)} cy={((p[2] - (norm.minZ)) * mult)} r="5" fill="green" />
                    <text x={((p[0] - (norm.minX)) * mult) + 10} y={((p[2] - (norm.minZ)) * mult + 10)} font-size={title}> {names[v]} </text>
                    <text x={((p[0] - (norm.minX)) * mult)} y={((p[2] - (norm.minZ)) * mult + 25)} font-size={num}> {allOW[v][0]}, {allOW[v][1]}, {allOW[v][2]} </text>

                </>
            )}
            {allNether.map((p, v) =>
                <>
                    <circle cx={((p[0] - (norm.minX)) * mult)} cy={((p[2] - (norm.minZ)) * mult)} r="5" fill="red" />
                    <text x={((p[0] - (norm.minX)) * mult) + 10} y={((p[2] - (norm.minZ)) * mult + 10)} font-size={title}> {names[v]} </text>
                    <text x={((p[0] - (norm.minX)) * mult)} y={((p[2] - (norm.minZ)) * mult + 25)} font-size={num}> {allNether[v][0]}, {allNether[v][1]}, {allNether[v][2]} </text>
                </>
            )}

            {/* <circle cx={(wid * mult)} cy={( hei * mult)} r="5" fill="yellow" />
                <circle cx={(500)} cy={(1050)} r="5" fill="yellow" /> */}

            {/* <line x1="0" y1="10" x2="5000" y2="10" stroke="blue" /> */}
            {/* </g> */}
        </svg>
    );
}



function toNether(pt, t) {
    if (pt.length === 0) {
        return []
    }
    if (t) {
        return ([Math.floor(pt[0] / 8), pt[1], Math.floor(pt[2] / 8)])
    } else {
        return ([pt[0], pt[1], pt[2]])
    }

}

function toOW(pt, t) {
    if (pt.length === 0) {
        return []
    }
    if (t) {
        return ([pt[0] * 8, pt[1], pt[2] * 8])
    } else {
        return ([pt[0], pt[1], pt[2]])
    }
}


function findNormalize(setA, setB, pad = 5) {
    let minX = Math.min(...setA.map(d => d[0]).concat(setB.map(d => d[0])))
    let minZ = Math.min(...setA.map(d => d[2]).concat(setB.map(d => d[2])))

    let maxX = Math.max(...setA.map(d => d[0]).concat(setB.map(d => d[0])))
    let maxZ = Math.max(...setA.map(d => d[2]).concat(setB.map(d => d[2])))

    return { minX: minX, maxX: maxX, minZ: minZ, maxZ: maxZ }
}


function lines(setA, setB, search) {
    let pts = []; // [{x1: 0, z1: 0 x2: 0, z2: 0, dist}]

    for (let i = 0; i < setA.length; i++) {
        for (let j = 0; j < setB.length; j++) {
            let dis = eclid3(setA[i], setB[j])
            if (Math.abs(setA[i][0] - setB[j][0]) <= search && Math.abs(setA[i][2] - setB[j][2]) <= search) {
                pts.push({ x1: setA[i][0], z1: setA[i][2], x2: setB[j][0], z2: setB[j][2], dis: dis.toFixed(2) })
            }
        }
    }
    return pts
}

// if setA[i][0] setB[i][0]

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
            let dis = eclid3(setA[i], setB[j])
            if (Math.abs(setA[i][0] - setB[j][0]) <= search && Math.abs(setA[i][2] - setB[j][2]) <= search && minDis > dis) {
                minDis = dis
                let newPts = normMin([setA[i][0], setA[i][2]], [setB[j][0], setB[j][2]], type)
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