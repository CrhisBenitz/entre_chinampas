// Function to initialize tooltips
function initializeTooltips() {
    const tooltips = document.querySelectorAll('.tooltip');

    tooltips.forEach(tooltip => {
        const tooltipText = tooltip.getAttribute('data-tooltip');

        const tooltipElement = document.createElement('span');
        tooltipElement.className = 'tooltiptext';
        tooltipElement.textContent = tooltipText;
        tooltip.appendChild(tooltipElement);
    });
}


document.addEventListener("DOMContentLoaded", function() {
    const articleIds = ['precontent', 'acknowledgments', 'content-index', 'sec1', 'sec2', 'sec3', 'sec4', 'refs'];

    articleIds.forEach(articleId => {
        fetch(`contenido/${articleId}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(articleId).innerHTML = data;
            })
            .then(() => {
                // Initialize tooltips after each article's content is loaded
                initializeTooltips();
            })
            .catch(error => {
                console.error(`Error fetching ${articleId}.html:`, error);
            });
    });)
