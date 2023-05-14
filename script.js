// colors
let backgroundColor;
let rectColor;

// values
let instances;
let multiplier;

// rectangles
let rectangleWidth = 10;

let isSwapping;

// misc
let speed;
let firstSwapFinished;
let secondSwapFinished;

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
            newValueValue,
            10 + i * rectangleWidth + 3 * i
        );
        randomInstances.push(newInstance);
    }
    return randomInstances;
}

function setup() {
    speed = 10;
    multiplier = 5;
    isSwapping = false;
    backgroundColor = color(50, 168, 82);
    rectColor = color(createRandomColor())
    createCanvas(800, 600);
    instances = createInstances(50);
}





function startSwapTwoFigures(){
    isSwapping = true; 
}
    
function change2ValuesXWhileSwapping(val1, val2){
    if(val1.x != val2.old_x){
        if ((val2.old_x - val1.x) > 0) {
            val1.x += speed;
        }
        else {
            val1.x -= speed;
        }
    }
    else{
        firstSwapFinished = true;
    }


    if(val2.x != val1.old_x){
        if ((val2.x - val1.old_x) > 0) {
            val2.x -= speed;
        }
        else {
            val2.x += speed;
        }
    }
    else{
        secondSwapFinished = true;
    }
    if (firstSwapFinished && secondSwapFinished){
        isSwapping = false;
        val1.old_x = val1.x;
        val2.old_x = val2.x;
        firstSwapFinished = false;
        secondSwapFinished = false;
    }
}

function keyPressed(){
    if (key == 'a'){
        startSwapTwoFigures();
    }
}


function draw() {

    background(backgroundColor);
    fill(rectColor);
    
    // swapping
    if (isSwapping){
        change2ValuesXWhileSwapping(instances[0], instances[30]);
    }

    // drawing rectangles to canvas
    for (let i = 0; i < instances.length; i++) {
        rect(instances[i].x, height - 10, rectangleWidth, -instances[i].value * multiplier);
    }
}

class Value {
    constructor(x, value, old_x) {
        this.x = x;
        this.value = value;
        this.old_x = old_x;
    }
}