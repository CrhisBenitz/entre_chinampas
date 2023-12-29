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

function toggleVideo() {
    var videoContainer = document.getElementById('video-container');
    var iframe = videoContainer.querySelector('iframe');
    var displayValue = videoContainer.style.display === 'none' ? 'block' : 'none';

    // Set the display value
    videoContainer.style.display = displayValue;

    // If the video container is set to display, play the video
    if (displayValue === 'block') {
        var videoId = document.querySelector('.video-trigger').getAttribute('data-video-id');
        iframe.src = 'https://www.youtube.com/embed/' + videoId + '?rel=0&autoplay=1';
    } else {
        // If the video container is hidden, stop the video
        iframe.src = '';
    }
}

//
// function printActivity(sectionId) {
//
//     // Open a new tab
//     var newWindow = window.open('', '_blank');
//
//     // Get the section element
//     var sectionElement = document.getElementById(sectionId);
//
//     // Clone the section element to avoid modifying the original content
//     var clonedSection = sectionElement.cloneNode(true);
//
//     // Get all input elements within the cloned section
//     var inputElements = clonedSection.querySelectorAll('input');
//
//     // Iterate over each input element and replace it with a span containing the user's input
//     inputElements.forEach(function(inputElement) {
//         var inputValue = inputElement.value;
//
//         // Create a span element to replace the input
//         var spanElement = document.createElement('span');
//         spanElement.textContent = inputValue;
//
//         // Replace the input with the new span
//         inputElement.parentNode.replaceChild(spanElement, inputElement);
//     });
//
//     // Create a new document with the cloned section
//     var newDocument = document.implementation.createHTMLDocument("Print Document");
//     newDocument.body.appendChild(clonedSection);
//
//     // Set the content of the new tab
//     newWindow.document.write(newDocument.documentElement.outerHTML);
//
//     // Print the content in the new tab
//     newWindow.print();
// }

function printActivity(sectionId) {
    var printContents = document.getElementById(sectionId);
    var originalContents = document.body.innerHTML;
    var originalScrollTop = window.scrollY || document.documentElement.scrollTop;

    // Get all input values before cloning the section
    var originalInputValues = {};
    var originalInputElements = printContents.querySelectorAll('input');
    originalInputElements.forEach(function(inputElement) {
        originalInputValues[inputElement.id] = inputElement.value;
    });

    // Clone the section element to avoid modifying the original content
    var clonedSection = printContents.cloneNode(true);

    // Get all input elements within the cloned section
    var inputElements = clonedSection.querySelectorAll('input');

    // Iterate over each input element and replace it with a span containing the user's input
    inputElements.forEach(function(inputElement) {
        var inputValue = inputElement.value;

        // Create a span element to replace the input
        var spanElement = document.createElement('span');
        spanElement.textContent = inputValue;

        // Replace the input with the new span
        inputElement.parentNode.replaceChild(spanElement, inputElement);
    });

    // Hide the print button in the cloned section
    var printButton = clonedSection.querySelector('.print-button');
    if (printButton) {
        printButton.style.display = 'none';
    }

    // Set the content of the body to the cloned section
    document.body.innerHTML = clonedSection.innerHTML;

    // Print the content
    window.print();

    // Listen for the afterprint event to restore the original content and scroll position
    window.addEventListener('afterprint', function() {
        document.body.innerHTML = originalContents;
        window.scrollTo(0, originalScrollTop);

        // Restore the original input values
        var restoredInputElements = document.querySelectorAll('input');
        restoredInputElements.forEach(function(inputElement) {
            inputElement.value = originalInputValues[inputElement.id];
        });
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

            // Assuming you have a .video-trigger element in your HTML
            document.querySelector('.video-trigger').addEventListener('click', function() {
                toggleVideo();
            });

        });
});
