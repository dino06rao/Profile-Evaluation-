```javascript
let currentURL = window.location.href;
let comments = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'getComments') {
        sendResponse({comments: comments});
    } else if (request.message === 'saveComment') {
        comments.push(request.data);
        sendResponse({status: 'Comment saved'});
    } else if (request.message === 'getSummary') {
        let summary = getSummary();
        sendResponse({summary: summary});
    }
});

function getSummary() {
    // This function should be implemented based on the specific requirements for summarizing the key takeaways.
    // For example, it could use a text summarization API or algorithm.
    // For now, it just returns a placeholder string.
    return 'Summary of key takeaways...';
}
```