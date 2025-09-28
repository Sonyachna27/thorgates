document.addEventListener("DOMContentLoaded", function () {
  toggleMenu();
  succesfulForm();
	handlePopup();
	accordionFunction();
	addAnimationInit();	
  loadMoreCases();
	openMenu();
	reviewsSliderInit();
	newsSliderInit();
	checkInput();
	completeSliderInit();
	galleryTabs();
});



const toggleMenu = () => {
  const htmlElement = document.querySelector("html");
  const burgerMenus = document.querySelectorAll(".burger");
  if (!burgerMenus.length) return;

  const navLinks = document.querySelectorAll("nav a");

  burgerMenus.forEach((burgerMenu) => {
    burgerMenu.addEventListener("click", (event) => {
      event.stopPropagation();
      htmlElement.classList.toggle("open");
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      htmlElement.classList.remove("open");
    });
  });
};
const openMenu = () => {
  const windowWidth = window.innerWidth;
  const menuLinks = document.querySelectorAll('header li:has(.sub-menu)');

  if (windowWidth <= 1239.9) {
    menuLinks.forEach((link) => {
      const subMenu = link.querySelector('.sub-menu');
      if (!link.dataset.listener) {
        link.addEventListener("click", (event) => {
          event.stopPropagation();
          link.classList.toggle("active");
        });
        link.dataset.listener = "true"; 
      }
    });
  } else {
    menuLinks.forEach((link) => link.classList.remove("active"));
  }
};

const handlePopup = () => {
  const openPopup = () => {
    document.querySelectorAll('[data-open]').forEach(element => {
      element.addEventListener('click', () => {
				document.documentElement.classList.add('open-popup');
        const popupName = element.getAttribute('data-open'); 
        const popupTarget = document.querySelector(`[data-popup="${popupName}"]`); 

        if (popupTarget) {
          document.documentElement.classList.add('open-popup');
          popupTarget.classList.add('open-popup'); 
        }
      });
    });
  };

  const closePopup = () => {
    document.querySelectorAll('[data-close]').forEach(element => {
      element.addEventListener('click', () => {
        const popup = element.closest('.popup'); 

        if (popup) {
          popup.classList.remove('open-popup'); 
        }

        if (!document.querySelector('.popup.open-popup')) {
          document.documentElement.classList.remove('open-popup');
        }
      });
    });
  };

  openPopup();
  closePopup();
};
const accordionFunction = () => {
  const accordionItems = document.querySelectorAll(".accord-item");
  accordionItems.forEach((item) => {
		const top = item.querySelector(".accord-item-top");
		if(top){
			top.addEventListener("click", function () {
				item.classList.toggle("active");
			});
		}
  });
};
const addAnimationInit = () => {

	const scrollers = document.querySelectorAll('.marquee');
	if(!window.matchMedia("(prefers-reduced-motion:reduce)").matches){
		addAnimation();
	}
	function addAnimation(){
		scrollers.forEach((scroller) =>{
			scroller.setAttribute("data-animate", true);
			const scrollerInner = scroller.querySelector('.marquee__wrap');
			const scrollerContent = Array.from(scrollerInner.children);
			scrollerContent.forEach(item =>{
				const duplicatedItem = item.cloneNode(true);
				duplicatedItem.setAttribute('aria-hidden', true);
				scrollerInner.appendChild(duplicatedItem);
			});			
		});
	}
}

const reviewsSliderInit = () => {
  const reviewsSliderWrap = document.querySelector('.reviewsSlider');
  if (!reviewsSliderWrap) return;

  if (reviewsSliderWrap.classList.contains('without')) {
   
    reviewsSliderWrap.classList.remove('swiper');
    reviewsSliderWrap.querySelector('.swiper-wrapper')?.classList.remove('swiper-wrapper');
    reviewsSliderWrap.querySelectorAll('.swiper-slide').forEach(slide => {
      slide.classList.remove('swiper-slide');
    });
    document.querySelector('.reviews-button-next')?.remove();
    document.querySelector('.reviews-button-prev')?.remove();
    document.querySelector('.reviews-pagination')?.remove();
    return; 
  }

  const reviewsSlider = new Swiper('.reviewsSlider', {
    spaceBetween: 10,
    navigation: {
      nextEl: ".reviews-button-next",
      prevEl: ".reviews-button-prev",
    },
    pagination: {
      el: '.reviews-pagination',
    },
    breakpoints: {
      0: {
        slidesPerView: 1.15,
        centeredSlides: true,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        centeredSlides: false,
        spaceBetween: 20,
      },
      1240: {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 15,
      }
    }
  });
};
const newsSliderInit = () =>{
	const newsSliderWrap = document.querySelector('.newsSlider');
	if(!newsSliderWrap) return;
		
	const newsSlider = new Swiper('.newsSlider', {
  slidesPerView: 1,
  spaceBetween: 10,
  navigation: {
    nextEl: ".news-button-next",
    prevEl: ".news-button-prev",
  },
   pagination: {
    el: '.news-pagination',
  },
  breakpoints: {
    0: {
      slidesPerView: 1.15,
      centeredSlides: true,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      centeredSlides: false,
      spaceBetween: 20,
    },
    1240: {
      slidesPerView: 3,
      centeredSlides: false,
      spaceBetween: 15,
    }
	},
	centeredSlides: true,
  slidesPerView: 'auto',
});

}
const completeSliderInit = () =>{
	const completeSliderWrap = document.querySelector('.completeSlider');
	if(!completeSliderWrap) return;
		
	const completeSlider = new Swiper('.completeSlider', {
  slidesPerView: 1,
  spaceBetween: 10,
  navigation: {
    nextEl: ".complete-button-next",
    prevEl: ".complete-button-prev",
  },
   pagination: {
    el: '.complete-pagination',
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1240: {
      slidesPerView: 3,
      spaceBetween: 15,
    }
	},
});

}

const succesfulForm = () => {
  document.addEventListener('wpcf7mailsent', function(event) {
    document.documentElement.classList.add('open-popup sent');
  }, false);

  document.addEventListener('wpcf7invalid', function(event) {
    const invalidTip = document.querySelector('.wpcf7-not-valid-tip');
    if (invalidTip) {
      const input = invalidTip.closest('.wpcf7-form-control-wrap').querySelector('input, textarea');
      if (input) input.focus();
    }
  }, false);
};
const checkInput = () =>{
	const formGroups = document.querySelectorAll(".form-group");

  formGroups.forEach(group => {
    const input = group.querySelector("input, textarea, select");

    if (!input) return;

    input.addEventListener("input", () => {
      if (input.checkValidity()) {
        group.classList.add("valid");
        group.classList.remove("invalid");
      } 
      else {
        group.classList.add("invalid");
        group.classList.remove("valid");
      }
    });

    input.addEventListener("blur", () => {
      if (!input.checkValidity()) {
        group.classList.add("invalid");
        group.classList.remove("valid");
      }
    });
  });
}
const scrollBottom = () => {
  document.querySelectorAll('.scroll_bottom').forEach(btn =>
  btn.addEventListener('click', () =>
    window.scrollBy({ top: window.innerHeight * .9 , behavior: 'smooth' })
  )
);
}

const loadMoreCases = () => {
  const tabs = document.querySelectorAll(".projects__list__item");
  const casesContainer = document.getElementById("cases-container");
  const loadMoreBtn = document.getElementById("load-more-cases");

  let currentService = "all";
  let offset = 5;

  const fetchCases = (service = "all", append = false, customOffset = 0) => {
    const formData = new FormData();
    formData.append("action", "load_cases_by_service");
    formData.append("service", service);
    formData.append("offset", customOffset);

    fetch(script_js.ajax_url, {
      method: "POST",
      body: formData,
    })
      .then(res => res.text())
      .then(data => {
        const match = data.match(/<!--total_cases:(\d+)-->/);
        totalCases = match ? parseInt(match[1]) : 0;

        const cleanHTML = data.replace(/<!--total_cases:\d+-->/, '');

        if (append) {
          casesContainer.insertAdjacentHTML("beforeend", data);
        } else {
          casesContainer.innerHTML = data;
        }
        
        offset = customOffset + 5;

        if (loadMoreBtn) {
          if (offset >= totalCases) {
            loadMoreBtn.style.display = "none";
          } else {
            loadMoreBtn.style.display = "flex";
          }

          loadMoreBtn.dataset.offset = offset;
        }
      });
  };

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      currentService = tab.dataset.service;
      offset = 5;

      fetchCases(currentService, false, 0);
      if (loadMoreBtn) {
        loadMoreBtn.dataset.offset = offset;
      }
    });
  });

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      fetchCases(currentService, true, offset);
      offset += 5;
      loadMoreBtn.dataset.offset = offset;
    });
  }
}
const galleryTabs = () => {
  const galleryNameImg = document.querySelectorAll(".gallery__content .projects__item");
  const galleryTabsBtn = document.querySelectorAll(".gallery__tab");

  if (galleryTabsBtn.length) {
    function showImage(imageSlug) {
      galleryNameImg.forEach((image) => {
        let imageDataSlug = image.dataset.slug;
        if (imageSlug === "all") {
          image.classList.remove("hidden");
        } else {
          if (imageDataSlug === imageSlug) {
            image.classList.remove("hidden");
          } else {
            image.classList.add("hidden");
          }
        }
      });
    }

    function activeTabs() {
      galleryTabsBtn.forEach((tab) => {
        let tabsSlug = tab.dataset.slug;

        tab.addEventListener("click", () => {
          galleryTabsBtn.forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");

          showImage(tabsSlug);
        });
      });
    }

    activeTabs();

    showImage("all");
  }
};


window.addEventListener("resize", openMenu);