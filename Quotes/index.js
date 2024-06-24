const generateBtn = document.querySelector(".newQuote button")

async function Quotes() {
    try {
        const rawDataQuotes = await fetch("https://api.quotable.io/quotes/random?tags=love|happiness&maxLength=100&limit=200")
        const jsonData = await rawDataQuotes.json()
        for (let i = 0; i < jsonData.length; i++) {
            document.querySelector(".quotes").innerHTML = jsonData[i].content
            document.querySelector(".author").innerHTML = jsonData[i].author
        }

    }
    catch (error) {
        console.log(error)
    }
}
Quotes()
generateBtn.addEventListener('click', () => {
    Quotes()
})