use image::{DynamicImage, ImageBuffer, Rgba, GenericImageView, Pixel};


pub fn adjust_brightness(image: &DynamicImage, value: f32) -> DynamicImage {
    let (width, height) = image.dimensions();
    let mut adjusted_image = ImageBuffer::new(width, height);

    for (x, y, pixel) in image.pixels() {
        let rgba = pixel.channels();
        let mut new_rgba = [0u8; 4];
        for i in 0..3 {
            new_rgba[i] = (f32::from(rgba[i]) * value).max(0.0).min(255.0) as u8;
        }
        new_rgba[3] = rgba[3]; // Copy the alpha channel
        adjusted_image.put_pixel(x, y, Rgba(new_rgba));
    }

    DynamicImage::ImageRgba8(adjusted_image)
}