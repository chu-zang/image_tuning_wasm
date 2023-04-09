import init, { adjust_brightness } from './pkg/wasm_image_tuning.js';

async function main(): Promise<void> {
    await init();

    const inputImage = document.getElementById("input-image") as HTMLInputElement;
    const brightness = document.getElementById("brightness") as HTMLInputElement;
    const outputCanvas = document.getElementById("output-canvas") as HTMLCanvasElement;
    let imageBytes: Uint8Array | null = null;

    inputImage.addEventListener("change", async (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files![0];
        imageBytes = await loadImageBytes(file);
        const adjustedBytes = adjust_brightness(imageBytes, parseFloat(brightness.value));
        const blob = new Blob([adjustedBytes], { type: "image/png" });
        const imageBitmap = await createImageBitmap(blob);

        outputCanvas.width = imageBitmap.width;
        outputCanvas.height = imageBitmap.height;

        const ctx = outputCanvas.getContext("2d")!;
        ctx.drawImage(imageBitmap, 0, 0);
    });

    brightness.addEventListener("input", async () => {
        if (imageBytes === null) return;

        const adjustedBytes = adjust_brightness(imageBytes, parseFloat(brightness.value));
        const blob = new Blob([adjustedBytes], { type: "image/png" });
        const imageBitmap = await createImageBitmap(blob);

        outputCanvas.width = imageBitmap.width;
        outputCanvas.height = imageBitmap.height;

        const ctx = outputCanvas.getContext("2d")!;
        ctx.drawImage(imageBitmap, 0, 0);
    });
}

async function loadImageBytes(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
            resolve(new Uint8Array(event.target!.result as ArrayBuffer));
        };
        reader.onerror = (event: ProgressEvent<FileReader>) => {
            reject(new Error("Error reading file"));
        };
        reader.readAsArrayBuffer(file);
    });
}

main();
