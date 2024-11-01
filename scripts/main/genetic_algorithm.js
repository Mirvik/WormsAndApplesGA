import { ALL_GAME_CONFIG } from "./config.js";


// 1 - up
// 2 - right
// 3 - down
// 4 - left

const nVector = 4;
let population;

export let AllCoordsWormsDict = {};


//-----------------------------INDIVIDUAL CLASS-----------------------------\\
class Individual extends Array {
    constructor(array) {
        super(...array);
        this.fitness = 0;
        this.distance = 0;
    }
}
//-----------------------------INDIVIDUAL CLASS END-----------------------------\\







//-----------------------------FUNCTIONS-----------------------------\\
function createIndividual() {
    return new Individual(Array.from({ length: nVector }, () => Math.floor(Math.random() * nVector) + 1));
}

function createPopulation(popSize) {
    population = Array.from({ length: popSize }, () => createIndividual());
    return population;
}


function calculateCoordinates(popula) {

    let coords = [];

    for (let i = 0; i < popula.length; i++) {

        // Get initial positions for worm
        let x = ALL_GAME_CONFIG.wormsPositions[i].x;
        let y = ALL_GAME_CONFIG.wormsPositions[i].y;

        // For each gene in individual 
        popula[i].forEach(gene => {

            // If direction of movement is up
            if (gene == 1) {
                y -= 40;
            }
    
            // If direction of movement is right
            if (gene == 2) {
                x += 40;
            }
    
            // If direction of movement is down
            else if (gene == 3) {
                y += 40;
            }
    
            // If direction of movement is left
            else if (gene == 4) {
                x -= 40;
            }


        });

        coords.push({
            'x': x,
            'y': y
        });

    }

    return coords;

}


function fitness_function(popula, genNum) {

    popula.forEach((individ, index) => {

        // Coords worm's
        let x1 = AllCoordsWormsDict[genNum][index].x;
        let y1 = AllCoordsWormsDict[genNum][index].y;

        // Coords apple's
        let x2 = ALL_GAME_CONFIG.applesPositions[index].x;
        let y2 = ALL_GAME_CONFIG.applesPositions[index].y;

        // The distance between worm and apple
        individ.distance = Math.sqrt( (x1-x2) ** 2   +  (y1-y2) ** 2 );

        individ.fitness = 1 / ( 1 + individ.distance );
    });
}


function rouletteSelection(popula) {

    const totalFitnesses = popula.reduce((acc, ind) => acc + ind.fitness, 0);
    const probabilities = popula.map(ind => ind.fitness / totalFitnesses);


    let rand = Math.random();
    let cumulativeProbability = 0;

    for (let i = 0; i < popula.length; i++) {

        cumulativeProbability += probabilities[i];

        if (rand < cumulativeProbability) {

            return popula[i];
        }
    }

}

function crossover(parent1, parent2) {

    console.log("------------------PARENTS--------------");
    console.log(parent1);
    console.log(parent2);

    let crossoverPoint = Math.floor(Math.random() * parent1.length);
    
    let child1 = [];
    let child2 = [];

    console.log("------------------CHILDS--------------");

    for (let i = 0; i < parent1.length; i++) {

        // if i is greater than point so we left the same genes
        if (i < crossoverPoint) {
            
            child1.push(parent1[i]);
            child2.push(parent2[i]);

        } else {
            child1.push(parent2[i]);
            child2.push(parent1[i]);
        }
    }

    child1 = new Individual(child1);
    child2 = new Individual(child2);

    console.log(child1);
    console.log(child2);

    console.log();

    return [child1, child2];
}


function mutate(individual) {
    let geneId = Math.floor(Math.random() * individual.length);
    let operation = Math.floor(Math.random() * 2) + 1; // 1 - plus, 2 - minus

    let mutatedIndividual = [...individual];

    // If operation is plus
    if (operation == 1) {
        if (individual[geneId] + 1 <= 4) {
            mutatedIndividual[geneId] = mutatedIndividual[geneId] + 1;
        } else {
            mutatedIndividual[geneId] = mutatedIndividual[geneId] - 1;
        }
    }

    // If operation is minus
    else {
        if (individual[geneId] - 1 >= 0) {
            mutatedIndividual[geneId] = mutatedIndividual[geneId] - 1;
        } else {
            mutatedIndividual[geneId] = mutatedIndividual[geneId] + 1;
        }
    }

    return mutatedIndividual;
}

//-----------------------------FUNCTIONS END-----------------------------\\










//-----------------------------GENETIC ALGORITHM-----------------------------\\
export function start_genetic_algorithm(popSize, maxGen, pMutate) {
    let population = createPopulation(popSize);

    for (let generation = 0; generation < maxGen; generation++) {

        let coordinates = calculateCoordinates(population);

        AllCoordsWormsDict[generation] = coordinates;

        fitness_function(population, generation);


        let newPopulation = [];
        for (let i = 0; i < Math.floor(popSize / 2); i++) {
            let parent1 = rouletteSelection(population);
            let parent2 = rouletteSelection(population);

            let [child1, child2] = crossover(parent1, parent2);

            if (Math.random() < pMutate) {
                child1 = mutate(child1);
            }


            newPopulation.push(child1, child2);

        }

        if (newPopulation.length < popSize) {
            newPopulation.push(rouletteSelection(population));
        }

        population = newPopulation;
        
    }

    let coordinates = calculateCoordinates(population);

    AllCoordsWormsDict[maxGen] = coordinates;

    fitness_function(population, maxGen);

    const fitnesses = population.map(individual => individual.fitness);
    const maxFitness = Math.max(...fitnesses);
    const bestIndex = fitnesses.indexOf(maxFitness);
    const bestIndividual = population[bestIndex]; 

    console.log("\n\n-----The best individual-----");
    console.log(bestIndividual);


}


//-----------------------------GENETIC ALGORITHM END-----------------------------\\