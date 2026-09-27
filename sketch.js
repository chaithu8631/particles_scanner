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

const particle1startRangeX = 100;
const particle1Width = 50;

const particleHeight = screenHeight;

const particle2startRangeX = 200;
const particle2Width = 5;

function running() {
    return !r.WindowShouldClose();
}

function drawParticles() {
    r.DrawRectangle(particle1startRangeX, startY, particle1Width, particleHeight, r.BLUE);
    r.DrawRectangle(particle2startRangeX, startY, particle2Width, particleHeight, r.BLUE);

}

function setup() {
    r.InitWindow(screenWidth, screenHeight, "Paricles Scanner");
    r.SetTargetFPS(FPS);
}

function update() {
    //startX = direction ? startX + 1 : startX -1;

    if (reverseDirection) {
        startX = startX - 1;

        color = ((startX <= particle1startRangeX + particle1Width) && (startX + scannerWidth > particle1startRangeX)) || ((startX <= particle2startRangeX + particle2Width) && (startX + scannerWidth > particle2startRangeX)) ? r.RED : r.WHITE;


        if (startX === 0)
            reverseDirection = false;

    } else {
        startX = startX + 1;

        color = ((startX + scannerWidth >= particle1startRangeX) && (startX < particle1startRangeX + particle1Width)) || ((startX + scannerWidth >= particle2startRangeX) && (startX < particle2startRangeX + particle2Width)) ? r.RED : r.WHITE;

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