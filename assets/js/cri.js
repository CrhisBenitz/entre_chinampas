// Function to initialize figure numbers, references, and hyperlinks
function initializeFiguresAndReferences() {
  var figures = document.querySelectorAll(".figure");

  figures.forEach(function(figure, index) {
    var figureID = figure.getAttribute('id');
    var figureNumber = index + 1;
    var figureNumberElement = figure.querySelector(".figure-number");
    figureNumberElement.innerHTML = "Figura " + figureNumber + ".";

    // Create reference text
    var referenceText = "figura" + figureNumber;

    // Add reference to the text
    var referenceSpan = document.getElementById("ref-" + figureID);
    if (referenceSpan) {
      // referenceSpan.textContent = referenceText;

      // Create hyperlink to the figure with the reference text as its content
      var figureLink = document.createElement('a');
      figureLink.href = '#' + figureID;
      figureLink.textContent = referenceText;
      referenceSpan.appendChild(document.createTextNode(' ')); // Add space between the reference text and the link
      referenceSpan.appendChild(figureLink);
    }
  });
}

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

document.addEventListener("DOMContentLoaded", function () {
    const articleIds = ['precontent', 'acknowledgments', 'content-index', 'sec1', 'sec2', 'sec3', 'sec4', 'refs'];

    // Array to store all fetch promises
    const fetchPromises = [];

    articleIds.forEach(articleId => {
        const fetchPromise = fetch(`contenido/${articleId}.html`)
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

        fetchPromises.push(fetchPromise);
    });

    // Wait for all fetch promises to complete
    Promise.all(fetchPromises)
        .then(() => {
            // Initialize tooltips after all articles' content is loaded
            initializeTooltips();

            // Now call initializeFiguresAndReferences
            initializeFiguresAndReferences();
        });
});
