"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const wasm_image_tuning_js_1 = __importStar(require("./pkg/wasm_image_tuning.js"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, wasm_image_tuning_js_1.default)();
        const inputImage = document.getElementById("input-image");
        const brightness = document.getElementById("brightness");
        const outputCanvas = document.getElementById("output-canvas");
        let imageBytes = null;
        inputImage.addEventListener("change", (event) => __awaiter(this, void 0, void 0, function* () {
            const target = event.target;
            const file = target.files[0];
            imageBytes = yield loadImageBytes(file);
            const adjustedBytes = (0, wasm_image_tuning_js_1.adjust_brightness)(imageBytes, parseFloat(brightness.value));
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
            const adjustedBytes = (0, wasm_image_tuning_js_1.adjust_brightness)(imageBytes, parseFloat(brightness.value));
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
