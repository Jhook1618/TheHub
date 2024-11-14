import fs from 'fs';

fs.readFile('uniqueData.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  let products = JSON.parse(data);
  
  products = products.map(product => {
    product.price = Number(product.price.replace("KSh", "").replace(/,/g, ''));
    return product;
  });

  const updatedData = JSON.stringify(products, null, 2);
  
  fs.writeFile('products.json', updatedData, 'utf8', err => {
    if (err) {
      console.error('Error writing the file:', err);
      return;
    }
    console.log('File successfully updated with processed prices!');
  });
});
