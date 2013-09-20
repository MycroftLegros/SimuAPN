
var kernel, kernelSize, kernelSum;











function Flou(img_src,sigma) {

 buildKernel(sigma);




	//Canvas temporaire
	var cvs = document.createElement("canvas");

	cvs.width = img_src.width;
	cvs.height = img_src.height;

	var ct = cvs.getContext("2d");

	//Dessine l'image
	ct.drawImage(img_src, 0, 0);

	//Transforme l'image en Image Data
	var imgData = ct.getImageData(0, 0, img_src.width - 1, img_src.height - 1);


  var width = imgData.width, height = imgData.height;
  var data = imgData.data;

  var len = data.length;
  

  for (var y = 0; y < height; ++y) {
    for (var x = 0; x < width; ++x) {
      var r = 0, g = 0, b = 0, a = 0;
      for (j = 1 - kernelSize; j < kernelSize; ++j) {
        if (y + j < 0 || y + j >= height) continue;
        for (i = 1 - kernelSize; i < kernelSize; ++i) {
          if (x + i < 0 || x + i >= width) continue;
          r += data[4 * ((y + j) * width + (x + i)) + 0] * kernel[Math.abs(j)][Math.abs(i)];
          g += data[4 * ((y + j) * width + (x + i)) + 1] * kernel[Math.abs(j)][Math.abs(i)];
          b += data[4 * ((y + j) * width + (x + i)) + 2] * kernel[Math.abs(j)][Math.abs(i)];
          a += data[4 * ((y + j) * width + (x + i)) + 3] * kernel[Math.abs(j)][Math.abs(i)];
        }
      }
      data[4 * (y * width + x) + 0] = r / kernelSum;
      data[4 * (y * width + x) + 1] = g / kernelSum;
      data[4 * (y * width + x) + 2] = b / kernelSum;
      data[4 * (y * width + x) + 3] = a / kernelSum;
    }
  }
  

  for (var i = 0; i < data.length; i++) {
      imgData.data[i] = data[i];
  }


  
	//RAZ et dessine la nouvelle image
	cvs.width = img_src.width;
	cvs.height = img_src.height;
	ct.putImageData(imgData, 0, 0);

	//Cvs => image
	img_temp = document.createElement("IMG");
	dataURL_temp = cvs.toDataURL("image/png");
	img_temp.src = dataURL_temp;


	return {
		img_flou: img_temp
	};


}








function Flou_saved(imgData,sigma) {

 buildKernel(sigma);

  var width = imgData.width, height = imgData.height;
  var data = imgData.data;

  var len = data.length;
  

  for (var y = 0; y < height; ++y) {
    for (var x = 0; x < width; ++x) {
      var r = 0, g = 0, b = 0, a = 0;
      for (j = 1 - kernelSize; j < kernelSize; ++j) {
        if (y + j < 0 || y + j >= height) continue;
        for (i = 1 - kernelSize; i < kernelSize; ++i) {
          if (x + i < 0 || x + i >= width) continue;
          r += data[4 * ((y + j) * width + (x + i)) + 0] * kernel[Math.abs(j)][Math.abs(i)];
          g += data[4 * ((y + j) * width + (x + i)) + 1] * kernel[Math.abs(j)][Math.abs(i)];
          b += data[4 * ((y + j) * width + (x + i)) + 2] * kernel[Math.abs(j)][Math.abs(i)];
          a += data[4 * ((y + j) * width + (x + i)) + 3] * kernel[Math.abs(j)][Math.abs(i)];
        }
      }
      data[4 * (y * width + x) + 0] = r / kernelSum;
      data[4 * (y * width + x) + 1] = g / kernelSum;
      data[4 * (y * width + x) + 2] = b / kernelSum;
      data[4 * (y * width + x) + 3] = a / kernelSum;
    }
  }
  

  for (var i = 0; i < data.length; i++) {
      imgData.data[i] = data[i];
  }
  
  return {
		imgData_flou: imgData
	};


}




//Construit le kernel pour le flou gaussien
//TBD: construire le kernel avec des tables d'enteirs plutot qu'avec des calculs gourmands
function buildKernel(sigma) {
var ss = sigma * sigma;
var factor = 2 * Math.PI * ss;
kernel = [];
kernel.push([]);
var i = 0, j;
do {
    var g = Math.exp(-(i * i) / (2 * ss)) / factor;
    if (g < 1e-3) break;
    kernel[0].push(g);
    ++i;
} while (i < 7);
kernelSize = i;
for (j = 1; j < kernelSize; ++j) {
    kernel.push([]);
    for (i = 0; i < kernelSize; ++i) {
        var g = Math.exp(-(i * i + j * j) / (2 * ss)) / factor;
        kernel[j].push(g);
    }
}
kernelSum = 0;
for (j = 1 - kernelSize; j < kernelSize; ++j) {
    for (i = 1 - kernelSize; i < kernelSize; ++i) {
        kernelSum += kernel[Math.abs(j)][Math.abs(i)];
    }
}
}




//bright varie de 0 à +infini, 1 = luminosité normale

function Luminosite(imgData_src, bright) {

	for (var i = 0; i < imgData_src.data.length; i += 4) {

		imgData_src.data[i] = bright * imgData_src.data[i];
		imgData_src.data[i + 1] = bright * imgData_src.data[i + 1];
		imgData_src.data[i + 2] = bright * imgData_src.data[i + 2];

		if (imgData_src.data[i] > 255)
			imgData_src.data[i] = 255;

		if (imgData_src.data[i + 1] > 255)
			imgData_src.data[i + 1] = 255;

		if (imgData_src.data[i + 2] > 255)
			imgData_src.data[i + 2] = 255;
	}


	return {
		imgData_lum: imgData_src
	};
}



//img=>cvs=>ImageData=>cvs=>dataURL=>img

function Luminosite_saved(img_src, bright) {

	//Canvas temporaire
	var cvs = document.createElement("canvas");

	cvs.width = img_src.width;
	cvs.height = img_src.height;

	var ct = cvs.getContext("2d");

	//Dessine l'image
	ct.drawImage(img_src, 0, 0);

	//Transforme l'image en Image Data
	var imageData = ct.getImageData(0, 0, img_src.width - 1, img_src.height - 1);


	//Applique la luminosité
	for (var i = 0; i < imageData.data.length; i += 4) {

		imageData.data[i] = bright * imageData.data[i];
		imageData.data[i + 1] = bright * imageData.data[i + 1];
		imageData.data[i + 2] = bright * imageData.data[i + 2];

		if (imageData.data[i] > 255)
			imageData.data[i] = 255;

		if (imageData.data[i + 1] > 255)
			imageData.data[i + 1] = 255;

		if (imageData.data[i + 2] > 255)
			imageData.data[i + 2] = 255;
	}

	//RAZ et dessine la nouvelle image
	cvs.width = img_src.width;
	cvs.height = img_src.height;
	ct.putImageData(imageData, 0, 0);

	//Cvs => image
	img_temp = document.createElement("IMG");
	dataURL_temp = cvs.toDataURL("image/png");
	img_temp.src = dataURL_temp;


	return {
		img_lum: img_temp
	};
}


     