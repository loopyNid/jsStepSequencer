var spectrum;
var spec;
var ind;
var ampFreq;
console.log("i am alive");
function setup() {
    createCanvas(windowWidth, windowHeight);
}
function draw() {
    // console.clear();
    spec = waveform.getValue();
    // console.log(spec);
    background(0);
    stroke(0, 87, 87);
    fill(0);
    console.clear();
    console.log(ampFreq);
    for(var i = 0; i < spec.length; i++){
        ind = map(i, 0, 512, 0, 1);
        strokeWeight(10 * ind);
        ampFreq = spec[i];//map(spec[i], -1, 1, 0, 1);
        ellipse(width * ind,random(height),100 * ampFreq, 100 * ampFreq);
    }
}
