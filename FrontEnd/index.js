// fetch data from work endpoint(url) -- see Thunderclient or Swagger


document.addEventListener("DOMContentLoaded", function(){
  const btnContainer = document.getElementById('btn-container');
  const gallery = document.querySelector('.gallery');
  const projectsLink = document.getElementById('projects-link')
  const closeModalButton = document.getElementById('close-modal')
  const modal = document.getElementById('modal')
  const thumbnailContainer = document.getElementById('thumbnail-container')
  const addPhotoButton = document.getElementById('add-photo');
  const photoInput = document.getElementById('photo-input');

  function filterGallery(catID) {
  const figures = gallery.querySelectorAll('figure');
  figures.forEach(figure => {
    console.log(figure.dataset)
    if(catID === 0 || figure.dataset.catID == catID) {
      figure.style.display = 'block';
    } else {
    figure.style.display = 'none';
   }
  });
  }

  function createThumbnail(work) {
    const thumbnail = document.createElement('img');
    thumbnail.src = work.imageUrl;
    thumbnail.alt = work.title;
    thumbnail.classList.add('thumbnail');
    thumbnailContainer.appendChild(thumbnail);
  }
//create buttons for categories and assign category ID number to each button

const work = [
  { category: { name: 'All', btnID: 0 } },
  { category: { name: 'Objects', btnID: 1} },
  { category: { name: 'Apartments', btnID: 2} },
  { category: { name: 'Hotels and Restaurants', btnID: 3} }
];

// For each unique category, create a button
work.forEach(item => {

  const category = item.category.name; // Initialize 'category' here
  const button = document.createElement('button');
  button.className = 'button';
  
  button.textContent = category;
  button.dataset.catID = item.category.btnID;

  button.addEventListener('click', () => {
  //console.log(`Button clicked: ${category}, btnID: ${item.category.btnID}`);
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



  //function to open modal

  projectsLink.addEventListener('click', function(event) {
    event.preventDefault();
    modal.style.display = 'flex';
    thumbnailContainer.innerHTML = '';  // clear previous thumbnail
  
    //add thumbnails to the  modal window
    const figures = gallery.querySelectorAll('figure');
    figures.forEach(figure => {
      const img = figure.querySelector('img');
      const title = figure.querySelector('figcaption').textContent;
      const work = {
        imageUrl: img.src,
        title: title
      };
      createThumbnail(work);
    });


//load projectmgmt.js script
    const script = document.createElement('script');
    script.src = 'projectmgmt.js';
    script.type = 'text/javascript';
    document.body.appendChild(script);
  });

  //function to close modal

  closeModalButton.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  //close the modal window when clicking outside modal content
  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });

  //add photo
  addPhotoButton.addEventListener('click', () => {
    photoInput.click();
  });

  //upload photo
  photoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);

      fetch('http://localhost:5678/api/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json()
      .then(data => {
        if (data.success) {
          console.log('Photo uploaded successfully.');
            const work = {
              imageUrl: data.imageUrl,
              title: file.name
            };
      

        //add to gallery and modal
        createGalleryItem(work);
        createThumbnail(work);
      } else {
        alert('Failed to upload photo: ' + (data.message || 'Unknown error'));
      }
      })
      .catch(error => {
        console.error('Error uploading photo: ' + error);
        alert('Failed to upload photo: ' + error.message);
      }))
    }
  });

fetch('http://localhost:5678/api/works')
  .then(response => {response.json()
  .then(works => {
    const categories = new Set() // Use a Set to store unique category IDs
    
   works.forEach(work => {
      if (work.category) {
        //    Ensure category exists
        categories.add(work.category)
      }
    });

    works.forEach (work => {
      console.log('work:', work)
      createGalleryItem(work)
    });
  })

  // catch error
  .catch(error => {
    console.error('Error fetching data:', error)
  });


function createGalleryItem(work) {
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const figCaption = document.createElement('figCaption');
  
    img.src = work.imageUrl;
    img.alt = work.title;
    figCaption.textContent = work.title;

  figure.dataset.catID = work.category.id;
  // console.log(`Created gallery item with catID: ${work.category.id}`)
  figure.appendChild(img);   // Append the img to the figure
  figure.appendChild(figCaption);  // Create a figcaption element

   if (gallery) {
    gallery.appendChild(figure)
  } else {
    console.error('Gallery Element not found')
  }
 }
});
})
