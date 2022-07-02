song = '';
left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_x = 0;
right_wrist_y = 0;
left_wrist_score = 0;
right_wrist_score = 0;

function setup(){

    canvas = createCanvas(640,480);
    canvas.position(630, 350);

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, model_loaded);
    posenet.on('pose', got_poses);
}

function draw(){

    image(video, 0, 0 ,640, 480);

        fill('red');
        stroke('blue');

    if(left_wrist_score > 0.01){
        
        circle(left_wrist_x, left_wrist_y, 20);
        volume = Number(Math.floor(500-left_wrist_y)/500)
        song.setVolume(volume);
        document.getElementById('volume_label').innerHTML = `Volume = ${volume}`;
    }

    if(right_wrist_score > 0.01){

        circle(right_wrist_x, right_wrist_y, 20);
        rate = Number((500-right_wrist_y)/200).toFixed(1);
        song.rate(rate);
        document.getElementById('speed_label').innerHTML = `Speed = ${rate}`;
        console.log('rate: '+rate);
    }
}

function preload(){
    song = loadSound("music.mp3");
    song.rate(1);
    song.setVolume(1);
}   

function play_music(){
    song.play();
}

function stop_music(){
    song.stop();
}

function model_loaded(){
    console.log('Posenet Model Initialized');
}

function got_poses(results){
    if(results.length > 0){
        console.log(results);

        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        console.log(`Left Wrist X = ${left_wrist_x} | Left Wrist Y = ${left_wrist_y}.`);

        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log(`Right Wrist X = ${right_wrist_x} | Right Wrist Y = ${right_wrist_y}.`);

        left_wrist_score = results[0].pose.keypoints[9].score;
        right_wrist_score = results[0].pose.keypoints[10].score;

        console.log(`Left wrist score: ${left_wrist_score}`);
        console.log(`Right wrist score: ${right_wrist_score}`)
    }
}