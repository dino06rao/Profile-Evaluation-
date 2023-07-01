```javascript
let comments = [];

// Comment schema
function CommentSchema(id, url, comment, timestamp) {
    this.id = id;
    this.url = url;
    this.comment = comment;
    this.timestamp = timestamp;
}

// Fetch comments from storage
function fetchComments(url) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(url, (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                comments = result[url] || [];
                resolve(comments);
            }
        });
    });
}

// Save comment to storage
function saveComment(comment) {
    return new Promise((resolve, reject) => {
        comments.push(comment);
        chrome.storage.sync.set({ [comment.url]: comments }, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve();
            }
        });
    });
}

// Export functions and variables
export { CommentSchema, fetchComments, saveComment, comments };
```