VANTA.GLOBE({
  el: "#vanta-bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0x764ba2,
  backgroundColor: 0x111827,
  size: 1.0,
});
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll(".skill-bar");
      skillBars.forEach((bar) => {
        const width = bar.style.width;
        bar.style.width = "0%";
        setTimeout(() => {
          bar.style.width = width;
        }, 200);
      });
    }
  });
}, observerOptions);
const skillsSection = document.getElementById("skills");
if (skillsSection) {
  observer.observe(skillsSection);
}
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
feather.replace();
const projectCards = document.querySelectorAll(".project-card");
const projectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.1,
  }
);
projectCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(50px)";
  projectObserver.observe(card);
});
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector("svg.feather");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuIcon && mobileMenu) {
    menuIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle("hidden");
      menuIcon.classList.toggle("open");
    });
    document.addEventListener("click", (e) => {
      if (
        !mobileMenu.classList.contains("hidden") &&
        !mobileMenu.contains(e.target) &&
        !menuIcon.contains(e.target)
      ) {
        mobileMenu.classList.add("hidden");
        menuIcon.classList.remove("open");
      }
    });
  }
});

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    firstName: form.querySelector('input[placeholder="First Name"]').value,
    lastName: form.querySelector('input[placeholder="Last Name"]').value,
    email: form.querySelector('input[placeholder="Email Address"]').value,
    message: form.querySelector("textarea").value,
  };

  try {
    const res = await fetch("/.netlify/functions/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    alert(result.message);
    form.reset();
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Try again later.");
  }
});
