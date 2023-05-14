// colors
let backgroundColor;

let rectColor;

// values
let instances;
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

function createInstances(howMany) {
    let randomInstances = []
    for (let i = 0; i < howMany; i++) {
        const newValueValue = getRandomMinMax(0, 100);
        const newInstance = new Value(
            10 + i * rectangleWidth + 3 * i,
            newValueValue
        );
        randomInstances.push(newInstance);
    }
    return randomInstances;
}

function setup() {
    multiplier = 5;
    backgroundColor = color(50, 168, 82);
    rectColor = color(createRandomColor())
    createCanvas(800, 600);
    instances = createInstances(50);
}

function swapTwoValues(val1, val2){
    const val1_x = val1.x;
    const val2_x = val2.x;

    while(val1.x != val2_x){
        // we need to increase val1.x for one pixel in 
        // direction of the second Value instance x
        // val1.x += (val2_x - val1.x) > 0 ? 1 : -1;
        if ((val2_x - val1.x) > 0) {
            val1.x += 1;
        }
        else {
            val1.x -= 1;
        }
    }
}

function keyPressed(){
    if (key == 'a'){
        // swapTwoValues(instances[0], instances[1]);
        isSwapping = true;
    }
}
let isSwapping = false;

function changeValuesForSwap(val1, val2){
    if (!isSwapping) {return;}
    const val1_x = val1.x;
    const val2_x = val2.x;

    if(val1.x != val2_x){
        // we need to increase val1.x for one pixel in 
        // direction of the second Value instance x
        // val1.x += (val2_x - val1.x) > 0 ? 1 : -1;
        if ((val2_x - val1.x) > 0) {
            val1.x += 1;
        }
        else {
            val1.x -= 1;
        }
    }

    if(val2.x != val1_x){
        // we need to increase val1.x for one pixel in 
        // direction of the second Value instance x
        // val1.x += (val2_x - val1.x) > 0 ? 1 : -1;
        if ((val2.x - val1_x) > 0) {
            val2.x += 1;
        }
        else {
            val2.x -= 1;
        }
    }
}

function draw() {
    background(backgroundColor);
    fill(rectColor);
    changeValuesForSwap(instances[0], instances[1]);
    for (let i = 0; i < instances.length; i++) {
        rect(instances[i].x, height - 10, rectangleWidth, -instances[i].value * multiplier);
    }
}

class Value {
    constructor(x, value) {
        this.x = x;
        this.value = value;
    }
}