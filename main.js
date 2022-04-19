song = '';

function setup(){

    canvas = createCanvas(640,480);
    canvas.position(630, 350);

    video = createCapture(VIDEO);
    video.hide();
}

function draw(){

    image(video, 0, 0 ,640, 480);
}

function preload(){
    song = loadSound("music.mp3");
}   

function play_music(){
    song.play();
}

function stop_music(){
    song.stop();
}