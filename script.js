document.addEventListener("DOMContentLoaded", function(){
    const getNewsBtn = document.getElementById("getNewsBtn");
    const newsContainer = document.getElementById("newsContainer");

    getNewsBtn.addEventListener("click", function(){
        const apiKey = "ce6e497b25a3464f9030287ade164e64";
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
        
        fetch(url)
        .then(response => {
            console.log('Response:', response); // Log the response object
            if (!response.ok) {
                throw new Error("API request failed with status: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data:', data); // Log the full data received
            if (data.status && data.status !== "ok") {
                throw new Error(`Error fetching news: ${data.message}`);
            }

            const articles = data.articles;

            if (articles && Array.isArray(articles) && articles.length > 0) {
                newsContainer.innerHTML = ''; // Clear previous news

                // Loop through articles and display them
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
            console.log("Error fetching news:", error); // Log any fetch errors
            newsContainer.innerHTML = `Error fetching news: ${error.message}`;
        });
    });
});
