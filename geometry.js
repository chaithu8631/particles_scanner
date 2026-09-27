const r = require("raylib");

function updatePosition(currentPosition, size, speed, startBoundary, endBoundary) {
    const updatePosition = currentPosition + size + speed ;

    if (speed > 0) {
        return updatePosition > endBoundary ? endBoundary - size : updatePosition - size;
    }
    return startBoundary > updatePosition ? startBoundary : updatePosition - size;
}

function scanParticle(scannerPosition, scannerSize, particlePosition, particleSize) {
    const particleEnd = particlePosition + particleSize;
    const scannerEnd = scannerPosition + scannerSize;

    return scannerPosition <= particleEnd && scannerEnd > particlePosition;
}

function decideDirection(scannerPosition, scannerSize, startBoundary, endBoundary, speed) {
    if (scannerPosition === startBoundary)
       return -speed;
    if (scannerPosition + scannerSize === endBoundary)
        return -speed;
    return speed;
}

module.exports = {
    updatePosition,
    scanParticle,
    decideDirection,
};