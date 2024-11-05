// fetch data from work endpoint(url) -- see Thunderclient or Swagger
// for each item in array,
// create html element

//attach element to gallery
fetch('http://localhost:5678/api/works')
  .then(response => {
    return response.json()
  })
  .then(works => {
    // console.log(works)
    // for each item in array,
      // const categories = new Set(work, category) // Use a Set to store unique category IDs
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


// Create a new button element

// Fetch data from the API
// fetch('http://localhost:5678/api/works')
//   .then(response => response.json())
//   .then(works => {
//     const categories = new Set() // Use a Set to store unique category IDs

//     // Loop through each work and add its category ID to the Set
//    let category = document.querySelectorAll('.category.name') // Example for NodeList
// category.forEach(work => {
//   // Your code here
// // })
// // forEach(work => {
//       if (work.category) {
//         // Ensure category exists
//         category.add(work.category)
//        }
  //  const btnContainer = document.getElementById('btn-container');
  //   // })
  //   const category = document.createElement(category.name);
  //   // const categories = querySelector(work.category.name)
  // // For each unique category, create a button
  //   // catName.forEach('work:category', => {
  //     const button = document.createElement('button');
  //     button.textContent = category // Set the button's text to the category ID or name
  //     console.log(category);
  //   button.setAttribute('category', category); // Set data-filter attribute for filtering

  //   // // Append the button to the container
  //   btnContainer.appendChild(button)
   
  const btnContainer = document.getElementById('btn-container')

// Assuming 'work' is an array of objects with a 'category' property
const work = [
  { category: { name: 'All' } },
  { category: { name: 'Objects' } },
  { category: { name: 'Hotels and Restaurants'} },
  { category: { name: 'Apartments'} },
  // Add more objects as needed
]

// For each unique category, create a button
work.forEach(item => {
  const category = item.category // Initialize 'category' here
  const button = document.createElement('button')
  button.style.backgroundColor = '#1d61544c'
  button.style.borderRadius = 20
  button.textContent = category.name
  console.log(category.name)
  button.setAttribute('category', category.name) 

  // Append the button to the container
  btnContainer.appendChild(button)
})




// catName.textContent = work.category.name

// const btn = document.createElement('button')
// // const btnContainer = document.getElementById('btn-container')
// btnContainer.appendChild(btn)
// btn.textContent = catName


// const filterBtnName = work.category.name
// btn.textContent = work.category.name;



//create button for each category name/id
//for each create button i++
//create one button to pull all works (All)
//add style to button and onclick to pull only jobs under that category id

// function filterBtn () {
//   // const catID = document.createElement('categoryID')
//   // const catName = document.createElement('categoryName')
// //   


// }


function createGalleryItem (work) {
  const figure = document.createElement('figure')

  // Create an img element and set its src and alt attributes
  const img = document.createElement('img')
  const figCaption = document.createElement('figCaption')
  

  img.src = work.imageUrl
  
  figCaption.textContent = work.title
  // catName.textContent = work.category.name
  // catID.textContent = work.category.id
  

  // Append the img to the figure
  figure.appendChild(img)
  
  // Create a figcaption element
  figure.appendChild(figCaption);
  // figure.appendChild(catName);
  // figure.appendChild(catID);

   // Append the figure to the gallery element
  const gallery = document.querySelector('.gallery')
  if (gallery) {
    gallery.appendChild(figure)
  }
}
