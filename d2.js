const r = require("raylib");
const w = require("./window");

let position = 500;
const width = 20;
let velocity = 2;
let color = r.WHITE;
const upperBoundary = w.halfScreen;
const lowerBoundary = w.screenWidth;

module.exports = {
    position,
    width,
    velocity,
    color,
    lowerBoundary, 
    upperBoundary,
};