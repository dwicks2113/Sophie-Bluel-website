// fetch data from work endpoint(url) -- see Thunderclient or Swagger


document.addEventListener("DOMContentLoaded", function(){
  const btnContainer = document.getElementById('btn-container');
  const gallery = document.querySelector('.gallery');
  const projectsLink = document.getElementById('projects-link');
  const closeModalButton = document.getElementById('close-modal');
  const modal = document.getElementById('modal');
  const thumbnailContainer = document.getElementById('thumbnail-container')
  const addPhotoButton = document.getElementById('add-photo');
  // const photoInput = document.getElementById('photo-input');
  const addPhotoModal = document.getElementById('add-photo-modal');
  const closeAddPhotoModalButton = document.getElementById('close-add-photo-modal');
  const addPhotoForm = document.getElementById('add-photo-form');

//function to check for valid login token
  function isLoggedIn() {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  function getToken() {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  function filterGallery(catID) {
  const figures = gallery.querySelectorAll('figure');
  figures.forEach(figure => {
    console.log(figure.dataset);
    if(catID === 0 || figure.dataset.catID == catID) {
      figure.style.display = 'block';
    } else {
    figure.style.display = 'none';
   }
  });
  }

  function createThumbnail(work) {
    const thumbnailContainer = document.createElement('div');
    thumbnailContainer.classList.add('thumbnail-container');

    const thumbnail = document.createElement('img');
    thumbnail.src = work.imageUrl;
    thumbnail.alt = work.title;
    thumbnail.classList.add('thumbnail');

    const trashIcon = document.createElement('span');
    trashIcon.classList.add('trash-icon');
    trashIcon.innerHTML = '&#128465';

    trashIcon.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this photo?')) {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Token not found. Please log in again.');
          window.location.href = 'login.html';
          return;
        }

 

fetch('http://localhost:5678/api/works/${work.id}', {
  method: 'DELETE',
  headers: {
    'Authorization':  `Bearer ${token}`
  }
})

.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.text();
})
.then(data => {
  console.log(data);
        //remove thumbnail from modal
  thumbnailContainer.remove();
        //remove the item from the main gallery
  const mainGalleryItem = document.querySelector(`.gallery figure[data-id="${work.id}"]`);
  if (mainGalleryItem) {
    mainGalleryItem.remove();
  }
    alert('Photo deleted successfully.');
  })
  .catch (error => {
    console.error('Error deleting photo:', error);
    alert('Failed to delete photo: ' + error.message);
  });
  }
});

// console.log(data)

//       }
//       });

    thumbnailContainer.appendChild(thumbnail);
    thumbnailContainer.appendChild(trashIcon);
    document.getElementById('thumbnail-container').appendChild(thumbnailContainer);

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

    if (!isLoggedIn()) {
      alert('Please log in to view the projects.');
      window.location.href = 'login.html';
      return;
    }

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
  });

   //function to close modal

  closeModalButton.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  //close the modal window when clicking outside modal content
  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });

  //add photo
  addPhotoButton.addEventListener('click', () => {
    addPhotoModal.style.display = 'flex';
  });

  closeAddPhotoModalButton.addEventListener('click', () => {
    addPhotoModal.style.display = 'none';
  });

  addPhotoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const photoFile = document.getElementById('photo-file').files[0];
    const photoTitle = document.getElementById('photo-title').value;
    const photoCategory = document.getElementById('photo-category').value;
    const token = localStorage.getItem('token');
    console.log('Token is ', token);

    if (photoFile && token) {
      const formData = new FormData();
      formData.append('photo', photoFile);
      formData.append('title', photoTitle);
      formData.append('category', photoCategory);
   
      fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' +response.statusText);
         }
         return response.json();
        })

      .then(data => {
        if (data.success) {
          console.log('Photo uploaded successfully.');

            const work = {
              imageUrl: data.imageUrl,
              title: photoTitle,
              category: {id: photoCategory}
            };
      

        //add to gallery and modal
        createGalleryItem(work);
        createThumbnail(work);

        addPhotoModal.style.display = 'none';
        } else {
        alert('Failed to upload photo: ' + (data.message || 'Unknown error'));
        }
      })
      .catch(error => {
        console.error('Error uploading photo: ' + error);
        alert('Failed to upload photo: ' + error.message);
      });
    } else {
      alert('Token not found. Please log in again.');
      window.location.href = 'login.html';
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
  figure.dataset.id = work.id;  // add data-id attribute
  const img = document.createElement('img');
  const figCaption = document.createElement('figCaption');
  
    img.src = work.imageUrl;
    img.alt = work.title;
    figCaption.textContent = work.title;

    figure.dataset.catID = work.category.id;
    figure.appendChild(img);  
    figure.appendChild(figCaption);

    if (gallery) {
      gallery.appendChild(figure)
    } else {
      console.error('Gallery Element not found');
  }
 }
});
})
