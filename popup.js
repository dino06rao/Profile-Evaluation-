```javascript
let comments = {};

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saveButton').addEventListener('click', saveComment);
    document.getElementById('optionsButton').addEventListener('click', openOptions);
    loadComments();
});

function saveComment() {
    let commentInput = document.getElementById('commentInput');
    let comment = commentInput.value.trim();
    if (comment) {
        let url = window.location.href;
        let timestamp = new Date().getTime();
        if (!comments[url]) {
            comments[url] = [];
        }
        comments[url].push({ comment, timestamp });
        chrome.storage.sync.set({ 'comments': comments }, function() {
            commentInput.value = '';
            loadComments();
        });
    }
}

function loadComments() {
    let url = window.location.href;
    chrome.storage.sync.get('comments', function(data) {
        comments = data.comments || {};
        let commentList = document.getElementById('commentList');
        commentList.innerHTML = '';
        if (comments[url]) {
            comments[url].forEach(function(comment) {
                let listItem = document.createElement('li');
                listItem.textContent = comment.comment;
                commentList.appendChild(listItem);
            });
        }
    });
}

function openOptions() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
}
```