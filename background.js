let recording = false;
let mediaRecorder;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startRecording') {
    startRecording();
  } else if (message.action === 'stopRecording') {
    stopRecording();
  }
});

function startRecording() {
  if (!recording) {
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      mediaRecorder.ondataavailable = (event) => {
        // Handle audio data
      };
      mediaRecorder.onstop = () => {
        // Handle recording stop
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
