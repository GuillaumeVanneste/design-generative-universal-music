/*
- paramètre random -
nom du groupe
date -> concert
salle / siege
Nom du spectateur

- inspi -
luminescence

- TODO -
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
let date= {};
let tabData = [
    ['Seat', ''],
    ['Row', ''],
    ['Block', ''],
    ['Gate', ''],
];

//Font Preload

let exo2;
let narrow;
let saira;
function preload() {
    exo2 = loadFont('assets/fonts/Exo_2/Exo2-Regular.ttf');
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
    

    textFont(exo2);
    //textFont(narrow);
    //textFont(saira);
    
    // DATA
    // background
    data.artistName = "";
    data.style = "";
    data.month = "";
    data.color = data.artistName.length * data.month;

    // pattern
    ticket.startX = 75;
    ticket.startY = 75;
    ticket.patternW = 431;
    ticket.patternH = 240;

    data.buyer = "";
    data.seatTemp = floor(random(1, 760));
    data.gateTemp = floor(random(1,4));
    data.seat = 0;
    data.row = 0;
    data.dateTransaction = Date.now();
    data.pattern = (data.buyer.length * (data.seat + 1) * data.dateTransaction)%360;

    // TICKET
    ticket.totalWidht = 576;
    ticket.totalHeight = 240;
    //ticket.bgColor = color(`hsb(${data.color}, 50%, 40%)`);
    ticket.bgColor = color(`hsb(${data.artistName.length}, 50%, 20%)`);
    console.log("BG Color : ",ticket.bgColor);

    // INFOBOX
    infoBox.startX = detachable.startX + 21;
    infoBox.widht = 26;
    infoBox.height = 38;
    infoBox.marginBetween = 10;
    infoBox.startY = (ticket.totalHeight - (infoBox.height + (infoBox.height + infoBox.marginBetween) * 3)) / 2;
    console.log(infoBox.startY);

    //Date position
    date.posX = 72;
    date.posY = 56;

    // Motif généré
    ticket.randomColors = [];
    for (let i = 0; i < ticket.rowCount; i++) {
        let c = color(`hsba(${data.pattern},${random(20,100)}%,${random(30,100)}%,0.2)`);
        ticket.randomColors.push(c);
    };
    ticket.patternColor = color(`hsb(${data.pattern}, 50%, 20%)`);
    
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
    background(color(`hsb(${data.color}, 50%, 20%)`));
    drawLeftPart(432, 240)
    drawDetachablePart()
    push();
    translate(detachable.startX - 16, ticket.totalHeight - barcode.rectWidth - 16);
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

    // Draw date, artist's name and buyer info
    drawUserInfo(
        date.posX, date.posY,
        data.day, monthArray[data.month - 1], data.year, data.artistName,
        data.userFirstname, data.userLastname
    );
}


function drawLeftPart(w, h) {
    data.buyer = "";
    if(data.userFirstname) {data.buyer = data.userFirstname;}
    if(data.userLastname) {data.buyer += "_" + data.userLastname;}
    data.pattern = (data.buyer.length * data.dateTransaction)%360;
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
            rotate(data.seat * data.row);
            fill(ticket.randomColors[i]);
            push();
            rect(x, y, random(cellW)*ticket.rectWidth*data.seat, random(cellH))*ticket.rectTotalHeight*data.seat;
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
    let c = color(`hsb(${data.pattern}, 50%, 90%)`);
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

function drawUserInfo(dateX, dateY, day, month, year, artistName, firstname, lastname) {
    // Concert's date info
    textSize(56);
    fill(255);
    textAlign(RIGHT);
    text(day, dateX, dateY);
    textSize(24);
    textAlign(LEFT);
    text(month, dateX, dateY - 24);
    text(year, dateX, dateY);
    // Artist & buyer's info
    textSize(32);
    textAlign(RIGHT);
    text(artistName, detachable.startX - 16, 34);
    textSize(24);
    text(firstname, detachable.startX - 16, 72);
    text(lastname, detachable.startX - 16, 96);
}

function keyTyped() {
    if (key === 's') {
        saveCanvas(data.artistName + "_" + data.buyer + "_" + data.month + "_" + data.day, 'jpg');
    }

    if(key === 'q') {
        barcode.seed = random(500);
    }
}