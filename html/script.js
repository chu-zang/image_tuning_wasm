var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import init, { adjust_brightness } from './pkg/wasm_image_tuning.js';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield init();
        const inputImage = document.getElementById("input-image");
        const brightness = document.getElementById("brightness");
        const outputCanvas = document.getElementById("output-canvas");
        let imageBytes = null;
        inputImage.addEventListener("change", (event) => __awaiter(this, void 0, void 0, function* () {
            const target = event.target;
            const file = target.files[0];
            imageBytes = yield loadImageBytes(file);
            const adjustedBytes = adjust_brightness(imageBytes, parseFloat(brightness.value));
            const blob = new Blob([adjustedBytes], { type: "image/png" });
            const imageBitmap = yield createImageBitmap(blob);
            outputCanvas.width = imageBitmap.width;
            outputCanvas.height = imageBitmap.height;
            const ctx = outputCanvas.getContext("2d");
            ctx.drawImage(imageBitmap, 0, 0);
        }));
        brightness.addEventListener("input", () => __awaiter(this, void 0, void 0, function* () {
            if (imageBytes === null)
                return;
            const adjustedBytes = adjust_brightness(imageBytes, parseFloat(brightness.value));
            const blob = new Blob([adjustedBytes], { type: "image/png" });
            const imageBitmap = yield createImageBitmap(blob);
            outputCanvas.width = imageBitmap.width;
            outputCanvas.height = imageBitmap.height;
            const ctx = outputCanvas.getContext("2d");
            ctx.drawImage(imageBitmap, 0, 0);
        }));
    });
}
function loadImageBytes(file) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
main();
