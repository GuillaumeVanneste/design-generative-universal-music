const step0 = document.querySelector('.step0');
const step1 = document.querySelector('.step1');
const step2 = document.querySelector('.step2');
const step3 = document.querySelector('.step3');

// First step
const posters = step0.querySelectorAll('.poster');
const next = step0.querySelector('#next');
const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

posters.forEach((poster) => {
    poster.addEventListener('mousedown', (e) => {
        // If already selected, remove the changes
        if(poster.classList.contains("selected")) {
            posters.forEach(function(poster) {
                poster.classList.remove("selected");
            });
            concertSelection("reset");
        } else { // Selecting a concert
            posters.forEach(function(poster) {
                poster.classList.remove("selected");
            });
            e.preventDefault();
            poster.classList.add("selected");
            concertSelection(poster);
        }
    });
});

next.addEventListener("mousedown", () => {
    for(let i = 0; i < posters.length; i++) {
        if(posters[i].classList.contains("selected")) {
            step0.classList.add("hidden");
            step1.classList.remove("hidden");
        }
    }
})


// 2nd step
const firstname = step1.querySelector('#firstname');
const lastname = step1.querySelector('#lastname');
const previous1 = step1.querySelector('#previous1');
const next1 = step1.querySelector('#next1');

firstname.addEventListener("keyup", () => {
    data.userFirstname = firstname.value;
})

lastname.addEventListener("keyup", () => {
    data.userLastname = lastname.value;
})

next1.addEventListener("mousedown", () => {
    if(firstname.value && lastname.value) {
        step1.classList.add("hidden");
        step2.classList.remove("hidden");
    }
})

previous1.addEventListener("mousedown", () => {
    step0.classList.remove("hidden");
    step1.classList.add("hidden");
})

// 3rd step
const block = step2.querySelector('#block');
const row = step2.querySelector('#row');
const previous2 = step2.querySelector('#previous2');
const next2 = step2.querySelector('#next2');

next2.addEventListener("mousedown", () => {
    step2.classList.add("hidden");
    step3.classList.remove("hidden");
    data.seat = data.seatTemp;
    data.row = row.value;
    tabData[0][1] = data.seat;
    tabData[1][1] = data.row;
    tabData[2][1] = block.value;
    tabData[3][1] = count(block.value);
})

previous2.addEventListener("mousedown", () => {
    step1.classList.remove("hidden");
    step2.classList.add("hidden");
    data.seat = 0;
    tabData[0][1] = '';
    tabData[1][1] = '';
    tabData[2][1] = '';
    tabData[3][1] = '';
})

// 4th step
const previous3 = step3.querySelector('#previous3');
const downloadButton = step3.querySelector('#download');

previous3.addEventListener("mousedown", () => {
    step2.classList.remove("hidden");
    step3.classList.add("hidden");
})

downloadButton.addEventListener("mousedown", () => {
    saveCanvas(data.artistName + "_" + data.buyer + "_" + data.month + "_" + data.day, 'jpg');
})


const str_split = (string, split_length) => {  
    if (split_length == null)
        split_length = 1;
    
    if (string == null || split_length < 1)
        return false;
    
    string += '';
    let chunks = [],
        pos = 0,
        len = string.length;

    while (pos < len) {
        chunks.push(string.slice(pos, pos += split_length));
    }
  
    return chunks;
}
  
  
const count = (string) => {
    const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  
    const splitted_string = str_split(string);

    let count = 0;
    for (i = 0; i < splitted_string.length; i++) { 
        let letterPosition = alphabet.indexOf(splitted_string[i])+1;
        count = count + letterPosition;
    }
    return count;
}

const concertSelection = (e) => {
    if(e === "reset" ) {
        data.artistName = "";
        data.day = "";
        data.month = 0;
        data.year = "";
        data.style = "";
        data.color = 0;
    } else {
        data.artistName = e.children[1].textContent;
        data.day = e.children[2].dataset["day"];
        data.month = e.children[2].dataset["month"];
        data.year = e.children[2].dataset["year"];
        data.style = e.children[3].textContent;
        data.color = (count(data.artistName) * data.style.length * data.month)%360;
    }
}