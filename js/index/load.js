// Select the container within the 'main' class. Hide it until the network status is confirmed as okay.
const mainDiv = document.querySelector(".main .container")
mainDiv.style.display = "none"


axios({
    method: 'get',
    url: 'http://127.0.0.1:3000/blog/fetch',
    timeout: 500,
}).then(res => {
    mainDiv.style.display = "block"
    const content = document.querySelector(".main #content")
    let ulTest;
    let preYear = 0;

    const yearDiv = document.createElement("div")
    yearDiv.classList.add("list-year-part")
    content.appendChild(yearDiv)
    for (const obj of res.data) {
        let title = xssFilter(obj["title"])
        let date = obj["date"]
        const uuid = obj["uuid"]
        let itemYear = obj["date"].substring(0, 4)
        if (itemYear !== preYear) {
            yearDiv.insertAdjacentHTML("beforeend", `
                        <div class="list-year">
                            <h2>${itemYear}</h2>
                            <ul id="ul-test-${itemYear}">
                            <li>
                                <a href="article.html?uuid=${uuid}">${title}</a>
                                <span>${date}</span>
                            </li>
                        </ul>
                        </div>
                    `)
        } else {
            ulTest = document.querySelector("#ul-test-" + itemYear)
            ulTest.insertAdjacentHTML("afterbegin", `
                    <li>
                        <a href="article.html?uuid=${uuid}">${title}</a>
                        <span>${date}</span>
                    </li>
                `)
        }
        preYear = itemYear
    }
}).catch(err => {
    mainDiv.style.display = "block"
    console.log(err);

    //hide the POST of title
    const div = document.createElement("div")
    const title = document.getElementById("title")
    title.style.display = 'none';

    //show the 500 error
    const h1 = document.createElement("h1")
    const h2 = document.createElement("h2")
    h1.textContent = "500"
    div.classList.add("page500")
    h2.textContent = "Internal Server Error"
    div.appendChild(h1)
    div.appendChild(h2)
    content.appendChild(div)
})

//fetch current year
document.getElementById("curr-year").textContent = new Date().getFullYear()

function xssFilter(str) {
    return str.replaceAll("<", "&lt;").replaceAll(">", "&gt;")
}