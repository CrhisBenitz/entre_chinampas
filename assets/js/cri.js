document.addEventListener("DOMContentLoaded", function() {
  const tooltips = document.querySelectorAll('.tooltip');

  // Loop through each tooltip
  tooltips.forEach(tooltip => {
      // Get the text for the tooltip from the 'data-tooltip' attribute
      const tooltipText = tooltip.getAttribute('data-tooltip');

      // Create and append the tooltip text element
      const tooltipElement = document.createElement('span');
      tooltipElement.className = 'tooltiptext';
      tooltipElement.textContent = tooltipText;
      tooltip.appendChild(tooltipElement);
  });
});

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
                    .catch(error => {
                        console.error(`Error fetching ${articleId}.html:`, error);
                    });
            });
        });
