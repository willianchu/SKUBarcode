// Function to transform a number into a barcode representation
function generateBarcode(number) {
  const barcodeWidth = 2; // Width of each barcode unit in pixels
  const barcodeHeight = 50; // Height of the barcode in pixels
  const barcodeColor = "#000000"; // Color of the barcode bars
  const barcodeBackgroundColor = "#FFFFFF"; // Background color of the barcode

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Calculate the width of the barcode based on the number length and barcodeWidth
  const barcodeWidthTotal = number.length * barcodeWidth;

  // Set the canvas dimensions based on the barcode width and height
  canvas.width = barcodeWidthTotal;
  canvas.height = barcodeHeight;

  // Clear the canvas with the background color
  context.fillStyle = barcodeBackgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the barcode bars
  context.fillStyle = barcodeColor;
  for (let i = 0; i < number.length; i++) {
    if (number[i] === "1") {
      context.fillRect(i * barcodeWidth, 0, barcodeWidth, barcodeHeight);
    }
  }

  // Convert the canvas to a data URL representing the barcode image
  const barcodeImage = canvas.toDataURL();

  // Return the data URL
  return barcodeImage;
}

// Find and transform SKUs into barcodes
function transformSKUsIntoBarcodes() {
  const skuElements = document.querySelectorAll(":contains('SKU')");

  skuElements.forEach((element) => {
    const text = element.textContent;
    const regex = /SKU\s+#\s+(\d+)/;
    const match = text.match(regex);

    if (match) {
      const skuNumber = match[1];
      const barcodeImageURL = generateBarcode(skuNumber);

      // Replace the SKU text with the barcode image
      const barcodeImageElement = document.createElement("img");
      barcodeImageElement.src = barcodeImageURL;
      element.textContent = "";
      element.appendChild(barcodeImageElement);
    }
  });
}

// Execute the transformation when the DOM content is loaded
document.addEventListener("DOMContentLoaded", transformSKUsIntoBarcodes);
