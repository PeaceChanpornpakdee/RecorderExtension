document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('startButton').addEventListener('click', startRecording);
    document.getElementById('stopButton' ).addEventListener('click', stopRecording );
});

function startRecording() {
    alert('Start Recording');
}

function stopRecording() {
    alert('Stop Recording');
}