let elements = {};
let speed = 0;
let previousGear = null;

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

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

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

function createEngineTicks() {
    const ticksContainer = document.querySelector('.engineticks');
    const tickCount = 10;
    
    for (let i = 0; i < tickCount; i++) {
        const tick = document.createElement('div');
        tick.className = 'enginetick';
        const angle = (i / (tickCount + 9)) * 254 - 114;
        tick.style.transform = `rotate(${angle}deg) translateY(-160px)`;
        ticksContainer.appendChild(tick);
    }
}
createEngineTicks();

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

let currentSpeed = 0;
let speedAnimationFrame = null;

const minAngle = 0;
const maxAngle = 234;
const maxSpeed = 80;
const step = 0.15;

function setTriangleBySpeed(targetSpeed) {
  cancelAnimationFrame(speedAnimationFrame);

  const normalizedTarget = Math.min(Math.max(targetSpeed / maxSpeed, 0), 1);

  function animate() {
    const diff = normalizedTarget - currentSpeed;

    if (Math.abs(diff) > 0.001) {
      currentSpeed += diff * step;
      const angle = minAngle + currentSpeed * (maxAngle - minAngle);
      const triangle = document.getElementById("speedPointer");
      if (triangle) {
        triangle.style.transform = `rotate(${angle}deg)`;
      }
      speedAnimationFrame = requestAnimationFrame(animate);
    } else {
      currentSpeed = normalizedTarget;
    }
  }

  animate();
}

function recoilNeedle(intensity = 0.02, direction = 'up') {
  const originalSpeed = currentSpeed;
  let recoilSpeed = direction === 'up' 
    ? originalSpeed - intensity 
    : originalSpeed + intensity;

  recoilSpeed = Math.min(Math.max(recoilSpeed, 0), 1);

  let frame = 0;
  const maxFrames = 15;

  function animateRecoil() {
    const t = frame / maxFrames;
    const easeOut = 1 - Math.pow(1 - t, 3); // easing for smoother return

    const interpolatedSpeed = recoilSpeed + (originalSpeed - recoilSpeed) * easeOut;
    const angle = minAngle + interpolatedSpeed * (maxAngle - minAngle);

    const triangle = document.getElementById("speedPointer");
    if (triangle) {
      triangle.style.transform = `rotate(${angle}deg)`;
    }

    if (frame < maxFrames) {
      frame++;
      requestAnimationFrame(animateRecoil);
    }
  }

  animateRecoil();
}

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
    elements.speedValue.innerText = `${Math.round(speedValue * 2.236936)}`;
    setTriangleBySpeed(speedValue);
}

function setGear(gearValue) {
    elements.gearValue.innerText = String(gearValue);

    const arrowElement = document.getElementById("gearArrow");

    if (previousGear !== null) {
        if (gearValue > previousGear) {
            arrowElement.innerText = "▲";
            arrowElement.style.opacity = 1;
            arrowElement.style.color = '#00ff00'; // Green for upshift
            recoilNeedle(0.05, 'up'); // Gear up recoil
        } else if (gearValue < previousGear) {
            arrowElement.innerText = "▼";
            arrowElement.style.opacity = 1;
            arrowElement.style.color = '#ff0000'; // Red for downshift
            recoilNeedle(0.05, 'down'); // Gear down recoil (a bit stronger)
        } else {
            arrowElement.style.opacity = 0;
        }

        // Hide arrow after 700ms
        setTimeout(() => {
            arrowElement.style.opacity = 0;
        }, 700);
    }

    previousGear = gearValue;
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

function setEngineArc(percent) {
  percent = Math.max(0, Math.min(1, percent));

  const centerX = 170;
  const centerY = 170;
  const radius = 145;          // larger radius than speedo (which is 87)
  const arcStart = -92;        // tweak start angle so it fits nicely around speedo
  const arcSweep = 276;        // arc sweep length in degrees

  const arcEnd = arcStart + (arcSweep * percent);

  const path = describeArc(centerX, centerY, radius, arcStart, arcEnd);
  document.getElementById("engineArc").setAttribute("d", path);
}
setEngineArc(0.5); // Set initial engine arc to 50%

function setEngineBgArc(percent) {
  percent = Math.max(0, Math.min(1, percent));

  const centerX = 170;
  const centerY = 170;
  const radius = 145;          // larger radius than speedo (which is 87)
  const arcStart = -93;        // tweak start angle so it fits nicely around speedo
  const arcSweep = 280;        // arc sweep length in degrees

  const arcEnd = arcStart + (arcSweep * percent);

  const path = describeArc(centerX, centerY, radius, arcStart, arcEnd);
  document.getElementById("engineArcBg").setAttribute("d", path);
}
setEngineBgArc(0.5); // Set initial engine arc to 50%

function setEngineHealth(percent) {
    const centerX = 170;
    const centerY = 170;
    const radius = 145;
  
    const arcStart = -92;
    const arcSweep = 138.7;
    const arcEnd = arcStart + (arcSweep * percent);

    const arc = describeArc(centerX, centerY, radius, arcStart, arcEnd);
    document.getElementById("engine").setAttribute("d", arc);
}

function setHealth(health) {
    elements.engineHealth.innerText = `${(health * 100).toFixed(1)}%`; // optional UI update
    setEngineHealth(health); // update the arc visually
}

document.addEventListener("DOMContentLoaded", () => {
    elements = {
        speedValue: document.getElementById("speedValue"),
        gearValue: document.getElementById("gearValue"),
        pointer: document.getElementById("speedPointer"),
        rpmRedline: document.getElementById('rpmRedline'),
        fuelHealth: document.getElementById("fuelValue"),
        engineHealth: document.getElementById('engine'),
        };

    // setInterval(() => {
    // const random = Math.random();
    // const randoms = Math.random() * 50;
    // const randomg = Math.floor(Math.random() * 7); // Random gear between 1 and 6

    // setSpeed(randoms);  // Set speed to 50 mph
    // setGear(randomg);    // Set gear to 3
    // setFuel(random);     // Set fuel to a random value between 0 and 1
    // setEngineHealth(0.5); // Set engine health to a random value between 0.6 and 1.0
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