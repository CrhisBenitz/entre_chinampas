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
