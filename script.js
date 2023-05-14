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
let INSTANCE_NUMBER;
let actualSwappingIndex;
let animationThreshold;
let iterationCounter;
let iterationThroughArrayCounter;

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
    INSTANCE_NUMBER = 50;
    speed = 5;
    multiplier = 5;
    isSwapping = false;
    backgroundColor = color(50, 168, 82);
    rectColor = color(createRandomColor())
    createCanvas(800, 600);
    instances = createInstances(INSTANCE_NUMBER);
    actualSwappingIndex = 0;
    animationThreshold = 4;
    iterationCounter = 0;
    iterationThroughArrayCounter = 0;
}





function startSwapTwoFigures(){
    isSwapping = true; 
}
    
function change2ValuesXWhileSwapping(val1, val2){
    if(!isSwapping){ return; }
    // checking if values are actually 
    if(val1.value < val2.value){
        actualSwappingIndex += 1;
        return;
    }
    if(val1.x != val2.old_x){
        if ((val2.old_x - val1.x) > 0) {
            if(Math.abs(val2.old_x - val1.x) < animationThreshold){
                val1.x += (val2.old_x - val1.x)
            }
            else{
                val1.x += speed;
            }
        }
        else {
            if(Math.abs(val2.old_x - val1.x) < animationThreshold){
                val1.x += (val2.old_x - val1.x)
            }
            else{
                val1.x -= speed;
            }
        }
    }
    else{
        firstSwapFinished = true;
    }


    if(val2.x != val1.old_x){
        if ((val2.x - val1.old_x) > 0) {
            if(Math.abs(val2.x - val1.old_x) < animationThreshold){
                val2.x -= (val2.x - val1.old_x)
            }
            else{
                val2.x -= speed;
            }
        }
        else {
            val2.x += speed;
        }
    }
    else{
        secondSwapFinished = true;
    }
    if (firstSwapFinished && secondSwapFinished){
        // comment this to do it automatically - one after another swap
        // isSwapping = false;

        val1.old_x = val1.x;
        val2.old_x = val2.x;
        firstSwapFinished = false;
        secondSwapFinished = false;
        actualSwappingIndex += 1;
        iterationCounter += 1;

        // changing indexes in instances array
        let val1_index = instances.indexOf(val1);
        let val2_index = instances.indexOf(val2);
        replaceElementsIndexes(instances, val1_index, val2_index);
    }
}

function keyPressed(){
    if (key == 'a'){
        startSwapTwoFigures();
    }
}

function replaceElementsIndexes(arr, index1, index2) {
  // Sprawdź, czy podane indeksy są prawidłowe
  if (index1 < 0 || index1 >= arr.length || index2 < 0 || index2 >= arr.length) {
    console.error("Podane indeksy są nieprawidłowe!");
    return;
  }

  // Zmień pozycje dwóch elementów
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;

  // Zwróć zmienioną tablicę
  return arr;
}



function draw() {

    background(backgroundColor);
    fill(rectColor);
    
    // swapping
    if (isSwapping){
        // console.log('actualSwappingIndex', actualSwappingIndex) 
        // console.log('actualSwappingIndex+1', actualSwappingIndex+1) 
        if(actualSwappingIndex + 1 > instances.length - 1){
            // isSwapping = false;
            actualSwappingIndex = 0;
            iterationThroughArrayCounter += 1;
        }
            change2ValuesXWhileSwapping(
                instances[actualSwappingIndex],
                instances[actualSwappingIndex + 1]);
        }

    // drawing rectangles to canvas
    for (let i = 0; i < instances.length; i++) {
        rect(instances[i].x, height - 10, rectangleWidth, -instances[i].value * multiplier);
    }
    fill(2);
    textSize(20);
    // swap counter
    text('counter', 20, 30);
    text(iterationCounter, 20, 60)
    // all array iteration counter
    text('iteration through array', 150, 30);
    text(iterationThroughArrayCounter, 150, 60)
    // hint
    fill(color(255, 255, 255));
    textSize(18);
    text("press \'a\' to start sorting", 400, 30)
}

class Value {
    constructor(x, value, old_x) {
        this.x = x;
        this.value = value;
        this.old_x = old_x;
    }
}