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

    for (const work of works) {
      console.log('work:', work)
    }
  })

  // catch error
  .catch(error => {
    console.error('Error fetching data:', error)
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

//
// Create a figure element
const figure = document.createElement('figure')

// Create an img element and set its src and alt attributes
const img = document.createElement('img')
// img.src = 'assets/images/appartement-paris-v.png'
// img.alt = 'Paris V Appartment'

// Append the img to the figure
figure.appendChild(img)

// Create a figcaption element
const figcaption = document.createElement('figcaption')

// Create a text node for the caption and append it to the figcaption
const captionText = document.createTextNode('Paris V Appartment')
figcaption.appendChild(captionText)

// Append the figcaption to the figure
figure.appendChild(figcaption)

// Append the figure to the gallery element
const gallery = document.querySelector('.gallery')
if (gallery) {
  gallery.appendChild(figure)
}

// document.body.appendChild(figure);
