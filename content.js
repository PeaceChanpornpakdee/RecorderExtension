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

let recordingChunks = [];
let recording = false;

function startRecording() {
    if (!recording) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.start();
  
          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              recordingChunks.push(event.data);
            }
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
    if (recordingChunks.length > 0) {
        const blob = new Blob(recordingChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'recorded_audio.wav';
        a.click();
        recordingChunks = [];
        URL.revokeObjectURL(url);
    }
}