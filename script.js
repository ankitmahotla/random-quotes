// define html elements
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");
const copyButton = document.getElementById("copyBtn");
const shareButton = document.getElementById("shareBtn");
const exportButton = document.getElementById("exportBtn");
const quoteContainer = document.getElementById("quote-container");

// array of random background images from unsplash
const backgroundImages = [
  "https://images.unsplash.com/photo-1741546694630-b8b4408e3cba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1741482529112-fb0f993430fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1741091750011-f0fb9b8400cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1740920988406-aa608bf80c63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1740543860663-3e792b7aea1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1737961756998-973ead0592df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1731964877414-217cdc9b5b37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMHx8fGVufDB8fHx8fA%3D%3D",
];

// function to set random background using Math lib
function setRandomBackground() {
  // floor for 0 based indexing
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  quoteContainer.style.backgroundImage = `url(${backgroundImages[randomIndex]})`;
}

// function to get random quote from the endpoint
async function getRandomQuote() {
  const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";

  try {
    const response = await fetch(url);
    const data = await response.json();

    // set quote and author in html
    quoteElement.innerText = data.data.content;
    authorElement.innerText = `- ${data.data.author}`;

    // function call to set random background
    setRandomBackground();
  } catch (error) {
    console.error(error);
    quoteElement.innerText = "Failed to load quote. Please try again.";
    authorElement.innerText = "";
  }
}

// event listener to fetch new random quote
newQuoteButton.addEventListener("click", getRandomQuote);

// event listener to copy text to clipboard
copyButton.addEventListener("click", () => {
  const textToCopy = `${quoteElement.innerText} ${authorElement.innerText}`;
  navigator.clipboard.writeText(textToCopy);
  alert("Quote copied to clipboard!");
});

// event listener to share the quote and author along with #randomquote
shareButton.addEventListener("click", () => {
  const quoteText = encodeURIComponent(
    `${quoteElement.innerText} ${authorElement.innerText}`
  );
  window.open(
    `https://twitter.com/intent/tweet?text=${quoteText}&hashtags=randomquotes`,
    "_blank"
  );
});

// event listener to export the quote with randomly set background image
exportButton.addEventListener("click", () => {
  const buttonsContainer = document.querySelector(".buttons");

  // hide buttons from the canvas
  buttonsContainer.style.display = "none";

  // image quality and other options for the image to be exported
  const options = {
    allowTaint: true,
    useCORS: true,
    backgroundColor: null,
    scale: 2,
  };

  //html2canvas is an external library for screenshotting the element from the html page
  html2canvas(quoteContainer, options)
    .then((canvas) => {
      const imageDataURL = canvas.toDataURL("image/png");
      // creating an <a> tag for linking its href to dataUrl of the canvas
      const link = document.createElement("a");
      link.href = imageDataURL;
      // image name for local store
      link.download = "quote.png";
      link.click();

      //restore the buttons after download
      buttonsContainer.style.display = "flex";
    })
    .catch((error) => {
      console.error("Error exporting image:", error);
      buttonsContainer.style.display = "flex";
      alert("There was an error exporting the image. Please try again.");
    });
});

// initial function calls on page load
setRandomBackground();
getRandomQuote();
