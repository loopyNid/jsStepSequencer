// goal
// make a step sequencer that records audio output
// steps
// - play a pattern done
// - bpm
// - record
// - better samples
var starop = $("#startStop");
var btn = $(".btn");
var playing = false;
var ch = new Tone.Player("./samples/ch.mp3").toMaster();
var bd = new Tone.Player("./samples/bd.mp3").toMaster();
var sn = new Tone.Player("./samples/sn.mp3").toMaster();
var samplesArray = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
var index = 0;
var bpl = "8n";
//loop
Tone.Transport.scheduleRepeat( beat, bpl);
starop.click(function(){
    if(playing){
        stopLoop();
        starop.html("&#9655;");
        playing = false;
    } else {
        startLoop();
        starop.html("&#9647;&#9647;");
        playing = true;
    }
});
btn.click(function(){
    let index = $(this).index();
    let sample = $(this).parent().attr("id");
    $(this).toggleClass("pressedBtn");
    if(samplesArray[sample-1][index] == 0){
        samplesArray[sample-1][index] = 1;
    } else {
        samplesArray[sample-1][index] = 0;
    }
    console.log($(this).parent().attr("id"));
});
function startLoop(){
    Tone.Transport.start();
}
function stopLoop(){
    Tone.Transport.stop();
}
function beat(time){
    let step = index % 8;
    for(let i = 0;i < samplesArray.length; i++){
        if(i == 0) {
            if(samplesArray[i][step] == 1){
                bd.mute = false;
            } else {
                bd.mute = true;
            }
            bd.start();
        } else if(i == 1) {
            if(samplesArray[i][step] == 1){
                ch.mute = false;
            } else {
                ch.mute = true;
            }
            ch.start();
        } else {
            if(samplesArray[i][step] == 1){
                sn.mute = false;
            } else {
                sn.mute = true;
            }
            sn.start();
        }
    }
    index++;
}
