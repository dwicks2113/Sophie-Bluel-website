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
      createGalleryItem(work)
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

// Create a figure element
// Create a new button element
// const button = document.createElement('button')

// // Set the button's text content
// button.textContent = ''

// // Add a click event listener to the button
// button.addEventListener('click', function () {
//   alert('Button clicked!')
// })

// // Append the button to a container element
// document.getElementById('buttonContainer').appendChild

function createGalleryItem (work) {
  const figure = document.createElement('figure')

  // Create an img element and set its src and alt attributes
  const img = document.createElement('img')
  const title = document.createElement('title')

  img.src = work.imageUrl
  title.src = work.title

  //  img.alt = works.name
  // Append the img to the figure
  figure.appendChild(img)
  figure.appendChild(title)

  // Create a figcaption element
  // const title = document.createElement('title')
  // title.src = work.title
  // figure.appendChild(title)

  // Create a text node for the caption and append it to the figcaption
  // const captionText = document.createTextNode('')
  // figcaption.appendChild(captionText)

  // Append the figcaption to the figure
  // figure.appendChild(figcaption)

  // Append the figure to the gallery element
  const gallery = document.querySelector('.gallery')
  if (gallery) {
    gallery.appendChild(figure)
  }
}
