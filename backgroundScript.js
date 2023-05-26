// Listen for tab activation
chrome.tabs.onActivated.addListener((activeInfo) => {
  const tabId = activeInfo.tabId;

  // Inject the content script into the active tab
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ["contentScript.js"],
  });
});
