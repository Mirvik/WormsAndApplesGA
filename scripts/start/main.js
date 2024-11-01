import { drawApples, drawWorms, drawGrid} from '../main/game_functions.js';

const canvasSize = 840;
const cellSize = 40;

const myCanvas = document.getElementById("canvas");
const ctx = myCanvas.getContext("2d");

drawGrid(ctx, canvasSize, cellSize);

drawApples(ctx, 49);
drawWorms(ctx, 49);

const myForm = document.getElementById('myForm');
const warningText = document.getElementById('warningText');

myForm.addEventListener('submit', (event) => {
    const popSize = Number(document.getElementById('inpPopSize').value);
    const maxGen = Number(document.getElementById('inpMaxGen').value);
    const pMutate = Number(document.getElementById('inpPMutate').value);

    document.getElementById('inpPopSize').value = popSize;
    document.getElementById('inpMaxGen').value = maxGen;
    document.getElementById('inpPMutate').value = pMutate;

    if (popSize < 1) {
        event.preventDefault();
        warningText.textContent = 'The population size cannot be less than 1';
    }

    else if (popSize > 49) {
        event.preventDefault();
        warningText.textContent = 'The population size cannot be greater than 49';
    }

    else if (maxGen < 1) {
        event.preventDefault();
        warningText.textContent = 'The max generation cannot be less than 0';
    }

    else if (pMutate < 0) {
        event.preventDefault();
        warningText.textContent = 'The probability of mutation cannot be less than 0';
    }

    else if (pMutate > 1) {
        event.preventDefault();
        warningText.textContent = 'The probability of mutation cannot be greater than 1';
    }
});