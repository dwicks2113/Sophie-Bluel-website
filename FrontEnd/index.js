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
    //   const categories = new Set() // Use a Set to store unique category IDs
    //   // Loop through each work and add its category ID to the Set
    // works.forEach(work => {
    //   if (work.category) {
    //     // Ensure category exists
    //     categories.add(work.category)
    //   }


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

// Fetch data from the API
// fetch('http://localhost:5678/api/works')
//   .then(response => response.json())
//   .then(works => {
//     const categories = new Set() // Use a Set to store unique category IDs

//     // Loop through each work and add its category ID to the Set
//     works.forEach(work => {
//       if (work.category) {
//         // Ensure category exists
//         categories.add(work.category)
//       }
//     })

    // Grab the container where you want to add the buttons
    // const buttonContainer = document.querySelector('.filter-buttons')
    

  //   // Create an "All" button for showing all items
    // const allButton = document.createElement('button')
    // allButton.textContent = 'All'
    // allButton.setAttribute('data-filter', 'all')
    // buttonContainer.appendChild(allButton)

  //   // For each unique category, create a button
  //   categories.forEach(category => {
  //     const button = document.createElement('button')
  //     button.textContent = category // Set the button's text to the category ID or name
  //     button.setAttribute('data-filter', category) // Set data-filter attribute for filtering

  //     // Append the button to the container
  //     buttonContainer.appendChild(button)
  //   })
  // })
  // .catch(error => {
  //   console.error('Error fetching data:', error)
  // })



// const btn = document.createElement('button')
// const btnContainer = document.getElementById('btn-container')
// btnContainer.appendChild(btn)
// btn.textContent = 'All'

// const filterBtnName = work.category.name
// btn.textContent = work.category.name;



//create button for each category name/id
//for each create button i++
//create one button to pull all works (All)
//add style to button and onclick to pull only jobs under that category id




function createGalleryItem (work) {
  const figure = document.createElement('figure')

  // Create an img element and set its src and alt attributes
  const img = document.createElement('img')
  const figCaption = document.createElement('figCaption')
  const catID = document.createElement('categoryID')
  const catName = document.createElement('categoryName')

  img.src = work.imageUrl
  
  figCaption.textContent = work.title
  catName.textContent = work.category.name
  console.log('this works')

  // Append the img to the figure
  figure.appendChild(img)
  
  // Create a figcaption element
  figure.appendChild(figCaption)
  figure.appendChild(catName);

   // Append the figure to the gallery element
  const gallery = document.querySelector('.gallery')
  if (gallery) {
    gallery.appendChild(figure)
  }
}
