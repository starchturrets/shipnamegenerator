'use strict';

//Let's not make too many calls to document.querySelector()

const firstInput = document.querySelector('#first_input');
const secondInput = document.querySelector('#second_input');
const h2 = document.querySelector('h2');
const output = document.querySelector('#output');

firstInput.focus();
firstInput.addEventListener('keyup', ev => {
  ev.preventDefault();

  //If the key pressed is the enter key, switch focus
  ev.keyCode === 13 && firstInput.value ? secondInput.focus() : '';
});
h2.addEventListener('click', () => {
  firstInput.value = null;
  secondInput.value = null;
  output.innerHTML = null;
});
secondInput.addEventListener('keyup', ev => {
  ev.preventDefault();
  ev.keyCode === 13 && secondInput.value ? splitNames() : '';
});
function splitNames() {
  firstInput.focus();
  const firstName = firstInput.value;
  const secondName = secondInput.value;
  //Delegate the textboxes' values to the above variables, then clear all forms
  const firstSplit = firstName.split(' ');
  const secondSplit = secondName.split(' ');
  firstInput.value = null;
  secondInput.value = null;
  firstSplit.forEach(firstName => {
    secondSplit.forEach(secondName => ship(secondName, firstName));
  });
}
function ship(firstName, secondName) {
  //Declare an array to hold all the shipnames generated
  const coupleNames = [];
  const mathMethods = [Math.floor, Math.ceil, parseInt]; //Different math methods are used to create slightly different ship names
  mathMethods.forEach(mathMethod => {
    coupleNames.push(createName(firstName, secondName, mathMethod)); //first concatenate the names in the order they were entered
  });
  mathMethods.forEach(mathMethod => {
    coupleNames.push(createName(secondName, firstName, mathMethod)); //Then cocatenate them the other way around
  });
  const filtered = [...new Set(coupleNames)]; //remove duplicate items from the couple names array
  //debugger;
  const section = document.createElement('section');
  section.textContent = `${firstName} and ${secondName} :`;
  const ul = document.createElement('ul');
  section.appendChild(ul);
  filtered.forEach(name => {
    const listItem = document.createElement('li');
    listItem.textContent = name;
    ul.appendChild(listItem);
  });
  output.appendChild(section);
}
function createName(firstName, secondName, mathMethod) {
  const firstNameLength = mathMethod(firstName.length / 2);
  const secondNameLength = mathMethod(secondName.length / 2);
  const firstHalf = firstName.substring(0, firstNameLength);
  const secondHalf = secondName.substring(secondNameLength, secondName.length);
  const coupleName = firstHalf + secondHalf;
  //debugger;
  return coupleName;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then(reg => {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    })
    .catch(error => {
      // registration failed
      console.log('Registration failed with ' + error);
    });
}
