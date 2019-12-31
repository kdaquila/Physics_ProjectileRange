function cosd(theta_deg) {
    return Math.cos(theta_deg * Math.PI / 180)
}

function sind(theta_deg) {
    return Math.sin(theta_deg * Math.PI / 180)
}

function computeTime(v1, y1, y2, g, theta) {
    let v1y = v1*sind(theta);
    let t = (1/g)*(v1y + Math.sqrt(Math.pow(v1y,2) + 2*g*(y1-y2)));
    return t;
}

function computeHorizontalRange(v1, y1, y2, g, theta) {
    let v1x = v1*cosd(theta);
    let v1y = v1*sind(theta);
    let t = (1/g)*(v1y + Math.sqrt(Math.pow(v1y,2) + 2*g*(y1-y2)));
    let range = v1x*t;
    return range
}

function computeMaxHeight(v1, y1, g, theta) {
    let v1y = v1*sind(theta);
    let h = y1 + Math.pow(v1y, 2)/(2 * g);
    return h;
}

function hideAllFigures() {
    document.getElementById('launchToHigher').style.display = 'none';
    document.getElementById('launchToLower').style.display = 'none';
    document.getElementById('launchToSame').style.display = 'none';
}

function show(id) {
    document.getElementById(id).style.display = 'block';
}

function handleSolve() {
    // Get the variables
    let v1_inputElement = document.getElementById('initial-velocity-magnitude');
    let v1 = parseFloat(v1_inputElement.value || v1_inputElement.placeholder);
    let theta_inputElement = document.getElementById('initial-velocity-direction');
    let theta = parseFloat(theta_inputElement.value || theta_inputElement.placeholder);
    let y1_inputElement = document.getElementById('initial-vertical-position');
    let y1 = parseFloat(y1_inputElement.value || y1_inputElement.placeholder);
    let y2_inputElement = document.getElementById('final-vertical-position');
    let y2 = parseFloat(y2_inputElement.value || y2_inputElement.placeholder);
    let g = 9.8;

    // Compute the horizontal range
    let range = computeHorizontalRange(v1, y1, y2, g, theta);

    // Update the horizontal range field
    document.getElementById('horizontal-range').value = range.toFixed(3);

    // Reveal the solution section
    show('solution');

    // Update the figures
    hideAllFigures();
    if (y1 > y2) {
        show('launchToLower')
    }
    else if (y1 < y2) {
        show('launchToHigher')
    }
    else if (y1 === y2) {
        show('launchToSame')
    }

    // Compute total time
    let t = computeTime(v1, y1, y2, g, theta);

    // Update the fun fact about time
    document.getElementById('totalTime').innerText = t.toFixed(2);

    // Compute the maximum height
    let h = computeMaxHeight(v1, y1, g, theta);

    // Update the fun fact about maximum height
    document.getElementById('maximumHeight').innerText = h.toFixed(2);
}