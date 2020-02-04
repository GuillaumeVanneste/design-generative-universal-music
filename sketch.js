/*
- paramètre random -
nom du groupe
date -> concert
position géographique
salle / siege
heure de debut et fin

- inspi -
luminescence


- TODO -
code bar sur les deux parts
nom du concert
infos+

*/

/*-------------------*/

// Settings
let ticket = {};
let detachable = {};
let barcode = {};
let data = {};

// function preload() {
//     webImage = loadImage('https://images.unsplash.com/photo-1566590671647-bc34ac594c1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80');
// }

function setup() {
    //pixelDensity(4);
    
    // Data
    data.name = "nomdugroupe";
    data.month = floor(random(1, 12));
    data.color = data.name.length * data.month;

    // ticket
    ticket.totalWidht = 576;
    ticket.totalHeight = 240;
    //ticket.bgColor = color(`hsb(${data.color}, 50%, 40%)`);
    ticket.bgColor = color(`hsb(${data.color}, 50%, 20%)`);

    ticket.rowCount = 20;
    ticket.columnCount = 20;
    ticket.rectWidth = 20;

    detachable.startX = 432;
    detachable.startY = 0;
    detachable.borderCount = 40;

    /* Web Image random color
    ticket.randomColors = [];
    for(let i = 0; i < 10; i++) {
        let x = random(webImage.width);
        let y = random(webImage.height);
        let c = webImage.get(x,y);
        ticket.randomColors.push(c);
    }
    */
    
    // Barcode
    barcode.startX = detachable.startX + 70;
    barcode.startY = 70;
    barcode.rectWidth = 50;
    barcode.rectTotalHeight = 100;
    barcode.rectCount = 25;
    barcode.seed = random(500);

    createCanvas(ticket.totalWidht, ticket.totalHeight); // Canvas size

    
}

function draw() {
    background(ticket.bgColor);
    drawDetachablePart()
    drawBarcode(barcode.startX, barcode.startY);
    drawBarcode(detachable.startX - barcode.rectWidth, ticket.totalHeight - barcode.rectTotalHeight);
    drawLeftPart(432, 240)
    
}

function drawLeftPart(w, h) {

}

function drawDetachablePart() {
    noStroke();
    let h = ticket.totalHeight / detachable.borderCount;
    for (let i = 0; i < 20  ; i++) {
        let c = color(255);
        fill(c); // Fill color;
        let y = detachable.startY + (i * h * 2);
        rect(detachable.startX, y, 2, h);
    }
}

function drawBarcode(posX, posY) {
    randomSeed(barcode.seed);
    noStroke(); // No outline stroke
    let h = barcode.rectTotalHeight / barcode.rectCount;
    for (let i = 0; i < barcode.rectCount; i++) {
        let c = color(255);
        fill(c); // Fill color
        let y = posY + (i * h);
        rect(posX, y, barcode.rectWidth, random(h));
    }
}

function keyTyped() {
    if (key === 's') {
        saveCanvas('mySketch', 'jpg');
    }

    if(key === 'q') {
        barcode.seed = random(500);
    }
}


/*
Alpha color example
let c = s.randomColors[floor(random(s.randomColors.length))];
let alpha = 10;
let c_r = red(c);
let c_g = green(c); 
let c_b = blue(c); 
fill(c_r, c_g, c_b, alpha);
*/

