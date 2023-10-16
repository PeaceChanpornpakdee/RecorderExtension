document.getElementById('startRecording').addEventListener('click', () => {
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      func: startRecording,
    });
  });
  
  document.getElementById('stopRecording').addEventListener('click', () => {
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      func: stopRecording,
    });
  });