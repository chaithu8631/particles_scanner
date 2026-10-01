const r = require("raylib");
const g = require("./geometry");

const window = {
    screenWidth: 600,
    screenHeight: 400,
    title: "particles detector",
    FPS: 60,
};
window.halfScreen = window.screenWidth / 2;

const detectedColor = {
    r: 255,
    g: 0,
    b: 0,
    a: 255,
};

const undetectedColor = {
    r: 255,
    g: 255,
    b: 255,
    a: 255,
};

const detector1 = {
    lowerBoundary: 0,
    upperBoundary: window.halfScreen,
    position: 0,
    width: 20,
    velocity: 1,
    color: undetectedColor,
};

const detector2 = {
    lowerBoundary: window.halfScreen,
    upperBoundary: window.screenWidth,
    position: window.halfScreen,
    width: 20,
    velocity: 2,
    color: undetectedColor,
};

const detector3 = {
    lowerBoundary: 0,
    upperBoundary: window.screenHeight,
    position: 0,
    width: 20,
    velocity: 1,
    color: undetectedColor,
};

const particle1Position = 140;
const particle1Width = 20;

const particle2Position = 440;
const particle2Width = 20;

const particle3Position = 190;
const particle3Width = 20;

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(window.screenWidth, window.screenHeight, window.title);
    r.SetTargetFPS(window.FPS);
}

function running() {
    return !r.WindowShouldClose();
}

function scanVertically(detectorPosition, detectorSize) {
    return g.detectParticle(
        detectorPosition,
        detectorSize,
        particle3Position,
        particle3Width,
    )
        ? detectedColor
        : undetectedColor;
}

function scanHorizontally(detectorPosition, detectorSize) {
    const scanParticle1 = g.detectParticle(
        detectorPosition,
        detectorSize,
        particle1Position,
        particle1Width,
    );
    const scanParticle2 = g.detectParticle(
        detectorPosition,
        detectorSize,
        particle2Position,
        particle2Width,
    );
    return scanParticle1 || scanParticle2 ? detectedColor : undetectedColor;
}

function updateDetector(detector) {
    detector.position = g.updatePosition(detector.position, detector.velocity);
    detector.velocity = g.deriveVelocity(
        detector.position,
        detector.width,
        detector.lowerBoundary,
        detector.upperBoundary,
        detector.velocity,
    );
}

function update() {
    updateDetector(detector1);
    updateDetector(detector2);
    updateDetector(detector3);
    detector1.color = scanHorizontally(detector1.position, detector1.width);
    detector2.color = scanHorizontally(detector2.position, detector2.width);
    detector3.color = scanVertically(detector3.position, detector3.width);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    g.drawHorizontally(particle1Position, particle1Width, r.BLUE);
    g.drawHorizontally(particle2Position, particle2Width, r.BLUE);
    g.drawVertically(particle3Position, particle3Width, r.BLUE);

    g.drawHorizontally(detector1.position, detector1.width, detector1.color);
    g.drawHorizontally(detector2.position, detector2.width, detector2.color);
    g.drawVertically(detector3.position, detector3.width, detector3.color);
    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};
