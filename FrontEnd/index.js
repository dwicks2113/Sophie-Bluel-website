// fetch data from work endpoint(url) -- see Thunderclient or Swagger


document.addEventListener("DOMContentLoaded", function(){
  const btnContainer = document.getElementById('btn-container');
  const gallery = document.querySelector('.gallery')

   
  // let btnContainer = document.getElementById('btn-container');
  // const catName = document.createElement('category.name');
  // const btnID = document.createElement('filter-button');

//create buttons for categories and assign category ID number to each button
// document.addEventListener("DOMContentLoaded", function() {
const work = [
  { category: { name: 'All', btnID: 0 } },
  { category: { name: 'Objects', btnID: 1} },
  { category: { name: 'Hotels and Restaurants', btnID: 3} },
  { category: { name: 'Apartments', btnID: 2} }
 
];



// For each unique category, create a button
work.forEach(item => {
  // const btnContainer = document.getElementById('btn-container')
  const category = item.category.name; // Initialize 'category' here
  const button = document.createElement('button');
  button.className = 'button';
  // button.style.backgroundColor = 'white';
  // button.style.margin = '2em';
  // button.style.borderRadius = '30%';
  button.textContent = category;
  button.dataset.catID = item.category.btnID;

 button.addEventListener('click', () => {
  filterGallery(item.category.btnID);
});

button.addEventListener('mouseover', () => {
  button.classList.add('hover');
});

button.addEventListener('mouseout', () => {
  button.classList.remove('hover');
});


  btnContainer.appendChild(button);
});

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


function createGalleryItem (work) {
  const figure = document.createElement('figure')
  const img = document.createElement('img')
  const figCaption = document.createElement('figCaption')
  
    img.src = work.imageUrl;
    img.alt = work.title;
    figCaption.textContent = work.title

  figure.dataset.catID = work.category.btnID;
  figure.appendChild(img);   // Append the img to the figure
  figure.appendChild(figCaption);  // Create a figcaption element

   if (gallery) {
    gallery.appendChild(figure)
  } else {
    console.error('Gallery Element not found')
  }
 }

function filterGallery(catID) {
  const figures = gallery.querySelectorAll('figure');
  figures.forEach(figure => {
    if(catID===0 || figure.dataset.catID == catID) {
      figure.style.display = 'block';
    } else {
    figure.style.display = 'none';
   }
  });
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


 

})
