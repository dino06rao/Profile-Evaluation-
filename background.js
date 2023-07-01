```javascript
import { comments, currentURL } from './storage.js';

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setPopup({ popup: 'popup.html' });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'getComments') {
    fetchComments(request.url).then(comments => {
      sendResponse({ comments });
    });
    return true;
  } else if (request.message === 'saveComment') {
    saveComment(request.comment, request.url).then(() => {
      sendResponse({ success: true });
    });
    return true;
  } else if (request.message === 'getSummary') {
    getSummary(request.url).then(summary => {
      sendResponse({ summary });
    });
    return true;
  }
});

function fetchComments(url) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(url, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result[url] || []);
      }
    });
  });
}

function saveComment(comment, url) {
  return new Promise((resolve, reject) => {
    fetchComments(url).then(comments => {
      comments.push(comment);
      chrome.storage.sync.set({ [url]: comments }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  });
}

function getSummary(url) {
  // This function should be implemented to fetch the summary of key takeaways.
  // For now, it just returns a dummy summary.
  return Promise.resolve('This is a dummy summary of key takeaways.');
}
```