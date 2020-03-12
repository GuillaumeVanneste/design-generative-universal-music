const step0 = document.querySelector('.step0');
const posters = step0.querySelectorAll('.poster');
const next = step0.querySelector('#next');

posters.forEach((poster) => {
    poster.addEventListener('mousedown', (e) => {
        if(poster.classList.contains("selected")) {
            posters.forEach(function(poster) {
                poster.classList.remove("selected");
            });
            data.name = "";
            data.style = "";
        } else {
            posters.forEach(function(poster) {
                poster.classList.remove("selected");
            });
            e.preventDefault();
            poster.classList.add("selected");
            data.name = poster.children[1].textContent;
            data.style = poster.children[2].textContent;
            data.color = (count(data.name) * data.style.length)%360;
            console.log(data.color);
        }
    });
});

const step1 = document.querySelector('.step1');
const firstname = step1.querySelector('#firstname');
const lastname = step1.querySelector('#lastname');
const previous1 = step1.querySelector('#previous1');
const next1 = step1.querySelector('#next1');

const step2 = document.querySelector('.step2');
const previous2 = step2.querySelector('#previous2');
const next2 = step2.querySelector('#next2');

firstname.addEventListener("keyup", () => {
    user_firstname = firstname.value;
})

lastname.addEventListener("keyup", () => {
    user_lastname = lastname.value;
})

next.addEventListener("mousedown", () => {
    step0.classList.add("hidden");
    step1.classList.remove("hidden");
})

next1.addEventListener("mousedown", () => {
    step1.classList.add("hidden");
    step2.classList.remove("hidden");
})

previous1.addEventListener("mousedown", () => {
    step0.classList.remove("hidden");
    step1.classList.add("hidden");
})

previous2.addEventListener("mousedown", () => {
    step1.classList.remove("hidden");
    step2.classList.add("hidden");
})


function str_split(string, split_length) {
    //  discuss at: http://phpjs.org/functions/str_split/
    // original by: Martijn Wieringa
    // improved by: Brett Zamir (http://brett-zamir.me)
    // bugfixed by: Onno Marsman
    //  revised by: Theriault
    //  revised by: Rafał Kukawski (http://blog.kukawski.pl/)
    //    input by: Bjorn Roesbeke (http://www.bjornroesbeke.be/)
    //   example 1: str_split('Hello Friend', 3);
    //   returns 1: ['Hel', 'lo ', 'Fri', 'end']
  
    if (split_length == null) {
      split_length = 1;
    }
    if (string == null || split_length < 1) {
      return false;
    }
    string += '';
    var chunks = [],
      pos = 0,
      len = string.length;
    while (pos < len) {
      chunks.push(string.slice(pos, pos += split_length));
    }
  
    return chunks;
  }
  
  
  function count(string){
      var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  
      var splitted_string = str_split(string);
  
      var count = 0;
      for (i = 0; i < splitted_string.length; i++) { 
          var letterPosition = alphabet.indexOf(splitted_string[i])+1;
          count = count + letterPosition;
      }
      return count;
  }
  
  