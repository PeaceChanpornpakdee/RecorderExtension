let recording_status = "Idle";
let student_name = "Anonymous";

function saveStudentName(name){
    chrome.storage.local.set({ 'studentName': name }).then(() => {
        console.log('Save Student: ' + name);
    });
}

function getStudentName(){
    try{
        chrome.storage.local.get(["studentName"]).then((result) => {
            console.log('Get Student: ' + result.studentName);
            student_name = result.studentName;
        });
    } catch(err){
        student_name = "Anonymous";
    }
}

setInterval(function()
{
    if(location.href == "https://firstclassenglish.learning.re/"){
        const nameElement = document.querySelector('li.has-submenu');
        if(nameElement){
            let student_name = nameElement.childNodes[0].innerHTML;
            saveStudentName(student_name);
        }
    }
    if(recording_status == "Idle"){
        const exampleElement   = document.querySelector('p.l-example-term');
        const recordingElement = document.querySelector('div.recorder-recording');
        if(exampleElement && recordingElement) {
            console.log("Start Recording");
            recording_status = "Recording";
            startRecording(); 
        }
    }

    if(recording_status == "Recording"){
        const recordedElement = document.querySelector('div.recorder-waiting');
        if(recordedElement) {
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
        getStudentName();
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
                sendRecording();
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
  
async function sendRecording() {
    if (recordingChunks.length > 0) {
        let file_name = student_name.replaceAll(' ', '_');
        file_name = file_name.concat(".wav");
        const blob = new Blob(recordingChunks, { type: 'audio/wav' });
        const formData = new FormData();
        formData.append('file', blob, file_name);
        const response = await fetch('https://positive.co.th/englishX/wp-json/audio/v1/convert', {
            method: 'POST',
            body: formData,
            // headers: {
            // Authorization: 'Bearer YOUR_WP_API_TOKEN' // Replace with your WordPress API token
            // }
        });

        if (response.ok) {
            console.log('File uploaded successfully!');
        } else {
            console.log('Error uploading file');
        }
        // const url = URL.createObjectURL(blob);
        // const a = document.createElement('a');
        // a.href = url;
        // a.download = 'recorded_audio.wav';
        // a.click();
        // recordingChunks = [];
        // URL.revokeObjectURL(url);
    }
}