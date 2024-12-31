const image = document.getElementById('productImg');
const btn = document.getElementsByClassName('btn');

// Add event listeners to change the image on button click
btn[0].addEventListener('click', function() {
    image.src = './img1/1.png';
    for (let bt of btn) {
        bt.classList.remove('active');
    }
    this.classList.add('active');
});
btn[1].addEventListener('click', function() {
    image.src = './img1/2.png';
    for (let bt of btn) {
        bt.classList.remove('active');
    }
    this.classList.add('active');
});
btn[2].addEventListener('click', function() {
    image.src = './img1/3.png';
    for (let bt of btn) {
        bt.classList.remove('active');
    }
    this.classList.add('active');
});

// Add zoom functionality
const zoomWindow = document.createElement('div');
zoomWindow.classList.add('zoom-window');
document.body.appendChild(zoomWindow);

image.addEventListener('mousemove', function(event) {
    const rect = image.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const zoomLevel = 2; // Adjust the zoom level as needed

    let zoomImage = zoomWindow.querySelector('img');
    if (!zoomImage) {
        zoomImage = document.createElement('img');
        zoomImage.src = image.src;
        zoomWindow.appendChild(zoomImage);
    } else {
        zoomImage.src = image.src;
    }

    zoomWindow.style.display = 'block';

    // Calculate the position of the zoom window
    let zoomWindowX = event.pageX -20 ; // Default position to the right of the cursor
    let zoomWindowY = event.pageY - 20; // Default position below the cursor

    // Adjust if zoom window is outside the viewport
    const zoomWindowWidth = zoomWindow.offsetWidth;
    const zoomWindowHeight = zoomWindow.offsetHeight;

    if (zoomWindowX + zoomWindowWidth > window.innerWidth) {
        zoomWindowX = event.pageX - zoomWindowWidth - 20; // Position to the left of the cursor
    }
    if (zoomWindowY + zoomWindowHeight > window.innerHeight) {
        zoomWindowY = event.pageY - zoomWindowHeight - 20; // Position above the cursor
    }

    zoomWindow.style.left = `${zoomWindowX}px`;
    zoomWindow.style.top = `${zoomWindowY}px`;

    const zoomWidth = rect.width * zoomLevel;
    const zoomHeight = rect.height * zoomLevel;

    zoomImage.style.width = `${zoomWidth}px`;
    zoomImage.style.height = `${zoomHeight}px`;

    const posX = -((x / rect.width) * (zoomWidth - zoomWindow.offsetWidth));
    const posY = -((y / rect.height) * (zoomHeight - zoomWindow.offsetHeight));

    zoomImage.style.left = `${posX}px`;
    zoomImage.style.top = `${posY}px`;
});

image.addEventListener('mouseleave', function() {
    zoomWindow.style.display = 'none';
});