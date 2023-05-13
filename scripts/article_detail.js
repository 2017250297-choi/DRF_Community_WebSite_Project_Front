let articleId


async function loadArticle(articleId){
    const response = await getArticle(articleId);

    const articleTitle = document.getElementById("article-title")
    const articleContent = document.getElementById("article-content")

    articleTitle.innerText = response.title
    articleContent.innerText = response.content
}


async function loadComments(articleId){
    const response = await getComments(articleId);
    console.log(response)

    const commentList = document.getElementById("comment-list")
    commentList.innerHTML = ""

    response.forEach(comment => {
        commentList.innerHTML += `
            <li class="list-group-item">
                <h5>${comment.author}</h5>
                ${comment.content}
                </li>
            `
    });
}


async function submitComment(){
    const commentElement = document.getElementById("comment-input")
    const newComment = commentElement.value
    const response = await postComment(articleId, newComment)
    console.log(response)
    commentElement.value = ""

    loadComments(articleId)
}


async function injectButton(articleId){
    let buttonArea = document.getElementById("button-area")

    let likeBtn = document.createElement("button")
    likeBtn.setAttribute("type","button")
    likeBtn.setAttribute("class","btn btn-outline-warning")
    likeBtn.setAttribute("onclick",`likeArticle(${articleId})`)
    likeBtn.innerText = "좋아요"

    let bookmarkBtn = document.createElement("button")
    bookmarkBtn.setAttribute("type","button")
    bookmarkBtn.setAttribute("class","btn btn-outline-success")
    bookmarkBtn.setAttribute("onclick",`bookmarkArticle(${articleId})`)
    bookmarkBtn.innerText = "북마크"

    let updateBtn = document.createElement("a")
    updateBtn.setAttribute("class","btn btn-outline-secondary")
    updateBtn.setAttribute("href",`/article_update.html?article_id=${articleId}`)
    updateBtn.innerText = "수정"

    let deleteBtn = document.createElement("button")
    deleteBtn.setAttribute("type","button")
    deleteBtn.setAttribute("class","btn btn-outline-danger")
    deleteBtn.setAttribute("onclick",`deleteArticle(${articleId})`)
    deleteBtn.innerText = "삭제"

    buttonArea.append(likeBtn)
    buttonArea.append(bookmarkBtn)
    buttonArea.append(updateBtn)
    buttonArea.append(deleteBtn)
}


window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    articleId = urlParams.get('article_id');

    await loadArticle(articleId);
    await injectButton(articleId);
    await loadComments(articleId);
}