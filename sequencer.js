// goal
// make a step sequencer1
// steps
// - play a pattern done
// - bpm slider done
// - readme demo link
// - visualize beat done
// - better samples done
var starop = $("#startStop");
var btn = $(".btn");
var bpmSlider = document.getElementById("bpm");
var bpmVal = $("#bpmVal");
var playing = false;
var waveform = new Tone.Waveform(512);
var ch = new Tone.Player("./samples/ch.mp3").chain(waveform, Tone.Master);
var bd = new Tone.Player("./samples/bd.mp3").chain(waveform, Tone.Master);
var sn = new Tone.Player("./samples/sn.mp3").chain(waveform, Tone.Master);
var samplesArray = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
var index = 0;
var bpl = "8n";
bpmVal.html("BPM: " + bpmSlider.value);
bpmSlider.onchange = function(){
    bpmVal.html("BPM: " + bpmSlider.value);
};
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
});
function startLoop(){
    Tone.Transport.start();
}
function stopLoop(){
    Tone.Transport.stop();
}
function beat(time){
    $(".btn").css("filter","invert(0%)");
    Tone.Transport.bpm.value = bpmSlider.value;
    let step = index % 8;
    $(".btn").each(function(){
        if($(this).index() == step){
            $(this).css("filter","invert(100%)");
        }
    });
    for(let i = 0;i < samplesArray.length; i++){
        if(i == 0) {
            if(samplesArray[i][step] == 1){
                bd.mute = false;
            } else {
                bd.mute = true;
            }
            bd.start(time);
        } else if(i == 1) {
            if(samplesArray[i][step] == 1){
                ch.mute = false;
            } else {
                ch.mute = true;
            }
            ch.start(time);
        } else {
            if(samplesArray[i][step] == 1){
                sn.mute = false;
            } else {
                sn.mute = true;
            }
            sn.start(time);
        }
    }

    index++;
}
