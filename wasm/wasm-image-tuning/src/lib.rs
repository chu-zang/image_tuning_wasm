use wasm_bindgen::prelude::*;
use image::io::Reader;
use std::io::Cursor;

mod utils;

pub struct CustomError(JsValue);

impl From<image::ImageError> for CustomError {
    fn from(error: image::ImageError) -> Self {
        CustomError(JsValue::from_str(&format!("Image error: {}", error)))
    }
}

impl From<std::io::Error> for CustomError {
    fn from(error: std::io::Error) -> Self {
        CustomError(JsValue::from_str(&format!("IO error: {}", error)))
    }
}

impl Into<JsValue> for CustomError {
    fn into(self) -> JsValue {
        self.0
    }
}

#[wasm_bindgen]
pub fn adjust_brightness(bytes: &[u8], value: f32) -> Result<Vec<u8>, CustomError> {
    let img = Reader::new(std::io::Cursor::new(bytes))
        .with_guessed_format()
        .map_err(CustomError::from)?
        .decode()
        .map_err(CustomError::from)?;

    let img = utils::adjust_brightness(&img, value);

    let mut cursor = Cursor::new(Vec::new());
    img.write_to(&mut cursor, image::ImageOutputFormat::Png)
        .map_err(CustomError::from)?;
    let bytes = cursor.into_inner();

    Ok(bytes)
}

