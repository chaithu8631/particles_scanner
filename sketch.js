const r = require("raylib");

const screenWidth = 300;
const screenHeight = 200;
const FPS = 60;

let startX = 0;
const startY = 0;
const scannerWidth = 20;
const scannerHeight = screenHeight;
let reverseDirection = false;

function running() {
    return !r.WindowShouldClose();
}

function drawParticles() {
    const startRangeX = 100;
    const startRangeY = 0;
    const particleWidth = 50;
    const particleHeight = screenHeight;

    r.DrawRectangle(startRangeX, startRangeY, particleWidth, particleHeight, r.BLUE);
}

function setup() {
    r.InitWindow(screenWidth, screenHeight, "Paricles Scanner");
    r.SetTargetFPS(FPS);
}

function update() {
    //startX = direction ? startX + 1 : startX -1;

    if (reverseDirection) {
        startX = startX - 1;
        if (startX === 0)
            reverseDirection = false;
    } else {
        startX = startX + 1;
        if (startX + scannerWidth === screenWidth)
            reverseDirection = true;
    }

}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    drawParticles();
    r.DrawRectangle(startX, startY, scannerWidth, scannerHeight, r.WHITE);

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