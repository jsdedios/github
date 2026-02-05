(function () {
  'use strict';


  const myForm = document.querySelector('#myform');


  const adj1 = document.querySelector('#adj1').value;

  const verb1 = document.querySelector('#verb1').value;

  const verb2 = document.querySelector('#verb2').value;

  const adj2 = document.querySelector('#adj2').value;

  const adj3 = document.querySelector('#adj3').value;

  const time = document.querySelector('#time').value;

  const pastverb = document.querySelector('#pastverb').value;

  const emotion1 = document.querySelector('#emotion1').value;

  const emotion2 = document.querySelector('#emotion2').value;

  const noun1 = document.querySelector('#noun1').value;

  const noun2 = document.querySelector('#noun2').value;

  const adj4 = document.querySelector('#adj4').value;

  myForm.addEventListener('submit', function (event) {
    event.preventDefault();

    
    const storyHTML = `
      <p class ="story">
        On one calm afternoon, a group of ${adj1} minded people came together to work on a new,
        never before seen visual style. They ${verb1} all afternoon, ensuring that they had all
        their preparations ready to ${verb2} on their whiteboards.

        “I think it should be ${adj2},” said the first one.
        “I think it should be ${adj3}!” said another.
        “You’re all being silly—clearly it should call back to the ${time} era,” said the third.

        They all ${pastverb} some more, and ultimately came up with something they could be
        ${emotion1} about.

        Their new aesthetic style, ${noun1}-wave, was a remarkable ${noun2}!
        With its clear inspiration from ${emotion2} and its ${adj4} style,
        it made waves across the world and was renowned as the most beautiful aesthetic on earth.
      </p>
    `;

    
    myForm.innerHTML = storyHTML;
  });
})();
