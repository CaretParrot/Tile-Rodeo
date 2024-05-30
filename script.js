function switchPage(pageId) {
    let allPages = document.getElementsByClassName("page");

    for (let i = 0; i < allPages.length; i++) {
        allPages[i].style.display = "none";
    }

    id(pageId).style.display = "flex";
}