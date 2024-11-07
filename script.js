document.addEventListener("DOMContentLoaded", function(){
    const getNewsBtn = document.getElementById("getNewsBtn");
    const newsContainer = document.getElementById("newsContainer");

    getNewsBtn.addEventListener("click", function(){
        const apiKey = "ce6e497b25a3464f9030287ade164e64";
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
        
        fetch(url)
        .then(response => {
            console.log("Response received, converting to JSON...");
            return response.json();
        })
        .then(data => {
            console.log("Data received", data);
            const articles = data.articles;

            newsContainer.innerHTML = ''; 

            articles.forEach(article => {
                const articleElement = document.createElement("div");
                articleElement.innerHTML = `
                    <h2>${article.title}</h2> 
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                `;
                newsContainer.appendChild(articleElement);
            });
        })
        .catch(error => {
            console.log("Error fetching news", error);
            newsContainer.innerHTML = `Error fetching news: ${error}`;
        });
    });
});
