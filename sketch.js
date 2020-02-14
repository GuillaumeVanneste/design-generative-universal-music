/*
- paramètre random -
nom du groupe
date -> concert
position géographique
salle / siege
(heure de debut et fin)
Nom du spectateur

- inspi -
luminescence


- TODO -
code bar sur les deux parts
nom du concert
infos+

Visu génératif --> nom du spectateur + place + timestamp transaction

*/

/*-------------------*/

// Settings
let ticket = {};
let detachable = {};
let barcode = {};
let data = {};
let seed;
let infoBox = {};
let myTab = [
    ['Room', 'D'],
    ['Sit', '24'],
    ['AA', 'XX'],
    ['BB', 'YY'],
];


// function preload() {
//     webImage = loadImage('https://images.unsplash.com/photo-1566590671647-bc34ac594c1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80');
// }

ticket.rowCount = 20;
ticket.columnCount = 20;
ticket.rectWidth = 20;

detachable.startX = 432;
detachable.startY = 0;
detachable.borderCount = 40;

infoBox.startX = detachable.startX + 21;
infoBox.startY = 10;
infoBox.widht = 26;
infoBox.height = 46;
infoBox.marginBetween = 10;

function setup() {
    //pixelDensity(4);
    ticket.seed = random(500);
    frameRate(20);
    
    // DATA
    // background
    data.name = "nomdugroupe";
    data.month = floor(random(1, 12));
    data.color = data.name.length * data.month;

    // pattern
    ticket.startX = 75;
    ticket.startY = 75;
    ticket.patternW = 431;
    ticket.patternH = 240;

    data.buyer = "John Doe"
    data.place = floor(random(1, 760));
    data.dateTransaction = Date.now();
    data.pattern = (data.buyer.length * data.place * data.dateTransaction)%360;

    // TICKET
    ticket.totalWidht = 576;
    ticket.totalHeight = 240;
    //ticket.bgColor = color(`hsb(${data.color}, 50%, 40%)`);
    ticket.bgColor = color(`hsb(${data.color}, 50%, 20%)`);
    console.log("BG Color : ",ticket.bgColor);
    
    // Motif généré
    ticket.randomColors = [];
    for (let i = 0; i < ticket.rowCount; i++) {
        let c = color(`hsba(${data.pattern},${random(20,100)}%,${random(30,100)}%,0.1)`);
        ticket.randomColors.push(c);
    };
    console.log("Pattern Color : ",ticket.randomColors);
    console.log("Pattern : ",data.pattern);
    ticket.patternColor = color(`hsb(${data.pattern}, 50%, 20%)`);


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
    barcode.startX = detachable.startX + 90;
    barcode.startY = ticket.totalHeight/3;
    barcode.rectWidth = 40;
    barcode.rectTotalHeight = ticket.totalHeight/3;
    barcode.rectCount = 25;
    barcode.seed = random(500);

    createCanvas(ticket.totalWidht, ticket.totalHeight); // Canvas size

    
}

function draw() {
    background(ticket.bgColor);
    drawDetachablePart()
    drawLeftPart(432, 240)
    push();
    translate(detachable.startX - barcode.rectTotalHeight*0.2, ticket.totalHeight - barcode.rectWidth * 1.2);
    rotate(radians(90));
    drawBarcode(0, 0);
    pop();
    drawBarcode(barcode.startX, barcode.startY);

    for(let i=0; i < myTab.length; i++) {
        drawInfo(infoBox.startX, infoBox.startY + (infoBox.height + infoBox.marginBetween) * i, myTab[i][0], myTab[i][1]);
    }
    
}


function drawLeftPart(w, h) {
    randomSeed(ticket.seed);
    noStroke();
    push();
    let cellW = ticket.patternW / ticket.columnCount;
    let cellH = ticket.patternH / ticket.rowCount;
    for (let i = 0; i < ticket.columnCount; i++) {
        for (let j = 0; j < ticket.rowCount; j++) {
            let x = i * cellW;
            let y = j * cellH;
            fill(ticket.randomColors[i]);
            push();
            rect(x, y, random(cellW)*ticket.rectWidth, random(cellH))*ticket.rectTotalHeight;
            pop();
        };
    };
    pop();
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

function drawInfo(x, y, label, value) {
    resetMatrix();
    let c = color(255);
    fill(c);
    rect(x, y, infoBox.widht, infoBox.height, 20);
    push();
    translate(x + 20 , y + 25);
    rotate(radians(-90));
    textSize(16);
    fill(0);
    textAlign(CENTER);
    text(value, 0, 0);
    pop();
    translate(x + 44, y + 25);
    rotate(radians(-90));
    textSize(16);
    fill(c);
    textAlign(CENTER);
    text(label, 0, 0);
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

