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
      const categories = new Set(work, 'category') // Use a Set to store unique category IDs
      // Loop through each work and add its category ID to the Set
     works.forEach(work => {
     if (work.category) {
    //     // Ensure category exists
       categories.add(work.category)
       

      }
    })

    for (const work of works) {
      console.log('work:', work)
      createGalleryItem(work)
    }
  })

  // catch error
  .catch(error => {
    console.error('Error fetching data:', error)
  })


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
  const catName = document.createElement('categoryName')
  
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
  button.style.margin = '1em'
  button.style.borderRadius = '20%'
  button.textContent = category.name

  button.setAttribute('category', category.name) 
  button.addEventListener('click', () => {
  alert('Button was clicked!')
})
  btnContainer.appendChild(button)
})


function createGalleryItem (work) {
  const figure = document.createElement('figure')
  const catID = document.createElement('categoryID')
    const catName = document.createElement('categoryName')
  // Create an img element and set its src and alt attributes
  const img = document.createElement('img')
  const figCaption = document.createElement('figCaption')
  const alt = document.createElement('alt')
  // const alt = document.getElementById('alt')
    img.src = work.imageUrl
  
  figCaption.textContent = work.title
  catName.textContent=work.category.name
  alt.textContent = work.alt
  catID.textContent = work.category.id
  
  console.log(work.category.id) // logging category.Id properly
  console.log(work.category.name)  //this works
  console.log(work.title)

   // Append the img to the figure
  figure.appendChild(img)
  
  // Create a figcaption element
  figure.appendChild(figCaption);
  // figure.appendChild(catName);  //appends catName and catID under figCaption on Images
  // figure.appendChild(catID);
  
   
  
  // Set the alt attribute of the image
  image.setAttribute('alt', alt)
  // alt.setAttribute('alt', work.title);
  
  
  
  // Set mouseover event to show Alt tag
  img.addEventListener('mouseover', function () {
      alt.textContent = alt.getAttribute('alt', work.title);
      alt.style.visibility = 'visible';
      console.log('This works')
  });

  img.addEventListener('mouseout', function() {
    alt.style.visibility = 'hidden';
    console.log('This works, too')
  });

  // Set the alt attribute of the image
// image.setAttribute('alt', 'An example image')

// Optionally, verify the alt attribute was added
// console.log(img.getAttribute('alt'))

// Optionally, verify the alt attribute was added
//console.log(img.getAttribute('alt'))

   // Append the figure to the gallery element
  const gallery = document.querySelector('.gallery')
  if (gallery) {
    gallery.appendChild(figure)
  }
 }




  
// // POST request using fetch with error handling
// const element = document.querySelector(
//   '#post-request-error-handling .article-id'
// )
// const requestOptions = {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ title: 'Fetch POST Request Example' })
// }
// fetch('https://reqres.in/invalid-url', requestOptions)
//   .then(async response => {
//     const isJson = response.headers
//       .get('content-type')
//       ?.includes('application/json')
//     const data = isJson && (await response.json())

//     // check for error response
//     if (!response.ok) {
//       // get error message from body or default to response status
//       const error = (data && data.message) || response.status
//       return Promise.reject(error)
//     }

//     element.innerHTML = data.id
//   })
//   .catch(error => {
//     element.parentElement.innerHTML = `Error: ${error}`
//     console.error('There was an error!', error)
//   })


 

 

