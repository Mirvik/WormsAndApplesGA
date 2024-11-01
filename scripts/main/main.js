import { updateGenNum } from "./other_functions.js";
import { start_genetic_algorithm, AllCoordsWormsDict} from "./genetic_algorithm.js";
import { drawApples, drawWorms, drawWormsWithCoordinates, drawGrid, clearCanvas } from "./game_functions.js";


// Constants and variables
let genNum = 1;

const urlParams = new URLSearchParams(window.location.search);

const popSize = urlParams.get('popSize');
const maxGen = urlParams.get('maxGen');
const pMutate = urlParams.get('pMutate');
const minGen = 1;

// Canvas
const canvasSize = 840;
const cellSize = 40;

const myCanvas = document.getElementById("canvas");
const ctx = myCanvas.getContext("2d");

// Start
updateGenNum(genNum);

drawGrid(ctx, canvasSize, cellSize);
drawApples(ctx, popSize);

start_genetic_algorithm(popSize, maxGen, pMutate);

drawWormsWithCoordinates(ctx, AllCoordsWormsDict[1]);



// Events
document.getElementById('minBtn').addEventListener('click', () => {

    // Update new generation num
    genNum = minGen;
    updateGenNum(genNum);

    // Draw new canvas
    clearCanvas(ctx, myCanvas);
    drawGrid(ctx, canvasSize, cellSize);
    drawApples(ctx, popSize);
    drawWormsWithCoordinates(ctx, AllCoordsWormsDict[1]);
});

document.getElementById('maxBtn').addEventListener('click', () => {

    // Update new generation num
    genNum = maxGen;
    updateGenNum(genNum);

    // Draw new canvas
    clearCanvas(ctx, myCanvas);
    drawGrid(ctx, canvasSize, cellSize);
    drawApples(ctx, popSize);
    drawWormsWithCoordinates(ctx, AllCoordsWormsDict[maxGen]);
});




document.getElementById('pastBtn').addEventListener('click', () => {

    if (genNum != minGen) {
        genNum -= 1;

        // Update new generation num
        updateGenNum(genNum);

        // Draw new canvas
        clearCanvas(ctx, myCanvas);
        drawGrid(ctx, canvasSize, cellSize);
        drawApples(ctx, popSize);
        drawWormsWithCoordinates(ctx, AllCoordsWormsDict[genNum]);
    } else {
        alert("The initial population is reached yet!");
    }
     
    
});

document.getElementById('nextBtn').addEventListener('click', () => {

    if (genNum != maxGen) {
        genNum += 1;
        // Update new generation num
        updateGenNum(genNum);

        // Draw new canvas
        clearCanvas(ctx, myCanvas);
        drawGrid(ctx, canvasSize, cellSize);
        drawApples(ctx, popSize);
        drawWormsWithCoordinates(ctx, AllCoordsWormsDict[genNum]);
    } else {
        alert("The last generation is reached yet!");
    }

    
});
