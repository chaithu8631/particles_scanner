const r = require("raylib");

function updatePosition(currentPosition, size, speed, movement, startBoundary, endBoundary) {
    const updatePosition = currentPosition + size + speed * movement;

    if (movement === 1) {
        return updatePosition > endBoundary ? endBoundary - size : updatePosition - size;
    }
    return startBoundary > updatePosition ? startBoundary : updatePosition - size;
}

function scanParticle(scannerPosition, scannerSize, particlePosition, particleSize) {
    const particleEnd = particlePosition + particleSize;
    const scannerEnd = scannerPosition + scannerSize;

    return scannerPosition <= particleEnd && scannerEnd > particlePosition;
}

function decideDirection(scannerPosition, scannerSize, startBoundary, endBoundary, movement) {
    if (scannerPosition === startBoundary)
        return 1;
    if (scannerPosition + scannerSize === endBoundary)
        return -1;
    return movement;
}

module.exports = {
    updatePosition,
    scanParticle,
    decideDirection,
};