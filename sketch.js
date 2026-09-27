const r = require("raylib");

const screenWidth = 300;
const screenHeight = 200;
const FPS = 60;

const startY = 0;

let startX = 0;
const scannerWidth = 20;
const scannerHeight = screenHeight;
let reverseDirection = false;
let color = r.WHITE;

const startRangeX = 100;
const particleWidth = 50;
const particleHeight = screenHeight;


function running() {
    return !r.WindowShouldClose();
}

function drawParticles() {
    r.DrawRectangle(startRangeX, startY, particleWidth, particleHeight, r.BLUE);
}

function setup() {
    r.InitWindow(screenWidth, screenHeight, "Paricles Scanner");
    r.SetTargetFPS(FPS);
}

function update() {
    //startX = direction ? startX + 1 : startX -1;

    if (reverseDirection) {
        startX = startX - 1;

        color = (startX <= startRangeX + particleWidth ) && (startX + scannerWidth > startRangeX ) ? r.RED : r.WHITE;

        
        if (startX === 0)
            reverseDirection = false;
    } else {
        startX = startX + 1;

        color = (startX + scannerWidth >= startRangeX ) && (startX < startRangeX + particleWidth ) ? r.RED : r.WHITE;

        if (startX + scannerWidth === screenWidth)
            reverseDirection = true;
    }

}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawParticles();
    r.DrawRectangle(startX, startY, scannerWidth, scannerHeight, color);

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