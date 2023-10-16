let recording_status = "Idle"

setInterval(function()
{
    if(recording_status == "Idle"){
        const targetElement1 = document.querySelector('div.recorder-recording');
        if(targetElement1) {
            console.log("Start Recording");
            recording_status = "Recording";
        }
    }

    if(recording_status == "Recording"){
        const targetElement2 = document.querySelector('div.recorder-waiting');
        if(targetElement2) {
            console.log("Stop Recording");  
            recording_status = "Idle";
        }
    }

}, 500);