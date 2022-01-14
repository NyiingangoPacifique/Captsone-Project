const humburgerIcn = document.getElementById('humburger');
const dropMenu = document.getElementById('Menu');

function toggleHumburger() {
    humburgerIcn.classList.toggle('active');
    dropMenu.classList.toggle('active');
}
humburgerIcn.addEventListener('click', toggleHumburger);