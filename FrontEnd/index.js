// fetch data from work endpoint(url) -- see Thunderclient or Swagger
document.addEventListener("DOMContentLoaded", function(){
  const addPhotoButton = document.getElementById('add-photo');
  const addPhotoModal = document.getElementById('add-photo-modal');
  const closeAddPhotoModalButton = document.getElementById('close-add-photo-modal');
  const uploadButton = document.getElementById('upload-button');
  const photoFileInput = document.getElementById('photo-file');
  const photoIcon = document.getElementById('photoIcon');
  const photoPreview = document.getElementById('photoPreview');
  const fileNameDisplay = document.getElementById('fileNameDisplay');
  const photoGalleryModal = document.getElementById('modal');
  const closePhotoGalleryModalButton = document.getElementById('close-modal');
  const addPhotoForm = document.getElementById('add-photo-form');
  const thumbnailContainer = document.getElementById('thumbnail-container')
  const gallery = document.querySelector('.gallery');
  const btnContainer = document.getElementById('btn-container')
  const projectsLink = document.getElementById('projects-link')

  // Ensure modals are hidden by default
  addPhotoModal.style.display = 'none';
  photoGalleryModal.style.display = 'none';


  //open file selection window when add photo button clicked
  uploadButton.addEventListener('click', function() {
    photoFileInput.click();
  });
  
 // show photo preview after selecting a file
  photoFileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
      const fileName = file.name;
      fileNameDisplay.textContent = `Selected file: ${fileName}`;
      console.log(file);

      const reader = new FileReader();
      reader.onload = function(e) {
        photoPreview.src = e.target.result;
        photoPreview.style.display = 'block';
        photoIcon.style.display  = 'none';
        uploadButton.style.display = 'none';
        document.querySelector('.upload-info').style.display = 'none';
      };
      reader.readAsDataURL(file);
    } else {
      fileNameDisplay.textContent = '';
      photoPreview.style.display = 'none';
      photoIcon.style.display = 'block';
      uploadButton.style.display = 'block';
      document.querySelector('.upload-info').style.display = 'block';
    }
  });
  
//show add photo modal window
addPhotoButton.addEventListener('click', function() {
  photoGalleryModal.style.display = 'none';
    addPhotoModal.style.display = 'block';
  });

  //close add photo modal window
  closeAddPhotoModalButton.addEventListener('click', function() {
    addPhotoModal.style.display = 'none';
    photoGalleryModal.style.display = 'block';
  })

  //close project gallery modal
  closePhotoGalleryModalButton.addEventListener('click', function() {
    photoGalleryModal.style.display = 'none';
  });

  //close project gallery window by clicking outside of modal window
  window.addEventListener('click', function(event) {
  if (event.target == addPhotoModal) {
    addPhotoModal.style.display = 'none';
    photoGalleryModal.style.display = 'block';
  } else if (event.target == photoGalleryModal) {
    photoGalleryModal.style.display = 'none';
  }
});

//form submission
addPhotoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const photoFile = photoFileInput.files[0];
  const photoTitle = document.getElementById('photo-title').value;
  const photoCategory = document.getElementById('photo-category').value;
  const token = localStorage.getItem('token');

  if (photoFile && token) {
    const formData = new FormData();
    formData.append('image', photoFile);
    formData.append('title', photoTitle);
    formData.append('category', photoCategory);

    fetch('http://localhost:5678/api/works', {
      method: `POST`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
        console.log('Photo uploaded successfully.');

        const work = {
          imageUrl: data.imageUrl,
          title: photoTitle,
          category: {id: photoCategory}
        };

        //Add to gallery and modal
        createGalleryItem(work);
        createThumbnail(work);

        //close modal
        addPhotoModal.style.display = 'none';
        photoGalleryModal.style.display = 'flex';
        
        thumbnailContainer.scrollTop = thumbnailContainer.scrollHeight;

        alert('Photo uploaded successfully!');
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

function isLoggedIn() {
  const token = localStorage.getItem('token');
  return token !== null;
}

function filterGallery(catID) {
  const figures = gallery.querySelectorAll('figure');
  figures.forEach(figure => {
    // console.log(figure.dataset);
    if(catID === 0 || figure.dataset.catID == catID) {
      figure.style.display = 'block';
    } else {
    figure.style.display = 'none';
   }
  });
  }

  const work = [
    { category: { name: 'All', btnID: 0 } },
    { category: { name: 'Objects', btnID: 1 } },
    { category: { name: 'Apartments', btnID: 2 } },
    { category: { name: 'Hotels and Restaurants', btnID: 3 } }
  ];

  work.forEach(item => {
    const category = item.category.name;
    const button = document.createElement('button');
    button.className = 'button';
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

  //function to open project modal
  projectsLink.addEventListener('click', function(event) {
    event.preventDefault();

    if (!isLoggedIn()) {
      alert('Please log in to view the projects.');
      window.location.href = 'login.html';
      return;
    } 

    modal.style.display = 'flex';
    thumbnailContainer.innerHTML = '';

    // add thumbnails to the modal windows
    const figures = gallery.querySelectorAll('figure');
    figures.forEach(figure => {
      const img = figure.querySelector('img');
      const title = figure.querySelector('figcaption').textContent;
      const work = {
        imageUrl: img.src,
        title: title,
        id: figure.dataset.id
      };
      createThumbnail(work);
    });
  });

  //function to close project modal
  // closeModalButton.addEventListener('click', function(event) {
  //   if (event.target == modal) {
  //     modal.style.display = 'none';
  //   }
  // });

  //function to create thumbnail
  function createThumbnail(work) {
    const thumbnailContainer = document.createElement('div');
    thumbnailContainer.classList.add('thumbnail-container');
    // thumbnail.dataset.id = work.id;

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
 fetch(`http://localhost:5678/api/works/${work.id}`, {
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

thumbnailContainer.appendChild(thumbnail);
thumbnailContainer.appendChild(trashIcon);
document.getElementById('thumbnail-container').appendChild(thumbnailContainer);
}

//fetch and display works
fetch('http://localhost:5678/api/works')
.then(response => response.json())
.then(works => {
  const categories = new Set();

  works.forEach(work => {
    if (work.category) {
      categories.add(work.category);
    }
  });

  works.forEach(work => {
    console.log('work:', work);
    createGalleryItem(work);
  });
})
.catch(error => {
  console.error('Error fetching data:', error);
});

//function to create gallery item
function createGalleryItem(work) {
  const figure = document.createElement('figure');
  figure.dataset.id = work.id;
  const img = document.createElement('img');
  const figCaption = document.createElement('figcaption');

  img.src = work.imageUrl;
  img.alt = work.title;
  figCaption.textContent = work.title;

  figure.dataset.catID = work.category.id;
  figure.appendChild(img);
  figure.appendChild(figCaption);

  if (gallery) {
    gallery.appendChild(figure);
  } else {
    console.error('Gallery Element not found.');
  }
}
}) 
