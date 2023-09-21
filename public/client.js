function fetchExample(example) {
    fetch(`/tree/${example}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById(example).textContent = JSON.stringify(data, null, 2);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  fetchExample('example1');
  fetchExample('example2');
  fetchExample('example3');
  