const r = require("raylib");

function updatePosition(currentPosition, velocity) {
    return currentPosition + velocity;
}

function detectParticle(
    detectorPosition,
    detectorWidth,
    particlePosition,
    particleWidth,
) {
    const particleEnd = particlePosition + particleWidth;
    const detectorEnd = detectorPosition + detectorWidth;

    return detectorPosition <= particleEnd && detectorEnd > particlePosition;
}

function deriveVelocity(
    detectorPosition,
    detectorWidth,
    startBoundary,
    endBoundary,
    velocity,
) {
    const detectorEnd = detectorPosition + detectorWidth;
    return detectorPosition === startBoundary || detectorEnd === endBoundary
        ? -velocity
        : velocity;
}

function drawHorizontally(startPosition, width, color) {
    r.DrawRectangle(startPosition, 0, width, r.GetScreenHeight(), color);
}

function drawVertically(startPosition, height, color) {
    r.DrawRectangle(0, startPosition, r.GetScreenWidth(), height, color);
}

module.exports = {
    updatePosition,
    detectParticle,
    deriveVelocity,
    drawHorizontally,
    drawVertically,
};
