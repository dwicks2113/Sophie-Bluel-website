
document.addEventListener("DOMContentLoaded", function() {
    const openModalButton = document.getElementById('open-modal');
    const closeModalButton = document.getElementById('close-modal');
    const modal = document.getElementById('modal');

    //function to open modal

    openModalButton.addEventListener('click', function() {
        modal.style.display = 'flex';
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
});