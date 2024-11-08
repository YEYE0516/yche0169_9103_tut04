//This class draws groups of lines using a class.
//In this class, the start points'X location, start points'Y location, end points'X location, end points'Y location, angle, number of lines in each group, color, space, strokeWeight
//are used as parameters.

class lineGroup {
  constructor(startX, startY, endX, endY, angle, numLines, color, space, strokeWeight) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.angle = angle;
    this.numLines = numLines;
    this.color = color;
    this.lineSpacing = space; 
    this.strokeWeight = strokeWeight;
    this.noiseOffset = random(1000); // Perlin noise offset for animation
  }

  draw() {
    stroke(this.color);//Set the color of the lines.

    strokeWeight(this.strokeWeight);// Set the line thickness.

    // Draw each line in the group at an offset based on line spacing and angle.
    for (let i = 0; i < this.numLines; i++) {
        // Calculate horizontal and vertical offsets for each line.
      let offsetX = cos(this.angle) * this.lineSpacing * i;
      let offsetY = sin(this.angle) * this.lineSpacing * i;

      let noiseX = map(noise(this.noiseOffset + i * 0.1), 0, 1, -100, 100);
      let noiseY = map(noise(this.noiseOffset + i * 0.1 + 100), 0, 1, -100, 100);

      // Draw the line with the calculated offsets.
      line(
        this.startX + offsetX + noiseX,
        this.startY + offsetY + noiseY,
        this.endX + offsetX + noiseX,
        this.endY + offsetY + noiseY
      );
    }

    this.noiseOffset += 0.01;
  }
}
//Storing the line groups into an array.
let groups = [];
let colorMiddle;// Color for the middle layer.
let colorTop; // Color for the top layer.

// perlin noise of each elements' offset
let rectNoiseOffset = 0;
let triNoiseOffset = 200;
let quad1NoiseOffset = 400;
let quad2NoiseOffset = 600;

function setup() {
  createCanvas(windowWidth, windowHeight);// Set canvas to full window size.
  background(255); // Set background to white.

  drawLineGroups();// Draw the initial set of line groups.
  colorMiddle = color(random(145,188), 145, 188);// Define color for the middle layer.
  colorTop = color(random(188,255), 188, 255);// Define color for the top layer.
}

function draw() {
  // make the animation doesn't leave path
  background(255);
  // Draw all base layer line groups stored in the groups array.
  for (let group of groups) {
    group.draw();
  }

  drawMiddleLayer();// Draw the middle layer.
  drawTopLayer();// Draw the top layer.

  // set the noise increment for the elements
  rectNoiseOffset += 0.01;
  triNoiseOffset += 0.05;
  quad1NoiseOffset += 0.01;
  quad2NoiseOffset += 0.01;
}

function drawLineGroups() {
   // Clear existing groups when resizing
  groups = [];

   // Define properties for each line group in the base layer.
  let baseLayer1StartX = 0.15 * windowWidth;
  let baseLayer1StartY = 0.75 * windowHeight;
  let baseLayer1EndX = 0.544 * windowWidth;
  let baseLayer1EndY = 0.4 * windowHeight;
  let baseLayer1Angle = PI / 6.78;

  let baseLayer2StartX = 0.582 * windowWidth;
  let baseLayer2StartY = 0.325 * windowHeight;
  let baseLayer2EndX = 0.72 * windowWidth;
  let baseLayer2EndY = 0.203 * windowHeight;
  let baseLayer2Angle = PI / 6.78;

  let baseLayer3StartX = 0.2314 * windowWidth;
  let baseLayer3StartY = 0.814 * windowHeight;
  let baseLayer3EndX = 0.83 * windowWidth;
  let baseLayer3EndY = 0.285 * windowHeight;
  let baseLayer3Angle = PI / 6.78;
 
  // Set a random color for the base layer.
  let colorBase = color(random(98,126), 98, 126);

 // Add new line groups to the groups array with specified properties.
  groups.push(new lineGroup(baseLayer1StartX, baseLayer1StartY, baseLayer1EndX, baseLayer1EndY, baseLayer1Angle, 3, colorBase, 10, 3));
  groups.push(new lineGroup(baseLayer2StartX, baseLayer2StartY, baseLayer2EndX, baseLayer2EndY, baseLayer2Angle, 3, colorBase, 10, 3));
  groups.push(new lineGroup(baseLayer3StartX, baseLayer3StartY, baseLayer3EndX, baseLayer3EndY, baseLayer3Angle, 10, colorBase, 5, 3));
}

function drawMiddleLayer() {
  // Draw a rectangle as the middle layer in the specified location and size.
  let middleLayerX = 0.38 * windowWidth;
  let middleLayerY = 0.061 * windowHeight;
  let middleLayerWidth = 0.211 * windowWidth;
  let middleLayerHeight = 0.885 * windowHeight;
  
  //set perlin noise for the rectangle
  let noiseX = map(noise(rectNoiseOffset), 0, 1, -50, 50);
  let noiseY = map(noise(rectNoiseOffset + 100), 0, 1, -50, 50);

  noStroke();
  fill(colorMiddle);
  rect(middleLayerX + noiseX, middleLayerY + noiseY, middleLayerWidth, middleLayerHeight);
}

function drawTopLayer() {
  
  //set perlin noise for the triangle
  let noiseX1 = map(noise(triNoiseOffset), 0, 1, -50, 50);
  let noiseY1 = map(noise(triNoiseOffset + 100), 0, 1, -50, 50);

  // Draw a triangle as part of the top layer.
  fill(colorTop);
  triangle(
    0.398 * windowWidth + noiseX1, 0.505 * windowHeight + noiseY1,
    0.166 * windowWidth + noiseX1, 0.711 * windowHeight + noiseY1,
    0.398 * windowWidth + noiseX1, 0.919 * windowHeight + noiseY1
  );
  
  //set perlin noise for the first quad
  let noiseX2 = map(noise(quad1NoiseOffset), 0, 1, -50, 50);
  let noiseY2 = map(noise(quad1NoiseOffset + 100), 0, 1, -50, 50);
   
  // Draw first quadrilateral as part of the top layer.
  fill(colorTop);
  quad(
    0.558 * windowWidth + noiseX2, 0.308 * windowHeight + noiseY2,
    0.585 * windowWidth + noiseX2, 0.283 * windowHeight + noiseY2,
    0.636 * windowWidth + noiseX2, 0.357 * windowHeight + noiseY2,
    0.558 * windowWidth + noiseX2, 0.425 * windowHeight + noiseY2
  );
 
  //set perlin noise for the second quad
  let noiseX3 = map(noise(quad2NoiseOffset), 0, 1, -50, 50);
  let noiseY3 = map(noise(quad2NoiseOffset + 100), 0, 1, -50, 50);
 
  // Draw second quadrilateral as part of the top layer.
  fill(colorTop);
  quad(
    0.558 * windowWidth + noiseX3, 0.5 * windowHeight + noiseY3,
    0.558 * windowWidth + noiseX3, 0.643 * windowHeight + noiseY3,
    0.725 * windowWidth + noiseX3, 0.494 * windowHeight + noiseY3,
    0.666 * windowWidth + noiseX3, 0.403 * windowHeight + noiseY3
  );
}

function windowResized() {
   // Adjust canvas size and redraw the shape when the window is resized.
  resizeCanvas(windowWidth, windowHeight);
  drawLineGroups();
}