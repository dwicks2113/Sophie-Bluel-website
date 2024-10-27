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
const button = document.createElement('button')



//function to create buttons dynamically
function createButton(text, onClick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', onClick);
    return text.src=works.category.name;
}



// // Set the button's text content
const buttonContainer = document.getElementById('buttonContainer')
for (let i = 1; i <= 3; i++) {
  const button = createButton(`Button ${i}`, () => alert('Button ${i} clicked!')

  // set button.text = document.getElementById(category.name)
  //   else 
  //   const button = createButton('All')
  )
  buttonContainer.appendChild(button)
}






function createGalleryItem (work) {
  const figure = document.createElement('figure')

  // Create an img element and set its src and alt attributes
  const img = document.createElement('img')
  const figCaption = document.createElement('title')
  img.src = work.imageUrl
  figCaption.src = work.title

  // Append the img to the figure
  figure.appendChild(img)
  
  // Create a figcaption element
  figure.appendChild(figCaption)

 

  // Append the figure to the gallery element
  const gallery = document.querySelector('.gallery')
  if (gallery) {
    gallery.appendChild(figure)
  }
}
