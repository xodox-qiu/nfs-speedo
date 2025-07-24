let elements = {};
let speed = 0;

function polarToCartesian(cx, cy, r, angleDeg) {
    const angleRad = (angleDeg - 90) * Math.PI / 180.0;
    return {
        x: cx + r * Math.cos(angleRad),
        y: cy + r * Math.sin(angleRad)
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? "0" : "1";

    return [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
}

function setSpeedoArc(percent) {
    percent = Math.max(0, Math.min(1, percent));

    const centerX = 100;
    const centerY = 100;
    const radius = 87;
    const arcStart = 175;
    const arcSweep = 480;

    const arcEnd = arcStart + (arcSweep * percent);

    const path = describeArc(centerX, centerY, radius, arcStart, arcEnd);
    document.getElementById("speedoArcBg").setAttribute("d", path);
}
setSpeedoArc(0.5);

function createTicks() {
    const ticksContainer = document.querySelector('.ticks');
    const tickCount = 10;
    
    for (let i = 0; i < tickCount; i++) {
        const tick = document.createElement('div');
        tick.className = 'tick';
        const angle = (i / (tickCount - 1)) * 222 - 114;
        tick.style.transform = `rotate(${angle}deg) translateY(-131px)`;
        ticksContainer.appendChild(tick);
    }
}
createTicks();

function createSmallTicks() {
    const ticksContainer = document.querySelector('.smallticks');
    const tickCount = 8;
    
    for (let i = 0; i < tickCount; i++) {
        const tick = document.createElement('div');
        tick.className = 'smalltick';
        const angle = (i / (tickCount - 1)) * 200 - 100;
        tick.style.transform = `rotate(${angle}deg) translateY(-52px)`;
        ticksContainer.appendChild(tick);
    }
}
createSmallTicks();

function setInsideArc(percent) {
    percent = Math.max(0, Math.min(1, percent));

    const centerX = 101;
    const centerY = 100;
    const radius = 40;
    const arcStart = 205;
    const arcSweep = 400;

    const arcEnd = arcStart + (arcSweep * percent);

    const path = describeArc(centerX, centerY, radius, arcStart, arcEnd);
    document.getElementById("insideArcBg").setAttribute("d", path);
}
setInsideArc(0.5);  

function setInsideIIArc(percent) {
    percent = Math.max(0, Math.min(1, percent));

    const centerX = 101;
    const centerY = 100;
    const radius = 30;
    const arcStart = 205;
    const arcSweep = 400;

    const arcEnd = arcStart + (arcSweep * percent);

    const path = describeArc(centerX, centerY, radius, arcStart, arcEnd);
    document.getElementById("inside2ArcBg").setAttribute("d", path);
}
setInsideIIArc(0.5); 

function setSmallArc(percent) {
    percent = Math.max(0, Math.min(1, percent));

    const centerX = 100;
    const centerY = 100;
    const radius = 57;
    const arcStart = 165;
    const arcSweep = 410;

    const arcEnd = arcStart + (arcSweep * percent);

    const path = describeArc(centerX, centerY, radius, arcStart, arcEnd);
    document.getElementById("smallArcBg").setAttribute("d", path);
}
setSmallArc(0.5);

function setTriangleBySpeed(percent) {
    percent = Math.max(0, Math.min(1, percent));

    const minAngle = 0;   // Leftmost position
    const maxAngle = 234;  // Rightmost position

    const angle = minAngle + (maxAngle - minAngle) * percent;

    const triangle = document.getElementById("speedPointer");
    triangle.style.transform = `rotate(${angle}deg)`;
}

setTriangleBySpeed(0);  // halfway

function createCircularNumbers() {
    const container = document.querySelector('.circular-number');
    const count = 10;
    const radius = 105;
    const centerX = 150;
    const centerY = 150;

    for (let i = 0; i < count; i++) {
        const angle = (i / (count - 1)) * 224 + 90;
        const rad = angle * (Math.PI / 180);
        const x = centerX + radius * Math.cos(rad);
        const y = centerY + radius * Math.sin(rad);

        const num = document.createElement('span');
        num.className = 'number';
        num.textContent = i;
        num.style.left = `${x}px`;
        num.style.top = `${y}px`;

        container.appendChild(num);
    }
}
createCircularNumbers();

function setSpeed(speedValue) {
    const clampedSpeed = Math.max(0, Math.min(70, speedValue)); // assuming speed in 0–100 range

    elements.speedValue.innerText = `${Math.round(clampedSpeed * 2.236936)}`; // display MPH
    const percent = clampedSpeed / 70; // normalize to 0–1
    setTriangleBySpeed(percent);        // update pointer based on same speed percent
}

function setGear(gearValue) {
    elements.gearValue.innerText = String(gearValue);
}

function setSmallSpeedoRedline(startPercent, endPercent) {
    const centerX = 100;
    const centerY = 100;
    const radius = 57;
    const arcStart = 0;      // starting angle of full arc
    const arcSweep = 210;      // total sweep

    const startAngle = arcStart + arcSweep * startPercent;
    const endAngle = arcStart + arcSweep * endPercent;

    const redlinePath = describeArc(centerX, centerY, radius, startAngle, endAngle);
    document.getElementById('smallRpmRedline').setAttribute('d', redlinePath);
}
setSmallSpeedoRedline(0.8, 1);

function setRedline() {
    const centerX = 100;
    const centerY = 100;
    const radius = 86.5;
        
    const minAngle = -103;
    const maxAngle = minAngle + 158; // 222 degrees total sweep
        
    const redlineStart = 6.9 / 9;  // tick 8 out of 9 (normalized)
    const redlineEnd = 9 / 9;    // tick 9
    const redlineAngleStart = minAngle + redlineStart * (maxAngle - minAngle);
    const redlineAngleEnd = minAngle + redlineEnd * (maxAngle - minAngle);
        
    const redlinePath = describeArc(centerX, centerY, radius, redlineAngleStart, redlineAngleEnd);
    document.getElementById('rpmRedline').setAttribute('d', redlinePath);
}
setRedline();

function setSmallFuelPointer(fuel) {
    const arcStart = 5;        // starting angle of the arc
    const arcSweep = 205;      // how much the arc covers in degrees
    const angle = arcStart + arcSweep * fuel; // final angle

    const pointer = document.getElementById("fuelPointer"); // not "fuelValue"
    pointer.style.transform = `rotate(${angle}deg)`;
}

function setFuel(fuel) {
    elements.fuelHealth.innerText = `${(fuel * 100).toFixed(1)}%`; // keep this for the game
    setSmallFuelPointer(fuel); // rotate the pointer visually
}

document.addEventListener("DOMContentLoaded", () => {
    elements = {
        speedValue: document.getElementById("speedValue"),
        gearValue: document.getElementById("gearValue"),
        pointer: document.getElementById("speedPointer"),
        rpmRedline: document.getElementById('rpmRedline'),
        fuelHealth: document.getElementById("fuelValue") // ✅ Add this line
    }

    // setInterval(() => {
    // const random = Math.random();
    // const randoms = Math.random() * 50;
    // const randomg = Math.floor(Math.random() * 7); // Random gear between 1 and 6

    // setTriangleBySpeed(0); // Set initial speed to 50 mph
    // setSpeed(randoms);  // Set speed to 50 mph
    // setGear(randomg);    // Set gear to 3
    // setFuel(random);     // Set fuel to a random value between 0 and 1
    // }, 1000); // Update speed and gear every second

//     let currentSpeed = 0;
//     let goingUp = true;

//     setInterval(() => {
//         if (goingUp) {
//             currentSpeed += 1;
//             if (currentSpeed >= 140) goingUp = false;
//         } else {
//             currentSpeed -= 1;
//             if (currentSpeed <= 0) goingUp = true;
//         }

//         setSpeed(currentSpeed);
// }, 100);

});