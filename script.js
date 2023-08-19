const API_KEY = "1b93304c8c454e8a81e13c7d2b17fc51";
const url = "https://newsapi.org/v2/everything?q="

async function fetchData(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json()
    return data
}

fetchData("all").then(data => renderMain(data.articles))


let mobMenu = document.querySelector(".mobile")
let menu = document.querySelector(".menuBtn")
let menuDisplay = true;

menu.addEventListener("click", () => {
    mobMenu.classList.toggle("hidden")
})



//render main--
function renderMain(arr) {
    let mainHTML = ''
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].urlToImage){
        mainHTML += `<div class="card">
        <a href= ${arr[i].url}>
        <img src= ${arr[i].urlToImage} lazy="loading" >
        <h4>${arr[i].title}</h4>
        <div class="publishbydate">
            <p>${arr[i].source.name }</p>
            <span>•</span>
            <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
        </div>
        <div class="desc">
            ${arr[i].description}
        </div>

        <a/>

    </div>`
        }
    }

    document.querySelector("main").innerHTML= mainHTML
}


const searchBtn= document.getElementById("searchForm")
const searchBtnMob = document.getElementById("searchFormMob")
const searchInput = document.getElementById("searchInput")
const searchInputMob = document.getElementById("searchInputMob")

searchBtn.addEventListener("submit", async(e) =>{
    e.preventDefault()
    console.log(searchInput.value)

    const data= await fetchData(searchInput.value)
    renderMain(data.articles)

})
searchBtnMob.addEventListener("submit", async(e) =>{
    e.preventDefault()

    console.log(searchInputMob.value)

    const data= await fetchData(searchInputMob.value)
    renderMain(data.articles)
})


async function Search(query){
    const data= await fetchData(query)
    renderMain(data.articles)
}