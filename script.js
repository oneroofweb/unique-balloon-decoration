/* ==========================================================================
   EVENT BUCKET - MASTER JAVASCRIPT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function() {

    /* --------------------------------------------------------------------------
       1. GLOBAL UTILITIES
       -------------------------------------------------------------------------- */
    
    // Check local storage for previously selected city and update Nav bars if needed
    // const savedCity = localStorage.getItem('selectedCity');
    // if (savedCity) {
    //     // Updates Desktop Nav
    //     const desktopCityLabel = document.getElementById('desktopNavCity');
    //     if (desktopCityLabel) desktopCityLabel.innerText = savedCity;
        
    //     // Updates Mobile Nav
    //     const mobileCityLabel = document.getElementById('mobileSelectedCity');
    //     if (mobileCityLabel) mobileCityLabel.innerText = savedCity;
    // }


    /* --------------------------------------------------------------------------
       2. LISTING PAGE: FILTER LOGIC
       -------------------------------------------------------------------------- */
       
    // Live Search inside Dropdown Filters (e.g. Locality, Category)
    const dropdownSearchInputs = document.querySelectorAll('.dropdown-search');
    if (dropdownSearchInputs.length > 0) {
        dropdownSearchInputs.forEach(input => {
            input.addEventListener('keyup', function() {
                let filter = this.value.toUpperCase();
                let listContainer = this.closest('.dropdown-menu').querySelector('.list-options');
                let items = listContainer.querySelectorAll('.option-link');

                items.forEach(item => {
                    let txtValue = item.textContent || item.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        item.style.display = "";
                    } else {
                        item.style.display = "none";
                    }
                });
            });
        });
    }
}); // End DOMContentLoaded


/* --------------------------------------------------------------------------
   3. LISTING PAGE: DROPDOWN SELECTION FUNCTION
   -------------------------------------------------------------------------- */
// Called via inline onclick="selectFilter(this, 'btnId')"
function selectFilter(element, btnId) {
    // 1. Get text of the selected item
    let text = element.querySelector("span:first-child") 
        ? element.querySelector("span:first-child").innerText 
        : element.innerText;
        
    // 2. Update the main button text and styling
    let btn = document.getElementById(btnId);
    if(btn) {
        btn.innerText = text;
        btn.classList.add("active-filter");
        
        // 3. Close the bootstrap dropdown programmatically
        const dropdownInstance = bootstrap.Dropdown.getOrCreateInstance(btn);
        dropdownInstance.hide();
    }

    // 4. Update Active class within the list
    let parentDiv = element.closest(".list-options");
    if(parentDiv) {
        parentDiv.querySelectorAll(".option-link").forEach((el) => el.classList.remove("active"));
        element.classList.add("active");
    }
}


/* --------------------------------------------------------------------------
   4. ABOUT US SECTION: READ MORE / SHOW LESS
   -------------------------------------------------------------------------- */
let currentHeight = 220; // Matches initial CSS max-height
const stepHeight = 400;  // How many pixels to expand per click

function loadMoreContent(btn) {
    const contentBox = document.getElementById('aboutContentArea');
    const fadeOverlay = document.getElementById('aboutFade');
    
    if(!contentBox) return; // Exit if element doesn't exist on page

    const spanText = btn.querySelector('span');
    const icon = btn.querySelector('i');
    const totalHeight = contentBox.scrollHeight;

    // Logic: Collapse Everything
    if (spanText.innerText === "Show Less") {
        contentBox.style.maxHeight = "220px"; 
        currentHeight = 220; 
        spanText.innerText = "Read More";
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        
        if(fadeOverlay) fadeOverlay.style.opacity = "1"; // Show gradient fade again
        
        contentBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    // Logic: Expand by Step
    currentHeight += stepHeight;

    if (currentHeight >= totalHeight) {
        contentBox.style.maxHeight = totalHeight + "px"; // Open fully
        spanText.innerText = "Show Less";
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        
        if(fadeOverlay) fadeOverlay.style.opacity = "0"; // Hide gradient fade
    } else {
        contentBox.style.maxHeight = currentHeight + "px"; // Open partially
    }
}


/* --------------------------------------------------------------------------
   5. CITY SELECTION PAGE LOGIC
   -------------------------------------------------------------------------- */

// Update City Text locally without redirect (Used in Navbar dropdowns)
function updateCity(cityName) {
    document.querySelectorAll('#desktopNavCity, #mobileSelectedCity').forEach(el => {
        el.innerText = cityName;
    });
    localStorage.setItem('selectedCity', cityName);
}

// Save City & Redirect (Used on the Dedicated City Selection Page)
function selectCityAndRedirect(cityName, pageUrl) {
    localStorage.setItem('selectedCity', cityName);
    window.location.href = pageUrl;
}

// Live Search for Full-Screen City List
function filterCities() {
    let inputEl = document.getElementById('citySearchInput');
    if (!inputEl) return;

    let input = inputEl.value.toLowerCase();
    let cityItems = document.querySelectorAll('.city-item');
    let popularSection = document.getElementById('popularSection');
    let noCityFound = document.getElementById('noCityFound');
    let visibleCount = 0;

    // Hide 'Popular' section if user starts typing
    if(popularSection) {
        popularSection.style.display = (input.length > 0) ? 'none' : 'block';
    }

    // Filter the city list
    cityItems.forEach(item => {
        let cityName = item.innerText.toLowerCase();
        if (cityName.includes(input)) {
            item.style.display = "block";
            visibleCount++;
        } else {
            item.style.display = "none";
        }
    });

    // Show "Not found" message if no match
    if(noCityFound) {
        noCityFound.style.display = (visibleCount === 0 && input.length > 0) ? 'block' : 'none';
    }
}