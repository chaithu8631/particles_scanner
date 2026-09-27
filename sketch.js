const r = require("raylib");
const g = require("./geometry");

const screenWidth = 300;
const screenHeight = 200;
const title = "particles scanner";
const halfScreen = screenWidth / 2;
const FPS = 50;

const topPoint = 0;
const leftPoint = 0;

const scanner1StartBoundary = 0;
const scanner1EndBoundary = halfScreen;
let scanner1Position = scanner1StartBoundary;
const scanner1Size = 15;
const scanner1Speed = 1;
//Direction Values = 1:Regular | -1:reverse
let scanner1Direction = 1;    
let scanner1Color = r.WHITE;
//Behaviour Values = true:Horizontal | false:Vertical
const scanner1Behaviour = true;

const scanner2StartBoundary = halfScreen;
const scanner2EndBoundary = screenWidth;
let scanner2Position = scanner2StartBoundary;
const scanner2Size = 30;
const scanner2Speed = 2;
let scanner2Direction = 1;
let scanner2Color = r.WHITE;
const scanner2Behaviour = true;

const scanner3StartBoundary = 0;
const scanner3EndBoundary = screenHeight;
let scanner3Position = scanner3StartBoundary;
const scanner3Size = 30;
const scanner3Speed = 2;
let scanner3Direction = 1;
let scanner3Color = r.WHITE;
const scanner3Behaviour = false;

const particle1Position = 80;
const particle1Size = 50;

const particle2Position = 170;
const particle2Size = 50;

const particle3Position = 80;
const particle3Size = 50;

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

    r.DrawRectangle(leftPoint, particle3Position, screenWidth, particle3Size, r.BLUE);
}

function drawScanners() {
    r.DrawRectangle(scanner1Position, topPoint, scanner1Size, screenHeight, scanner1Color);
    r.DrawRectangle(scanner2Position, topPoint, scanner2Size, screenHeight, scanner2Color);

    r.DrawRectangle(leftPoint, scanner3Position, screenWidth, scanner3Size, scanner3Color);
}

function decideColor(scannerPosition, scannerSize, behaviour) {
    if(behaviour){
        const scanParticle1 = g.scanParticle(scannerPosition, scannerSize, particle1Position, particle1Size);
        const scanParticle2 = g.scanParticle(scannerPosition, scannerSize, particle2Position, particle2Size);

        return scanParticle1 || scanParticle2 ? r.RED : r.WHITE;
    }
    return g.scanParticle(scannerPosition, scannerSize, particle3Position, particle3Size) ? r.RED : r.WHITE;
}

function scanner1Update() {
    scanner1Position = g.updatePosition(scanner1Position, scanner1Size, scanner1Speed, scanner1Direction, scanner1StartBoundary, scanner1EndBoundary);
    scanner1Color = decideColor(scanner1Position, scanner1Size, scanner1Behaviour);
    scanner1Direction = g.decideDirection(scanner1Position, scanner1Size, scanner1StartBoundary, scanner1EndBoundary, scanner1Direction);
}

function scanner2Update() {
    scanner2Position = g.updatePosition(scanner2Position, scanner2Size, scanner2Speed, scanner2Direction, scanner2StartBoundary, scanner2EndBoundary)
    scanner2Color = decideColor(scanner2Position, scanner2Size, scanner2Behaviour);
    scanner2Direction = g.decideDirection(scanner2Position, scanner2Size, scanner2StartBoundary, scanner2EndBoundary, scanner2Direction);
}

function scanner3Update() {
    scanner3Position = g.updatePosition(scanner3Position, scanner3Size, scanner3Speed, scanner3Direction, scanner3StartBoundary, scanner3EndBoundary)
    scanner3Color = decideColor(scanner3Position, scanner3Size, scanner3Behaviour);
    scanner3Direction = g.decideDirection(scanner3Position, scanner3Size, scanner3StartBoundary, scanner3EndBoundary, scanner3Direction);
}

function update() {
    scanner1Update();
    scanner2Update();
    scanner3Update();
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