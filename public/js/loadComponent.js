document.addEventListener("DOMContentLoaded", function() {
  fetch('/dynamic-components/footer.html')
    .then(response => response.text())
    .then(data => {
      document.querySelector('footer').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));
});

document.addEventListener("DOMContentLoaded", function() {
  fetch('/dynamic-components/navbar.html')
    .then(response => response.text())
    .then(data => {
      document.querySelector('nav').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));
});