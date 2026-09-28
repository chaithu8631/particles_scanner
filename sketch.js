const r = require("raylib");
const g = require("./geometry");

const d1 = require("./d1");
const d2 = require("./d2");
const d3 = require("./d3");

const screenWidth = 300;
const screenHeight = 200;
const halfScreen = screenWidth / 2;

const particle1Position = 80;
const particle1Width = 20;

const particle2Position = 240;
const particle2Width = 20;

const particle3Position = 100;
const particle3Width = 20;

d2.position = halfScreen;

function setup() {
    const title = "particles detector";
    const FPS = 60;
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screenWidth, screenHeight, title);
    r.SetTargetFPS(FPS);
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
        ? r.RED
        : r.WHITE;
}

function scanHorizontally(detectorPosition, detectorSize) {
    {
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
        return scanParticle1 || scanParticle2 ? r.RED : r.WHITE;
    }
}

function updateDetector(d, lowerBoundary, upperBoundary) {
    d.position = g.updatePosition(d.position, d.velocity);
    d.velocity = g.deriveVelocity(
        d.position,
        d.width,
        lowerBoundary,
        upperBoundary,
        d.velocity,
    );
}

function update() {
    updateDetector(d1, 0, halfScreen);
    updateDetector(d2, halfScreen, screenWidth);
    updateDetector(d3, 0, screenHeight);
    d1.color = scanHorizontally(d1.position, d1.width);
    d2.color = scanHorizontally(d2.position, d2.width);
    d3.color = scanVertically(d3.position, d3.width);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    g.drawHorizontally(particle1Position, particle1Width, r.BLUE);
    g.drawHorizontally(particle2Position, particle2Width, r.BLUE);
    g.drawVertically(particle3Position, particle3Width, r.BLUE);

    g.drawHorizontally(d1.position, d1.width, d1.color);
    g.drawHorizontally(d2.position, d2.width, d2.color);
    g.drawVertically(d3.position, d3.width, d3.color);
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
