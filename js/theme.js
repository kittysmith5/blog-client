const htmlRoot = document.documentElement
const dayOrNight = document.getElementById("day-or-night")




//如果没有sessionStorage，根据时间设置情景模式
let mode = sessionStorage.getItem("mode")
if (!mode) {
    console.log("init day or night");
    //获取本地时间
    let now = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

    if (now >= "18:00:00" || now <= "06:00:00") {
        sessionStorage.setItem("mode", "dark")
    } else {
        sessionStorage.setItem("mode", "day")
    }
}

//根据sessionStorage的值设置情景模式
switch (sessionStorage.getItem("mode")) {
    case "day":
        dayOrNight.text = "🌞"
        htmlRoot.classList.remove("dark")
        break;
    case "dark":
        dayOrNight.text = "🌚"
        htmlRoot.classList.add("dark")
        break;
    default:
        break;
}



//点击切换情景模式
dayOrNight.addEventListener("click", (e) => {
    if (sessionStorage.getItem("mode") === "day") {
        e.target.text = "🌚"
        htmlRoot.classList.add("dark")
        sessionStorage.setItem("mode", "dark")
    } else {
        e.target.text = "🌞"
        htmlRoot.classList.remove("dark")
        sessionStorage.setItem("mode", "day")
    }
})