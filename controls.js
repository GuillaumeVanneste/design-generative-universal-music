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
        } else {
            posters.forEach(function(poster) {
                poster.classList.remove("selected");
            });
            e.preventDefault();
            poster.classList.add("selected");
            data.name = poster.childNodes[1].textContent;
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