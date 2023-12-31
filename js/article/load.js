const params = window.location.search;
uuid = params.split("=")[1]
const content = document.querySelector(".main #content")
console.log(content);
if (uuid) {
    axios({
        method: 'get',
        url: 'http://127.0.0.1:3000/blog/fetch-text/' + uuid,
        timeout:500
    }).
        then(res => {
            const title = res.data[0].title
            const mdText = res.data[0].md_text
            // content.innerHTML = "<div>" + marked.parse(mdText) + "</div>";
            // console.log(title);
            const div = document.createElement("div")
            // div.style.add("margin:50px 0")
            div.classList.add("article")
            content.appendChild(div)
            div.insertAdjacentHTML("beforeend", `<div class="title"><h1>${title}</h1><div>`)
            div.insertAdjacentHTML("beforeend", marked.parse(mdText))
        }).
        catch(err => {
            console.log(err);
            show404()
        }).
        finally(() => {
            hljs.highlightAll();
        })
} else {
    show404()
}

//fetch current year
document.getElementById("curr-year").textContent = new Date().getFullYear()

function show404() {
    const div = document.createElement("div")
    const h1 = document.createElement("h1")
    const h2 = document.createElement("h2")
    h1.textContent = "404"
    div.classList.add("page404")
    h2.textContent = "Page Not Found"
    div.appendChild(h1)
    div.appendChild(h2)
    content.appendChild(div)
}