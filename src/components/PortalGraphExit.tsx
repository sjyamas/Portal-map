export default function PortalGraphExit({ points, multiplyer, title='2rem', num='1rem'}) {
    let norm = findNormalize(points)
    // console.log('points', points)
    // console.log('norm', norm)

    let wid = norm.maxX - norm.minX
    let hei = norm.maxZ - norm.minZ

    let allOW = points.map(d => (d[0])).filter(c => c.length > 0) //array of all ow pts
    let allNether = points.map(d => toOw(d[1])).filter(c => c.length > 0) //array of all nether pts
    let names = points.map(d => d[2])

    // console.log('pts', allOW, allNether)
    let mult = multiplyer

    // console.log('get', wid * mult, hei * mult)

    let line = lines(allOW, allNether)
    let minLine = minLines(allOW, allNether)

    console.log('lines', line)
    // console.log('jEFF', ((p[0] - (norm.minX)) * mult), ((p[2] - (norm.minZ)) * mult));
    return (
        <svg
            width={wid * mult + 500}
            height={hei * mult + 500}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="5"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
            </defs>

            <rect width={wid * mult + 500} height={hei * mult + 500} fill="grey" />

            {allOW.map((p, v) =>
                <>
                    <circle cx={((p[0] - (norm.minX)) * mult)} cy={((p[2] - (norm.minZ)) * mult)} r="5" fill="green" />
                    <text x={((p[0] - (norm.minX)) * mult)} y={((p[2] - (norm.minZ)) * mult + 10)} font-size={title}> {names[v]} </text>
                    <text x={((p[0] - (norm.minX)) * mult)} y={((p[2] - (norm.minZ)) * mult + 25)} font-size={num}> {allOW[v][0]}, {allOW[v][1]}, {allOW[v][2]} </text>

                </>
            )}
            {allNether.map((p, v) =>
                <>
                    <circle cx={((p[0] - (norm.minX)) * mult)} cy={((p[2] - (norm.minZ)) * mult)} r="5" fill="red" />
                    <text x={((p[0] - (norm.minX)) * mult)} y={((p[2] - (norm.minZ)) * mult + 10)} font-size={title}> {names[v]} </text>
                    <text x={((p[0] - (norm.minX)) * mult)} y={((p[2] - (norm.minZ)) * mult + 25)} font-size={num}> {allNether[v][0]}, {allNether[v][1]}, {allNether[v][2]} </text>
                </>
            )}

            {line.map((p, v) =>
                <>
                    <line x1={((p.x1 - (norm.minX)) * mult)} y1={((p.z1 - (norm.minZ)) * mult)} x2={((p.x2 - (norm.minX)) * mult)} y2={((p.z2 - (norm.minZ)) * mult)} stroke="yellow" />
                    <text x={(((p.x1 - (norm.minX)) * mult) + ((p.x2 - (norm.minX)) * mult)) / 2} y={(((p.z1 - (norm.minZ)) * mult) + ((p.z2 - (norm.minZ)) * mult)) / 2} font-size={num}> {p.dis} </text>
                </>
            )}

            {minLine.map((p, v) =>
                <>
                    <line x1={((p.x1 - (norm.minX)) * mult)} y1={((p.z1 - (norm.minZ)) * mult)} x2={((p.x2 - (norm.minX)) * mult)} y2={((p.z2 - (norm.minZ)) * mult)} stroke="cyan" marker-start="url(#arrow)"/>
                    <text x={(((p.x1 - (norm.minX)) * mult) + ((p.x2 - (norm.minX)) * mult)) / 2} y={(((p.z1 - (norm.minZ)) * mult) + ((p.z2 - (norm.minZ)) * mult)) / 2} font-size={num}> {p.dis} </text>
                </>
            )}

            {/* <circle cx={(wid * mult)} cy={( hei * mult)} r="5" fill="yellow" />
                <circle cx={(500)} cy={(1050)} r="5" fill="yellow" /> */}

            {/* <line x1="0" y1="10" x2="5000" y2="10" stroke="blue" /> */}
            {points}
        </svg>


    );
}

function toOw(pt) {
    return ([pt[0] * 8, pt[1], pt[2] * 8])

}


function findNormalize(points: any) {
    let pad = 5 * 8
    let allOW = points.map(d => (d[0])).filter(c => c.length > 0) //array of all ow pts
    let allNether = points.map(d => toOw(d[1])).filter(c => c.length > 0) //array of all nether pts
    // console.log("allOW", allOW, "   allNether", allNether)
    // console.log('this', allOW.map(d => d[0]).concat(allNether.map(d => d[0])))


    let minX = Math.min(...allOW.map(d => d[0]).concat(allNether.map(d => d[0])))
    let minZ = Math.min(...allOW.map(d => d[2]).concat(allNether.map(d => d[2])))

    let maxX = Math.max(...allOW.map(d => d[0]).concat(allNether.map(d => d[0])))
    let maxZ = Math.max(...allOW.map(d => d[2]).concat(allNether.map(d => d[2])))
    console.log('tf', [minX, minZ, maxX, maxZ])

    // return [[minX, maxX,], [minZ, maxZ]]
    return { minX: minX - pad, maxX: maxX - pad, minZ: minZ - pad, maxZ: maxZ - pad }
}


function lines(setA, setB) {
    let pts = []; // [{x1: 0, z1: 0 x2: 0, z2: 0, dist}]

    for (let i = 0; i < setA.length; i++) {
        for (let j = 0; j < setB.length; j++) {
            let dis = eclid3(setA[i], setB[j])
            if (dis < 175) {
                pts.push({ x1: setA[i][0], z1: setA[i][2], x2: setB[j][0], z2: setB[j][2], dis: dis.toFixed(2) })
            }
        }
    }
    return pts
}

function minLines(setA, setB) {
    let pts = []; // [{x1: 0, z1: 0 x2: 0, z2: 0, dist}]
    let minPt;

    for (let i = 0; i < setA.length; i++) {
        let minDis = Infinity;
        for (let j = 0; j < setB.length; j++) {
            let dis = eclid3(setA[i], setB[j])
            if (dis < 175 && minDis > dis) {
                minDis = dis
                minPt = { x1: setA[i][0], z1: setA[i][2], x2: setB[j][0], z2: setB[j][2], dis: dis.toFixed(2) }
            }
        }
        pts.push(minPt)
    }
    return pts
}

function eclid3(arr1, arr2) {
    return (Math.sqrt(((arr1[0] - arr2[0]) ** 2) + ((arr1[1] - arr2[1]) ** 2) + ((arr1[2] - arr2[2]) ** 2)))
}