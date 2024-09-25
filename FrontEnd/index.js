// fetch data from work endpoint(url) -- see Thunderclient or Swagger
// for each item in array, 
    // create html element
    //<figure>
    //				<img src="assets/images/appartement-paris-v.png" alt="Paris V Appartment">
    //				<figcaption>Paris V Appartment</figcaption>
    //			</figure>
//attach element to gallery
fetch('http://localhost:5678/api/works')
  .then(response => {
    return response.json()
  })
  .then(works => {
    // console.log(works)
// for each item in array,


    for (const work of works)  {
        console.log("work:",work)
    }
})
  //create html element
    //          <figure>
    //				<img src="assets/images/appartement-paris-v.png" alt="Paris V Appartment">
    //				<figcaption>Paris V Appartment</figcaption>
    //			</figure>
    //attach element to gallery

    //1. create figure element
    //2. create image element
    //3. update src with url from work imageURL
    //4. update alt tage with title from work
    //5. attach img to figure
    //6. create figcaption element
    //7. update figcaption with title from work
    //8. appendChild figcaption to figure
    //9. grab gallery querySelector 
    //10. appendChild figure to gallery

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    // img.src = 'assets/images/appartement-paris-v.png';
    // img.alt = 'Paris V Appartment';
    // figure.appendChild(img);
    // const figcaption = document.createElement('Paris V Appartment');
    // const captionText = document.createTextNode('Paris V Appartment');
    // figure.appendChild(figcaption);

    
   const gallery =  document.querySelector('.gallery');
   

    // document.body.appendChild(figure);
      

  
