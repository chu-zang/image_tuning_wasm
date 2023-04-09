import init, { adjust_brightness } from './pkg/wasm_image_processing.js';

async function main() {
    await init();

    const inputImage = document.getElementById("input-image");
    const brightness = document.getElementById("brightness");
    const outputCanvas = document.getElementById("output-canvas");
    let imageBytes = null;

    inputImage.addEventListener("change", async (event) => {
        const file = event.target.files[0];
        imageBytes = await loadImageBytes(file);
        const adjustedBytes = adjust_brightness(imageBytes, parseFloat(brightness.value));
        const blob = new Blob([adjustedBytes], { type: "image/png" });
        const imageBitmap = await createImageBitmap(blob);
    
        outputCanvas.width = imageBitmap.width;
        outputCanvas.height = imageBitmap.height;
    
        const ctx = outputCanvas.getContext("2d");
        ctx.drawImage(imageBitmap, 0, 0);
      });

    brightness.addEventListener("input", async() => {
        
        const adjustedBytes = adjust_brightness(imageBytes, parseFloat(brightness.value));
        const blob = new Blob([adjustedBytes], { type: "image/png" });
        const imageBitmap = await createImageBitmap(blob);
    
        outputCanvas.width = imageBitmap.width;
        outputCanvas.height = imageBitmap.height;
    
        const ctx = outputCanvas.getContext("2d");
        ctx.drawImage(imageBitmap, 0, 0); 
    });
}

async function loadImageBytes(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(new Uint8Array(event.target.result));
        };
        reader.onerror = (event) => {
            reject(new Error("Error reading file"));
        };
        reader.readAsArrayBuffer(file);
    });
}


function applyBrightnessAdjustment(ctx, canvas) {

    try{
        const brightnessValue = parseFloat(brightness.value);
        const adjustedData = adjust_brightness(ctx, brightnessValue);
        const adjustedImageData = new ImageData(adjustedData, canvas.width, canvas.height);
    
        ctx.putImageData(adjustedImageData, 0, 0);
    }
    catch(e)
    {
        console.error("Error adjusting brightness:", e);
    }

}

main();