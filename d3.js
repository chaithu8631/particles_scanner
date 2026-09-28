const r = require("raylib");
const w = require("./window")
let position = 0;
const width = 20;
let velocity = 1;
let color = r.WHITE;
const lowerBoundary = 0;
const upperBoundary = w.screenHeight;

module.exports = {
    position,
    width,
    velocity,
    color,
    lowerBoundary, 
    upperBoundary,
};