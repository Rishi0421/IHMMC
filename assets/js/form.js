
(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

// Counter Section

// jQuery(document).ready(function($){
//   $('.counter').counterUp({
//     delay: 10,
//     time: 1000
// });
// });
// tilt

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

})();





/*===== FOCUS =====*/
const inputs = document.querySelectorAll(".form__input")

/*=== Add focus ===*/
function addfocus(){
  let parent = this.parentNode.parentNode
  parent.classList.add("focus")
}

/*=== Remove focus ===*/
function remfocus(){
  let parent = this.parentNode.parentNode
  if(this.value == ""){
      parent.classList.remove("focus")
  }
}

/*=== To call function===*/
inputs.forEach(input=>{
  input.addEventListener("focus",addfocus)
  input.addEventListener("blur",remfocus)
})

function updateTeamFields() {
  const numberOfMembers = document.getElementById('team-members').value;
  const teamMemberDetails = document.getElementById('team-member-details');
  teamMemberDetails.innerHTML = '';

  if (numberOfMembers) {
    for (let i = 0; i < numberOfMembers; i++) {
      teamMemberDetails.innerHTML += `
        <label for="member${i}-name">Member ${i + 1} Name:</label>
        <input type="text" id="member${i}-name" name="team_members[${i}][name]" required>

        <label for="member${i}-email">Member ${i + 1} Email:</label>
        <input type="email" id="member${i}-email" name="team_members[${i}][email]" required>
      `;
    }
  }
}

document.getElementById('payment-method').addEventListener('change', function() {
  const upiDetails = document.getElementById('upi-details');
  const paymentReferenceLabel = document.getElementById('payment-reference-label');
  const paymentReferenceInput = document.getElementById('payment-reference');

  if (this.value === 'upi') {
      upiDetails.style.display = 'block';
      paymentReferenceLabel.style.display = 'block';
      paymentReferenceInput.style.display = 'block';
  } else if (this.value === 'bank_transfer') {
      upiDetails.style.display = 'none';
      paymentReferenceLabel.style.display = 'block';
      paymentReferenceInput.style.display = 'block';
  } else {
      upiDetails.style.display = 'none';
      paymentReferenceLabel.style.display = 'none';
      paymentReferenceInput.style.display = 'none';
  }
});

const scriptURL = 'https://script.google.com/macros/s/AKfycby5L8uKSC6llNDa6LSH4Uj3vc3eKZs-5qDwsE63r3si7dsN5M26fx25FutBFCQV9yfW/exec'; // Add your Web App URL here google sheet
const form = document.forms['google-sheet'];

form.addEventListener('submit', async e => {
e.preventDefault();

const formData = new FormData(form);
const data = {};

formData.forEach((value, key) => {
  if (key.startsWith('team_members')) {
    const match = key.match(/team_members\[(\d+)\]\[(\w+)\]/);
    if (match) {
      const index = match[1];
      const field = match[2];
      if (!data.team_members) {
        data.team_members = [];
      }
      if (!data.team_members[index]) {
        data.team_members[index] = {};
      }
      data.team_members[index][field] = value;
    }
  } else {
    data[key] = value;
  }
});


data.team_members = JSON.stringify(data.team_members);
data.number_of_team_members = JSON.parse(data.team_members).length;
// Fetch the IP address
const ipResponse = await fetch('https://api.ipify.org?format=json');
const ipData = await ipResponse.json();
data.ip_address = ipData.ip;

fetch(scriptURL, {
  method: 'POST',
  body: new URLSearchParams(data),
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
.then(response => response.json())
.then(response => alert("Thanks for Contacting us..! We Will Contact You Soon..."))
.catch(error => console.error('Error!', error.message));
});