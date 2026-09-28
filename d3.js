const r = require("raylib");
const w = require("./window");

const lowerBoundary = 0;
const upperBoundary = w.screenHeight;
let position = lowerBoundary;
const width = 20;
let velocity = 1;
let color = r.WHITE;

module.exports = {
    position,
    width,
    velocity,
    color,
    lowerBoundary, 
    upperBoundary,
};