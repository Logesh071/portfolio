

// GSAP Animations

// 1. Fade-in & slide avatar and profile info
gsap.from(".profile-card img, .profile-card > div", {
  duration: 1,
  y: 30,
  opacity: 0,
  stagger: 0.2,
  ease: "power3.out",
});

// 2. Stats counter animation
function animateCounters() {
  const counters = document.querySelectorAll(".num");
  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    gsap.to(counter, {
      innerText: target,
      duration: 2,
      ease: "power1.out",
      snap: { innerText: 1 }, // Round numbers
      onUpdate: function () {
        counter.innerText = Math.floor(counter.innerText);
      },
    });
  });
}

// Trigger counter animation once profile is in view
const statsSection = document.querySelector(".grid.md\\:grid-cols-3");
let statsAnimated = false;

window.addEventListener("scroll", () => {
  const rect = statsSection.getBoundingClientRect();
  if (!statsAnimated && rect.top < window.innerHeight) {
    animateCounters();
    statsAnimated = true;
  }
});

// 3. Posts fade-in on scroll
gsap.utils.toArray(".posts .bg-gray-800").forEach((post, i) => {
  gsap.from(post, {
    scrollTrigger: {
      trigger: post,
      start: "top 90%",
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    delay: i * 0.2,
    ease: "power3.out",
  });
});

      // GSAP entrance animations
      gsap.from("#avatar", {
        duration: 0.9,
        scale: 0,
        opacity: 0,
        ease: "back.out(1.7)",
      });
      gsap.from("#name", { duration: 0.9, y: 12, opacity: 0, delay: 0.12 });
      gsap.from(".profile-card", {
        duration: 0.9,
        y: 18,
        opacity: 0,
        stagger: 0.06,
        delay: 0.08,
      });

      // Stats counter animation
      document.querySelectorAll(".num").forEach((el) => {
        const target = +el.getAttribute("data-target") || 0;
        gsap.to(
          { val: 0 },
          {
            val: target,
            duration: 1.6,
            delay: 0.6,
            ease: "power1.out",
            onUpdate() {
              el.textContent = Math.floor(
                this.targets()[0].val
              ).toLocaleString();
            },
          }
        );
      });

      // Follow button micro-interaction
      const followBtn = document.getElementById("follow");
      let following = false;
      followBtn.addEventListener("click", () => {
        following = !following;
        followBtn.disabled = true;
        gsap.to(followBtn, {
          scale: 0.92,
          duration: 0.08,
          yoyo: true,
          repeat: 1,
        });
        setTimeout(() => {
          followBtn.textContent = following ? "Following" : "Follow";
          followBtn.classList.toggle("btn-primary", following);
          followBtn.classList.toggle("btn-outline-light", !following);
          followBtn.disabled = false;
        }, 240);
      });

      // Hover subtle lift on cards using GSAP (delegated)
      document.querySelectorAll(".posts .card").forEach((card) => {
        card.addEventListener("mouseenter", () =>
          gsap.to(card, {
            y: -6,
            boxShadow: "0 18px 40px rgba(0,0,0,0.6)",
            duration: 0.25,
          })
        );
        card.addEventListener("mouseleave", () =>
          gsap.to(card, {
            y: 0,
            boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
            duration: 0.25,
          })
        );
      });