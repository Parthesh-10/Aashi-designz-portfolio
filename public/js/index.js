const navBar = document.querySelector(".navbar");
const header = document.querySelector(".header");
const imgContainer = document.querySelector(".profileImgContainer");

let navPos = window.scrollY;

const headerTop = header
  ? header.getBoundingClientRect().top + window.scrollY
  : null;
const headerHeight = header ? header.offsetHeight : null;

let windowSize = window.innerWidth;
window.addEventListener("scroll", () => {
  //home banner Img scale

  if (header && imgContainer) {
    const start = headerTop + headerHeight * 0.2;
    const end = headerTop + window.innerHeight;

    const progress = Math.min(
      Math.max((window.scrollY - start) / (end - start), 0),
      1,
    );

    const scale = 1 + 0.5 * progress;
    imgContainer.style.setProperty("--scale", scale);
  }
});

// Global navigation menu is managed reliably by Header.jsx (React state)
// Global custom cursor is managed reliably by CustomCursor.jsx

//slider js
const sliderContainer = document.querySelector(".swiperContainer");
if (sliderContainer) {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 3,
    centeredSlides: true,
    centeredSlidesBounds: true,

    // Optional parameters
    direction: "horizontal",
    loop: true,
    // spaceBetween: 10,
    loopFillGroupBlank: false,
    autoplay: {
      delay: 2000,
      pauseOnMouseEnter: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: ".next-btn",
      prevEl: ".previous-btn",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
        autoplay: {
          delay: 5000,
          disableOnInteraction: true,
        },
      },
      // when width is >= 640px (small tablets)
      640: {
        slidesPerView: 2,
        spaceBetween: 12,
      },
      // when width is >= 1024px (desktop)
      1024: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
    },
  });
}

// accordian
const accordianTab = document.querySelectorAll(".tab");
const accordianBody = document.querySelectorAll(".answer");
accordianTab.forEach((tab) => {
  tab.addEventListener("click", () => {
    const activeTab = tab.querySelector(".answer");
    activeTab.classList.toggle("show");

    tab.querySelector(".cross").classList.toggle("rotate");
    accordianBody.forEach((answer) => {
      if (answer !== activeTab) {
        answer.classList.remove("show");
        let parent = answer.parentElement;
        parent.querySelector(".cross").classList.remove("rotate");
      }
    });
  });
});

const readMoreBtn = document.querySelector(".readMoreBtn");

if (readMoreBtn) {
  readMoreBtn.addEventListener("click", () => {
    const dots = document.getElementById("dots");
    const moreText = document.getElementById("more");
    const btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.height = "0";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.height = "100%";
    }
  });
}

//animate element On screen

const tabFeature = document.querySelector(".tabFeature");

const dotDesign = (element) => {
  const dotDesignObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const purpleDiv = document.querySelectorAll(".purpleDiv");
        purpleDiv.forEach((div, index) => {
          setTimeout(() => {
            div.classList.add("onScreen");
          }, 300 * index);
        });
      }
    });
  });

  if (element) {
    dotDesignObserver.observe(element);
  }
};
dotDesign(tabFeature);

const elementVisible = (element) => {
  const borderObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 1,
    },
  );
  borderObserver.observe(element);
};

const underlineElement = document.querySelectorAll(".borderAnimate");
underlineElement.forEach((underLine) => {
  elementVisible(underLine);
});



const spinner = document.querySelector(".spinner");
const popup = document.querySelector(".popup");
const submitHandler = (form) => {
  const btn = form.querySelector(".formSubmit");
  btn.disabled = true;
  btn.innerText = "Sending...";
  spinner.classList.add("active");
};
if (popup) {
  popup.classList.add("active");
  setTimeout(() => {
    popup.classList.remove("active");
  }, 3000);
}


