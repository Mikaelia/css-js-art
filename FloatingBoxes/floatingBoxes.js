const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.style.width = "100%";
canvas.style.height = "100%";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const debounce = (func) => {
  let timer;
  return (event) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, 100, event);
  };
};

window.addEventListener(
  "resize",
  debounce(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
  })
);

let mouse = {
  y: undefined,
  x: undefined,
};

let maxWidth = 40;

let colorArray = [
  "#D90282",
  "#FF1249",
  "#3C9EE3",
  "#48C7EE",
  "#FF6638",
  "#B0CC14",
  "#FFCB03",
  "#6D59EF",
  "#5F40AC",
];

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  console.log(mouse);
});

class Cube {
  constructor(xcoord, ycoord, width, dx, dy) {
    this.xcoord = xcoord;
    this.ycoord = ycoord;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.width = width;
    this.minWidth = width;
    this.dx = dx;
    this.dy = dy;
  }

  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.rect(this.xcoord, this.ycoord, this.width, this.width);
    c.fill();
  }

  update() {
    if (this.xcoord + this.width > canvas.width || this.xcoord - this.width < 0)
      this.dx = -this.dx;
    if (
      this.ycoord + this.width > canvas.height ||
      this.ycoord - this.width < 0
    )
      this.dy = -this.dy;

    this.xcoord += this.dx;
    this.ycoord += this.dy;

    // interactivity

    if (
      mouse.x - this.xcoord < 50 &&
      mouse.x - this.xcoord > -50 &&
      mouse.y - this.ycoord < 50 &&
      mouse.y - this.ycoord > -50
    ) {
      if (this.width < maxWidth) {
        this.width += 1;
      }
    } else if (this.width > this.minWidth) {
      this.width -= 1;
    }

    this.draw();
  }
}

let cubeArray = [];

function init() {
  cubeArray = [];
  for (let i = 0; i < 800; i++) {
    let width = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - width * 2) + width,
      y = Math.random() * (innerHeight - width * 2) + width;
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;
    cubeArray.push(new Cube(x, y, width, dx, dy));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < cubeArray.length; i++) {
    cubeArray[i].update();
  }
}

animate();
init();
