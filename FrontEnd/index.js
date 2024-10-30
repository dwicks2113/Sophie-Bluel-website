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


// Create a new button element
const button = document.createElement('button')

//create button for each category name/id
//for each create button i++
//create one button to pull all works (All)
//add style to button and onclick to pull only jobs under that category id

//function to create buttons dynamically
// function createButton(text, onClick) {
//   const button = document.createElement('button');
//   button.textContent = work.category.name[0];
//       // return text=work.category.name[0];
//     document.body.appendChild(button);
// }
// button.addEventListener('click', onClick);


function createGalleryItem (work) {
  const figure = document.createElement('figure')

  // Create an img element and set its src and alt attributes
  const img = document.createElement('img')
  const figCaption = document.createElement('figCaption')
  img.src = work.imageUrl
  // console.log('work title is', work.title)
 
  figCaption.textContent = work.title

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
