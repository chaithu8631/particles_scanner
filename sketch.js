const r = require("raylib");
const g = require("./geometry");

const screenWidth = 300;
const screenHeight = 200;
const title = "particles scanner";
const halfScreen = screenWidth / 2;
const FPS = 50;

const topPoint = 0;

const scanner1StartBoundary = 0;
const scanner1EndBoundary = halfScreen;
let scanner1Position = scanner1StartBoundary;
const scanner1Size = 15;
const scanner1Speed = 1;
let scanner1Direction = 1;
let scanner1Color = r.WHITE;

const scanner2StartBoundary = halfScreen;
const scanner2EndBoundary = screenWidth;
let scanner2Position = scanner2StartBoundary;
const scanner2Size = 30;
const scanner2Speed = 2;
let scanner2Direction = 1;
let scanner2Color = r.WHITE;

const particle1Position = 80;
const particle1Size = 50;

const particle2Position = 170;
const particle2Size = 50;

function setup() {
    r.InitWindow(screenWidth, screenHeight, title);
    r.SetTargetFPS(FPS);
}

function running() {
    return !r.WindowShouldClose();
}

function drawParticles() {
    r.DrawRectangle(particle1Position, topPoint, particle1Size, screenHeight, r.BLUE);
    r.DrawRectangle(particle2Position, topPoint, particle2Size, screenHeight, r.BLUE);
}

function drawScanners() {
    r.DrawRectangle(scanner1Position, topPoint, scanner1Size, screenHeight, scanner1Color);
    r.DrawRectangle(scanner2Position, topPoint, scanner2Size, screenHeight, scanner2Color);
}

function decideColor(scannerPosition, scannerSize) {
    const scanParticle1 = g.scanParticle(scannerPosition, scannerSize, particle1Position, particle1Size);
    const scanParticle2 = g.scanParticle(scannerPosition, scannerSize, particle2Position, particle2Size);

    return scanParticle1 || scanParticle2 ? r.RED : r.WHITE;
}

function scanner1Update() {
    scanner1Position = g.updatePosition(scanner1Position, scanner1Size, scanner1Speed, scanner1Direction, scanner1StartBoundary, scanner1EndBoundary);
    scanner1Color = decideColor(scanner1Position, scanner1Size);
    scanner1Direction = g.decideDirection(scanner1Position, scanner1Size, scanner1StartBoundary, scanner1EndBoundary, scanner1Direction);
}

function scanner2Update() {
    scanner2Position = g.updatePosition(scanner2Position, scanner2Size, scanner2Speed, scanner2Direction, scanner2StartBoundary, scanner2EndBoundary)
    scanner2Color = decideColor(scanner2Position, scanner2Size);
    scanner2Direction = g.decideDirection(scanner2Position, scanner2Size, scanner2StartBoundary, scanner2EndBoundary, scanner2Direction);
}

function update() {
    scanner1Update();
    scanner2Update();
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawParticles();
    drawScanners();

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