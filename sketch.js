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
Animation generatif
nom du concert

Visu génératif --> nom du spectateur + place + timestamp transaction

*/

/*-------------------*/

// Settings
let ticket = {};
let detachable = {};
let barcode = {};
let seed;
let infoBox = {};
let data = {};
let user_firstname;
let user_lastname;
let tabData = [
    ['Sit', '24'],
    ['Rank', 'D'],
    ['Block', 'XX'],
    ['Gate', 'YY'],
];

//Font Preload

let exo2;
let narrow;
let saira;
function preload() {
    // exo2 = loadFont('assets/fonts/Exo_2/Exo2-Regular.ttf');
    // narrow = loadFont('assets/fonts/PT_Sans_Narrow/PTSansNarrow-Regular.ttf');
    // saira = loadFont('assets/fonts/Saira_Extra_Condensed/SairaExtraCondensed-Regular.ttf');
}


/* ----------------------- */

ticket.rowCount = 20;
ticket.columnCount = 20;
ticket.rectWidth = 20;

detachable.startX = 432;
detachable.startY = 0;
detachable.borderCount = 40;

function setup() {
    //pixelDensity(4);
    ticket.seed = random(500);
    frameRate(20);
    

    //textFont(exo2);
    //textFont(narrow);
    //textFont(saira);
    
    // DATA
    // background
    data.name = "";
    data.month = floor(random(1, 12));
    data.color = data.name.length * data.month;

    // pattern
    ticket.startX = 75;
    ticket.startY = 75;
    ticket.patternW = 431;
    ticket.patternH = 240;

    data.buyer = "";
    data.place = floor(random(1, 760));
    data.dateTransaction = Date.now();
    data.pattern = (data.buyer.length * data.place * data.dateTransaction)%360;

    // TICKET
    ticket.totalWidht = 576;
    ticket.totalHeight = 240;
    //ticket.bgColor = color(`hsb(${data.color}, 50%, 40%)`);
    ticket.bgColor = color(`hsb(${data.name.length}, 50%, 20%)`);
    console.log("BG Color : ",ticket.bgColor);

    // INFOBOX
    infoBox.startX = detachable.startX + 21;
    infoBox.widht = 26;
    infoBox.height = 38;
    infoBox.marginBetween = 10;
    infoBox.startY = (ticket.totalHeight - (infoBox.height + (infoBox.height + infoBox.marginBetween) * 3)) / 2;
    console.log(infoBox.startY);


    // Motif généré
    ticket.randomColors = [];
    for (let i = 0; i < ticket.rowCount; i++) {
        let c = color(`hsba(${data.pattern},${random(20,100)}%,${random(30,100)}%,0.2)`);
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
    barcode.startY = ticket.totalHeight/4;
    barcode.rectWidth = 40;
    barcode.rectTotalHeight = ticket.totalHeight/2;
    barcode.rectCount = 25;
    barcode.seed = random(500);

    let canva = createCanvas(ticket.totalWidht, ticket.totalHeight); // Canvas size
    canva.parent('ticket');

    
}

function draw() {
    background(color(`hsb(${data.name.length * 5}, 50%, 20%)`));
    drawLeftPart(432, 240)
    drawDetachablePart()
    push();
    translate(detachable.startX - barcode.rectTotalHeight*0.2, ticket.totalHeight - barcode.rectWidth * 1.2);
    rotate(radians(90));
    drawBarcode(0, 0);
    for(let i=0; i < tabData.length; i++) {
        drawInfo(-5, 180 + (infoBox.height + infoBox.marginBetween) * i, tabData[i][0], tabData[i][1]);
    }
    pop();
    drawBarcode(barcode.startX, barcode.startY);

    for(let i=0; i < tabData.length; i++) {
        drawInfo(infoBox.startX, infoBox.startY + (infoBox.height + infoBox.marginBetween) * i, tabData[i][0], tabData[i][1]);
    }

    drawUserInfo(detachable.startX - 12, 72, user_firstname, user_lastname);
}


function drawLeftPart(w, h) {
    data.buyer = "John Doe";
    if(user_firstname) {data.buyer = user_firstname;}
    if(user_lastname) {data.buyer += user_lastname;}
    data.pattern = (data.buyer.length * data.place * data.dateTransaction)%360;
    ticket.randomColors = [];
    for (let i = 0; i < ticket.rowCount; i++) {
        let c = color(`hsba(${data.pattern},${random(20,100)}%,${random(30,100)}%,0.2)`);
        ticket.randomColors.push(c);
    };
    randomSeed(ticket.seed);
    noStroke();
    push();
    let cellW = ticket.patternW / ticket.columnCount;
    let cellH = ticket.patternH / ticket.rowCount;
    for (let i = 0; i < ticket.columnCount; i++) {
        for (let j = 0; j < ticket.rowCount; j++) {
            let x = i * cellW;
            let y = j * cellH;
            rotate(random(0, data.place));
            fill(ticket.randomColors[i]);
            push();
            rect(x, y, random(cellW)*ticket.rectWidth*data.place, random(cellH))*ticket.rectTotalHeight*data.place;
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
    let c = color(`hsb(${data.pattern}, 50%, 90%)`); // Si h = une certaine valeur -> passer la font en white ?
    fill(c);
    rect(x, y, infoBox.widht, infoBox.height, 20);
    push();
    translate(x + infoBox.widht/1.4 , y + infoBox.height/2);
    rotate(radians(-90));
    textSize(16);
    fill(0);
    textAlign(CENTER);
    text(value, 0, 0);
    pop();
    push();
    translate(x + infoBox.widht + 18, y + infoBox.height/2);
    rotate(radians(-90));
    textSize(16);
    fill(c);
    textAlign(CENTER);
    text(label, 0, 0);
    pop();
}

function drawUserInfo(x, y, firstname, lastname) {
    textSize(32);
    fill(255);
    textAlign(RIGHT);
    text(data.name, x, y - 32);
    textSize(24);
    text(firstname, x, y);
    text(lastname, x, y + 24);
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

