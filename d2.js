const r = require("raylib");
const w = require("./window");

const lowerBoundary = w.halfScreen;
const upperBoundary = w.screenWidth;
let position = lowerBoundary;
const width = 20;
let velocity = 2;
let color = r.WHITE;

module.exports = {
    position,
    width,
    velocity,
    color,
    lowerBoundary, 
    upperBoundary,
};