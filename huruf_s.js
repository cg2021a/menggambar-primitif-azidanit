//sumber : diakses 19/09/2021 17:35 GMT+7  https://www.tutorialspoint.com/webgl/webgl_sample_application.htm

/* Step1: Prepare the canvas and get WebGL context */

var canvas = document.getElementById('hurufs_canvas');
var gl = canvas.getContext('experimental-webgl');

/* Step2: Define the geometry and store it in buffer objects */

var s =  [
    115, 191,   // 1
    115, 220,   // 2
    39, 191,    // 3
    13, 221,    // 4
    39, 259,    // 5
    13, 279,    // 6
    115, 274,   // 7
    92, 294,    // 8
    130, 314,   // 9
    92, 328,    // 10
    115, 354,    // 11
    13, 328,     // 12
    13, 354,     // 13
    13, 354,     // 13
    13, 354,     // 13
];

vertices = s;
vertices = vertices.map(function(x, i){ return i%2===0 ? (x+50)/150.0 - 1 : -x/200.0 +1; });

// Create a new buffer object
var vertex_buffer = gl.createBuffer();

// Bind an empty array buffer to it
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

// Pass the vertices data to the buffer
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Unbind the buffer
gl.bindBuffer(gl.ARRAY_BUFFER, null);

/* Step3: Create and compile Shader programs */

// Vertex shader source code
var vertCode =
    'attribute vec2 coordinates;' +
    'void main(void) {' + ' gl_Position = vec4(coordinates,0.0, 1.0);' + '}';

//Create a vertex shader object
var vertShader = gl.createShader(gl.VERTEX_SHADER);

//Attach vertex shader source code
gl.shaderSource(vertShader, vertCode);

//Compile the vertex shader
gl.compileShader(vertShader);

//Fragment shader source code
var fragCode = 'void main(void) {' + 'gl_FragColor = vec4(0.0, 0.3, 0.5, 0.5);' + '}';

// Create fragment shader object
var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

// Attach fragment shader source code
gl.shaderSource(fragShader, fragCode);

// Compile the fragment shader
gl.compileShader(fragShader);

// Create a shader program object to store combined shader program
var shaderProgram = gl.createProgram();

// Attach a vertex shader
gl.attachShader(shaderProgram, vertShader);

// Attach a fragment shader
gl.attachShader(shaderProgram, fragShader);

// Link both programs
gl.linkProgram(shaderProgram);

// Use the combined shader program object
gl.useProgram(shaderProgram);

/* Step 4: Associate the shader programs to buffer objects */

//Bind vertex buffer object
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

//Get the attribute location
var coord = gl.getAttribLocation(shaderProgram, "coordinates");

//point an attribute to the currently bound VBO
gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);

//Enable the attribute
gl.enableVertexAttribArray(coord);

/* Step5: Drawing the required object (triangle) */

// Clear the canvas
gl.clearColor(0,0,0,1);

// Enable the depth test
gl.enable(gl.DEPTH_TEST);

// Clear the color buffer bit
gl.clear(gl.COLOR_BUFFER_BIT);

// Set the view port
gl.viewport(0,0,canvas.width,canvas.height);

// Draw the triangle
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 13);
