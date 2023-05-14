// colors
let backgroundColor;

let rectColor;

// values
let values;
let multiplier;

// rectangles
let rectangleWidth = 10;

function getRandomMinMax(min, max) {
    return Math.random() * (max - min) + min;
}

function createRandomNumberList(howMany) {
    let randomValues = []
    for (let i = 0; i < howMany; i++) {
        let randomNum = getRandomMinMax(0, 100);
        randomValues.push(randomNum);
    }
    return randomValues;
}

function createRandomColor() {
    const randomColor = color(
        getRandomMinMax(0, 255),
        getRandomMinMax(0, 255),
        getRandomMinMax(0, 255),
    )
    return randomColor;
}

function setup() {
    multiplier = 5;
    backgroundColor = color(50, 168, 82);
    rectColor = color(createRandomColor())
    createCanvas(800, 600);
    values = createRandomNumberList(50);
}

function draw() {
    background(backgroundColor);
    for (let i = 0; i < values.length; i++) {
        fill(rectColor);
        rect(10 + i * rectangleWidth + i * 3, height - 10, rectangleWidth, -values[i] * multiplier);
    }
}

class Value {
    constructor(x, value) {
        this.x = x;
        this.value = value;
    }
}