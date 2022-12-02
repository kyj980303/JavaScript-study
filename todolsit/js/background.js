const images = [
  "bg1.jpeg",
  "bg2.jpeg",
  "bg3.jpeg"
];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}`;

document.body.appendChild(bgImage);


// console.log(bgImage);