const r = require("raylib");
const g = require("./geometry");

const screenWidth = 1000;
const screenHeight = 800;
const halfScreen = screenWidth / 2;

let scanner1Position = 0;
const scanner1Size = 15;
let scanner1Speed = 10;
let scanner1Color = r.WHITE;

let scanner2Position = halfScreen;
const scanner2Size = 30;
let scanner2Speed = 15;
let scanner2Color = r.WHITE;

let scanner3Position = 0;
const scanner3Size = 30;
let scanner3Speed = 30;
let scanner3Color = r.WHITE;

const particle1Position = 80;
const particle1Size = 50;

const particle2Position = 170;
const particle2Size = 50;

const particle3Position = 80;
const particle3Size = 50;

function setup() {
    const title = "particles scanner";
    const FPS = 50;
    
    r.InitWindow(screenWidth, screenHeight, title);
    r.SetTargetFPS(FPS);
}

function running() {
    return !r.WindowShouldClose();
}

function drawParticles(topPoint, leftPoint) {
    r.DrawRectangle(particle1Position, topPoint, particle1Size, screenHeight, r.BLUE);
    r.DrawRectangle(particle2Position, topPoint, particle2Size, screenHeight, r.BLUE);
    
    r.DrawRectangle(leftPoint, particle3Position, screenWidth, particle3Size, r.BLUE);
}

function drawScanners(topPoint, leftPoint) {
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
    const scannerStartBoundary = 0;
    const scannerEndBoundary = halfScreen;
    const scannerBehaviour = true;
    
    scanner1Position = g.updatePosition(scanner1Position, scanner1Size, scanner1Speed, scannerStartBoundary, scannerEndBoundary);
    scanner1Color = decideColor(scanner1Position, scanner1Size, scannerBehaviour);
    scanner1Speed = g.decideDirection(scanner1Position, scanner1Size, scannerStartBoundary, scannerEndBoundary, scanner1Speed);
}

function scanner2Update() {
    const scannerStartBoundary = halfScreen;
    const scannerEndBoundary = screenWidth;
    const scannerBehaviour = true;
    
    scanner2Position = g.updatePosition(scanner2Position, scanner2Size, scanner2Speed, scannerStartBoundary, scannerEndBoundary)
    scanner2Color = decideColor(scanner2Position, scanner2Size, scannerBehaviour);
    scanner2Speed = g.decideDirection(scanner2Position, scanner2Size, scannerStartBoundary, scannerEndBoundary, scanner2Speed);
}

function scanner3Update() {
    const scannerStartBoundary = 0;
    const scannerEndBoundary = screenHeight;
    const scannerBehaviour = false;
    
    scanner3Position = g.updatePosition(scanner3Position, scanner3Size, scanner3Speed, scannerStartBoundary, scannerEndBoundary)
    scanner3Color = decideColor(scanner3Position, scanner3Size, scannerBehaviour);
    scanner3Speed = g.decideDirection(scanner3Position, scanner3Size, scannerStartBoundary, scannerEndBoundary, scanner3Speed);
}

function update() {
    scanner1Update();
    scanner2Update();
    scanner3Update();
}

function draw() {
    const topPoint = 0;
    const leftPoint = 0;

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    
    drawParticles(topPoint, leftPoint);
    drawScanners(topPoint, leftPoint);
    
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