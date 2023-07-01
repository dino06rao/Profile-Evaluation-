```javascript
let comments = [];
let currentURL = '';

document.getElementById('submitBtn').addEventListener('click', saveComment);
document.getElementById('summaryBtn').addEventListener('click', getSummary);

function fetchComments() {
  chrome.runtime.sendMessage({name: 'getComments', url: currentURL}, function(response) {
    comments = response.comments;
    displayComments();
  });
}

function saveComment() {
  const commentBox = document.getElementById('commentBox');
  const comment = commentBox.value.trim();
  if (comment) {
    chrome.runtime.sendMessage({name: 'saveComment', url: currentURL, comment: comment}, function(response) {
      commentBox.value = '';
      fetchComments();
    });
  }
}

function displayComments() {
  const commentsContainer = document.getElementById('commentsContainer');
  commentsContainer.innerHTML = '';
  comments.forEach(comment => {
    const commentElement = document.createElement('div');
    commentElement.textContent = comment.comment;
    commentsContainer.appendChild(commentElement);
  });
}

function getSummary() {
  chrome.runtime.sendMessage({name: 'getSummary', url: currentURL}, function(response) {
    const summary = response.summary;
    alert(summary);
  });
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  currentURL = tabs[0].url;
  fetchComments();
});
```