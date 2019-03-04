var socket = io.connect();

const constraints = {
    video: {
        width: {
            exact: 640
        },
        height: {
            exact: 480
        }
    }
};


var i=0;
socket.emit("rotation", constraints);

socket.on('rotation', function(e){
    i=i+1;
    jQuery(".videoContainer").append("<video class='video_"+i+"' autoplay></video")
    const video = jQuery(".video_"+i);
console.log(video)
navigator.mediaDevices.getUserMedia(e).
then((stream) => {
    video.srcObject = stream
});
})
