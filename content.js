const targetNode = document.documentElement;

const observerOptions = {
  childList: true,
  subtree: true,
};

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    const btnRecording = document.querySelector('.btn-recording');
    if (btnRecording) {
      chrome.runtime.sendMessage({ action: 'startRecording' });
    } else {
      chrome.runtime.sendMessage({ action: 'stopRecording' });
    }
  });
});

observer.observe(targetNode, observerOptions);
