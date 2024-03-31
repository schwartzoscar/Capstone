export async function updateCanvas(image, canvas, crop, callback)  {
  // Getting Canvas Context
  const ctx = canvas.getContext('2d');
  if(!ctx) throw new Error('No 2d context');
  // Calculate Constants
  const pixelRatio = window.devicePixelRatio;
  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;
  // Set Canvas Size
  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);
  // Update Image Scale and Quality
  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';
  ctx.save();
  // Set Image to Match Crop Position
  ctx.translate(-cropX, -cropY);
  ctx.translate(centerX, centerY);
  ctx.translate(-centerX, -centerY);
  // Update Canvas
  ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, image.naturalWidth, image.naturalHeight);
  ctx.restore();
  // Convert Canvas to Blob
  canvas.toBlob(callback, 'image/jpeg');
}
