elem = document.getElementById('canvas');
context = elem.getContext('2d');
context.strokeStyle = '#f00';
context.fillStyle = '#f00';
context.font = 'italic 20px sans-serif';
context.textBaseline = 'top';


var ImgObj = new Image();
var resizedimg = new Image();

ImgObj.onload = function () {
  context.clearRect(0, 0, 512, 512);
  console.log(ImgObj.width);
  console.log(ImgObj.height);
  // Resize the image
  max_size = 512;
  width = ImgObj.width;
  height = ImgObj.height;
  if (width >= height) {
    if (width > max_size) {
      height *= max_size / width;
      width = max_size;
    }
  } else {
    if (height > max_size) {
      width *= max_size / height;
      height = max_size;
    }
  }
  elem.width = width;
  elem.height = height;
  context.drawImage(ImgObj, 0, 0, width, height);
  dataUrl = canvas.toDataURL('image/jpeg');
  resizedimg.src = dataUrl;

}

resizedimg.onload = function () {
  cocoSsd.load().then(model => {
    // detect objects in the image.
    model.detect(resizedimg).then(predictions => {
      console.log('Predictions: ', predictions);
      for (var i = 0; i < predictions.length; i += 1) {

        context.strokeStyle = '#f00';
        context.fillStyle = '#f00';
        context.font = 'italic 20px sans-serif';
        context.textBaseline = 'top';

        console.log(predictions[i]['class']);
        context.strokeRect(predictions[i]['bbox'][0], predictions[i]['bbox'][1], predictions[i]['bbox'][2], predictions[i]['bbox'][3]);
        context.fillText(predictions[i]['class'], predictions[i]['bbox'][0] + 10, predictions[i]['bbox'][1] + 10);
      }
    });
  });
}




var loadFile = function (event) {
  ImgObj.src = URL.createObjectURL(event.target.files[0]);
};