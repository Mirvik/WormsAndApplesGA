import { gameContainer, ALL_GAME_CONFIG } from './config.js';

export function drawApples(ctx, num) {

    for (let i = 0; i < num; i++) {

        // Draw a circle
        ctx.fillStyle = 'red';

        ctx.beginPath();

        let x = ALL_GAME_CONFIG.applesPositions[i].x;
        let y = ALL_GAME_CONFIG.applesPositions[i].y;
        

        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fill();

        // Setting style of text
        ctx.fillStyle = 'black'; 
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw a number in circle
        ctx.fillText(i + 1, x, y);
    }
    
}



export function drawWorms(ctx, num) {

    for (let i = 0; i < num; i++) {

        // Draw a circle
        ctx.fillStyle = 'yellow';

        ctx.beginPath();

        let x = ALL_GAME_CONFIG.wormsPositions[i].x;
        let y = ALL_GAME_CONFIG.wormsPositions[i].y;


        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fill();

        // Setting style of text
        ctx.fillStyle = 'black'; 
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw a number in circle
        ctx.fillText(i + 1, x, y);
    }
    
}

export function drawGrid(ctx, canvasSize, cellSize) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.beginPath();

    // Horizontal lines
    for (let r = cellSize; r < canvasSize; r += cellSize) {
        
        ctx.moveTo(0, r);
        ctx.lineTo(canvasSize, r);
        ctx.stroke();
    }

    // Vertical lines
    for (let c = cellSize; c < canvasSize; c += cellSize) {
        ctx.moveTo(c, 0);
        ctx.lineTo(c, canvasSize);
        ctx.stroke();
    }

    // Big grid
    ctx.strokeStyle = 'blue';
    ctx.beginPath();

    for (let big_r = cellSize * 3; big_r < canvasSize; big_r += cellSize * 3) {
        ctx.moveTo(0, big_r);
        ctx.lineTo(canvasSize, big_r);
        ctx.stroke();
    }

    for (let big_c = cellSize * 3; big_c < canvasSize; big_c += cellSize * 3) {
        ctx.moveTo(big_c, 0);
        ctx.lineTo(big_c, canvasSize);
        ctx.stroke();
    }

}


export function clearCanvas(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function drawWormsWithCoordinates(ctx, coordsWorms) {


    coordsWorms.forEach((worm, index) => {

        // Draw a circle
        ctx.fillStyle = 'yellow';

        ctx.beginPath();

        ctx.arc(worm.x, worm.y, 10, 0, 2 * Math.PI);
        ctx.fill();

        // Setting style of text
        ctx.fillStyle = 'black'; 
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw a number in circle
        ctx.fillText(index + 1, worm.x, worm.y);
    });

}