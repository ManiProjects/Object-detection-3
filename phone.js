object=[]
img = "";
status1 = "";

function preload(){
  img = loadImage('phone.jpg');
}


function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  /*video=createCapture(VIDEO)
  video.size(640,420)
  video.hide()*/
  
}

function modelLoaded() {
  console.log("Model Loaded!")
  status1 = true;
  object_detector.detect(img,gotResult)
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  object=results
}

function draw() {
  image(img, 0, 0, 640, 420);
  if(status1!=""){
    r=random(255)
    g=random(255)
    b=random(255)
    objectDetector.detect(img, gotResult);
    for(i=0;i<object.length;i++){
        document.getElementById("status").innerHTML="objects are detected"
        document.getElementById("no_of_objects").innerHTML="Number of objects detected are " + object.length
        fill(r, g, b)
        percent=floor(object[i].confidence*100)
        text(object[i].label +" "+ percent + "%" , object[i].x , object[i].y)
        noFill()
        stroke(r, g, b)
        rect(object[i].x , object[i].y , object[i].width , object[i].height)
    }
  }
  /*fill("#FF0000");
  text("Dog", 45, 75);
  noFill();
  stroke("#FF0000");
  rect(30, 60, 450, 350 );

  fill("#FF0000");
  text("Cat", 320, 120);
  noFill();
  stroke("#FF0000");
  rect(300, 90, 270, 320 );*/
}