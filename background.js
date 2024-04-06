chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const site = "https://en.wikipedia.org";

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(site)) {
    let state = await chrome.action.getBadgeText({ tabId: tab.id });
    if (state === "OFF") {
      chrome.action.setBadgeText({
        text: "ON",
        tabId: tab.id,
      });
      await chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["injected_style.css"],
      });
    } else if (state === "ON") {
      chrome.action.setBadgeText({
        text: "OFF",
        tabId: tab.id,
      });
      await chrome.scripting.removeCSS({
        target: { tabId: tab.id },
        files: ["injected_style.css"],
      });
    }
  }
});
