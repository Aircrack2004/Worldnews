document.addEventListener("DOMContentLoaded", function(){
    const getNewsBtn = document.getElementById("getNewsBtn");
    const newsContainer = document.getElementById("newsContainer");

    getNewsBtn.addEventListener("click", function(){
        const apiKey = "ce6e497b25a3464f9030287ade164e64";
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
        
        fetch(url)
        .then(response => {
            // Check if the response is okay before converting it to JSON
            if (!response.ok) {
                throw new Error("Failed to fetch news");
            }
            return response.json();
        })
        .then(data => {
            console.log("Data received", data);
            
            // Check if 'articles' is an array before using .forEach
            if (Array.isArray(data.articles)) {
                const articles = data.articles;
                newsContainer.innerHTML = ''; // Clear previous news
                
                articles.forEach(article => {
                    const articleElement = document.createElement("div");
                    articleElement.innerHTML = `
                        <h2>${article.title}</h2> 
                        <p>${article.description}</p>
                        <a href="${article.url}" target="_blank">Read more</a>
                    `;
                    newsContainer.appendChild(articleElement);
                });
            } else {
                newsContainer.innerHTML = "No news articles found.";
            }
        })
        .catch(error => {
            console.log("Error fetching news", error);
            newsContainer.innerHTML = `Error fetching news: ${error.message}`;
        });
    });
});
