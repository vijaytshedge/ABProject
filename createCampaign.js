const fs = require('fs');

function addExperience() {
  const experienceFields = document.getElementById('experienceFields');
  const experienceDiv = document.createElement('div');
  experienceDiv.classList.add('experience');

  experienceDiv.innerHTML = `
    <hr>
    <label for="expName">Experience Name:</label>
    <input type="text" class="expName"><br><br>
    <label for="text">HTML:</label>
    <textarea class="text"></textarea><br><br>
    <label for="code">Code:</label>
    <textarea class="code"></textarea><br><br>
  `;

  experienceFields.appendChild(experienceDiv);
}

function saveData() {
  const name = document.getElementById('name').value;
  const type = document.getElementById('type').value;
  const experienceDivs = document.querySelectorAll('.experience');

  let experiences = [];

  experienceDivs.forEach(expDiv => {
    const expName = expDiv.querySelector('.expName').value;
    const text = expDiv.querySelector('.text').value;
    const code = expDiv.querySelector('.code').value;

    experiences.push({
      experienceName: expName,
      text: text,
      code: code
    });
  });

  const data = {
    name: name,
    type: type,
    experiences: experiences
  };

  const jsonData = JSON.stringify(data);

  // For demonstration purposes, you can console log the JSON data.
  console.log(jsonData);
  const filePath = 'data.json';

// Write JSON data to file
fs.writeFile(filePath, jsonData, (err) => {
  if (err) {
    console.error('Error writing JSON file:', err);
  } else {
    console.log('JSON data has been written to', filePath);
  }
});

  // You can use AJAX or fetch to send this data to a server or write it to a file.
  // Example: You can send this data to a server using fetch.
  // fetch('/saveData', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: jsonData,
  // })
  // .then(response => {
  //   console.log('Data saved successfully!');
  // })
  // .catch(error => {
  //   console.error('Error saving data:', error);
  // });
}
