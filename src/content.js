import Mp3MediaRecorder from 'mp3-mediarecorder';

let recording_status = "Idle"

setInterval(function()
{
    if(recording_status == "Idle"){
        const targetElement1 = document.querySelector('div.recorder-recording');
        if(targetElement1) {
            console.log("Start Recording");
            recording_status = "Recording";
            startRecording(); 
        }
    }

    if(recording_status == "Recording"){
        const targetElement2 = document.querySelector('div.recorder-waiting');
        if(targetElement2) {
            console.log("Stop Recording");  
            recording_status = "Idle";
            stopRecording();
        }
    }

}, 500);

let mediaRecorder;
let recording = false;
let audioChunks = [];

function startRecording() {
    if (!recording) {
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new Mp3MediaRecorder(stream);
            mediaRecorder.start();

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                saveRecording();
            };

            recording = true;
        });
    }
}

function stopRecording() {
    if (recording && mediaRecorder) {
        mediaRecorder.stop();
        recording = false;
    }
}

function saveRecording() {
    if (audioChunks.length > 0) {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
        const url = URL.createObjectURL(audioBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'recorded_audio.mp3';
        a.click();
        URL.revokeObjectURL(url);
        audioChunks = [];
    }
}