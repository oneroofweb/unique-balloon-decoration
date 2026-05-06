document.addEventListener("DOMContentLoaded", function() {
    // Mobile Sidebar Toggle Logic
    const menuToggle = document.getElementById("menu-toggle");
    const wrapper = document.getElementById("wrapper");

    if (menuToggle) {
        menuToggle.addEventListener("click", function(e) {
            e.preventDefault();
            wrapper.classList.toggle("toggled");
        });
    }

    // Optional: Close sidebar if clicked outside on mobile
    document.addEventListener("click", function(event) {
        const isClickInsideSidebar = document.getElementById('sidebar-wrapper').contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (window.innerWidth <= 768 && wrapper.classList.contains("toggled") && !isClickInsideSidebar && !isClickOnToggle) {
            wrapper.classList.remove("toggled");
        }
    });
});