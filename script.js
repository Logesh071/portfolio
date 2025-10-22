      document.getElementById("year").textContent = new Date().getFullYear();

      // Navbar background on scroll (kept)
      const nav = document.getElementById("topNav");
      const navHeight = nav.offsetHeight;
      window.addEventListener("scroll", () => {
        if (window.scrollY > navHeight * 0.6) nav.classList.add("scrolled");
        else nav.classList.remove("scrolled");
      });

      // Smooth scrolling for internal links (kept)
      document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
          const target = document.querySelector(link.getAttribute("href"));
          if (target) {
            e.preventDefault();
            const top =
              target.getBoundingClientRect().top +
              window.scrollY -
              (nav.offsetHeight + 8);
            window.scrollTo({ top, behavior: "smooth" });
          }
        });
      });

      // ---- Contact form validation (kept) ----
      const form = document.getElementById("contactForm");
      const showError = (id, msg) =>
        (document.getElementById(id).textContent = msg);
      const clearErrors = () => {
        [
          "err-name",
          "err-email",
          "err-password",
          "err-gender",
          "form-success",
        ].forEach((id) => (document.getElementById(id).textContent = ""));
      };

      function validEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      }
      function validPassword(pw) {
        return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(pw);
      }

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        clearErrors();
        let ok = true;

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value;
        const gender = form.querySelector('input[name="gender"]:checked');

        if (name.length < 3) {
          showError(
            "err-name",
            "Please enter your full name (at least 3 characters)."
          );
          ok = false;
        }
        if (!validEmail(email)) {
          showError("err-email", "Please enter a valid email address.");
          ok = false;
        }
        if (!validPassword(password)) {
          showError(
            "err-password",
            "Password must be at least 8 characters and include at least one number and one letter."
          );
          ok = false;
        }
        if (!gender) {
          showError("err-gender", "Please select your gender.");
          ok = false;
        }

        if (!ok) {
          const firstErr = document.querySelector(".form-error:not(:empty)");
          if (firstErr) {
            const input = firstErr.previousElementSibling;
            if (input && input.focus) input.focus();
          }
          return;
        }

        const successEl = document.getElementById("form-success");
        successEl.textContent =
          "Thanks! Your message has been received. I will reply within 48 hours.";
        form.reset();
        successEl.style.opacity = 0;
        setTimeout(() => (successEl.style.opacity = 1), 50);
      });

      // live validation
      form.name.addEventListener("input", () => {
        document.getElementById("err-name").textContent = "";
      });
      form.email.addEventListener("input", () => {
        document.getElementById("err-email").textContent = "";
      });
      form.password.addEventListener("input", () => {
        document.getElementById("err-password").textContent = "";
      });
      form.querySelectorAll('input[name="gender"]').forEach((r) =>
        r.addEventListener("change", () => {
          document.getElementById("err-gender").textContent = "";
        })
      );

      // Tiny accessibility improvement: focus visible style for keyboard users
      document.addEventListener("keydown", (e) => {
        if (e.key === "Tab")
          document.documentElement.classList.add("user-is-tabbing");
      });

      // -------------------------
      // GSAP Animations
      // -------------------------
      gsap.registerPlugin(ScrollTrigger);

      // Hero timeline (title, lead, cta) — initial entry
      const heroTl = gsap.timeline();
      heroTl
        .from(".gs-hero-left .accent-dot", { opacity: 0, y: 8, duration: 0.5 })
        .from(
          ".gs-hero-title",
          { y: 28, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.35"
        )
        .from(
          ".gs-hero-lead",
          { y: 18, opacity: 0, duration: 0.6, ease: "power3.out" },
          "-=0.45"
        )
        .from(
          ".gs-hero-cta .btn",
          {
            y: 12,
            opacity: 0,
            stagger: 0.12,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.35"
        );

      // Hero right card subtle float animation
      gsap.to(".gs-hero-card", {
        y: -8,
        repeat: -2,
        yoyo: true,
        ease: "sine.inOut",
        duration: 1.8,
        delay: 0.1,
      });

      // Parallax effect for hero image when scroll (tiny)
      gsap.to(".gs-hero-card", {
        y: (i, target) => -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // Services: stagger reveal on scroll
      gsap.from(".gs-service", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gs-services-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Portfolio items: scale/fade in stagger on scroll
      gsap.from(".gs-portfolio-grid .portfolio-item", {
        scale: 0.96,
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gs-portfolio-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Micro-interaction: subtle lift on focus + hover (using GSAP for keyboard and programmatic)
      document.querySelectorAll(".portfolio-item").forEach((item) => {
        item.addEventListener("mouseenter", () =>
          gsap.to(item, {
            y: -6,
            boxShadow: "0 12px 28px rgba(11,83,221,0.08)",
            duration: 0.28,
          })
        );
        item.addEventListener("mouseleave", () =>
          gsap.to(item, {
            y: 0,
            boxShadow: "0 6px 20px rgba(12,24,48,0.06)",
            duration: 0.28,
          })
        );
        item.addEventListener("focus", () =>
          gsap.to(item, {
            y: -6,
            boxShadow: "0 12px 28px rgba(11,83,221,0.08)",
            duration: 0.28,
          })
        );
        item.addEventListener("blur", () =>
          gsap.to(item, {
            y: 0,
            boxShadow: "0 6px 20px rgba(12,24,48,0.06)",
            duration: 0.28,
          })
        );
      });

      // Progress bars animate to percentage when About in view
      document.querySelectorAll(".progress").forEach((bar) => {
        const pct = bar.dataset.progress || 0;
        gsap.to(bar.querySelector(".progress-bar"), {
          width: pct + "%",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      });

      // Contact card entrance
      gsap.from(".gs-contact-right .card", {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gs-contact-right",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Portfolio modal animation on open
      const modalEl = document.getElementById("portfolioModal");
      const bsModal = new bootstrap.Modal(modalEl);
      document.querySelectorAll(".portfolio-item").forEach((item) => {
        item.addEventListener("click", () => {
          const img = item.dataset.img;
          const title = item.dataset.title;
          const desc = item.dataset.desc;
          document.getElementById("portfolioModalImg").src = img;
          document.getElementById("portfolioModalTitle").textContent = title;
          document.getElementById("portfolioModalDesc").textContent = desc;
          bsModal.show();
        });
        item.addEventListener("keyup", (e) => {
          if (e.key === "Enter") item.click();
        });
      });

      // Animate modal content each time it appears
      modalEl.addEventListener("shown.bs.modal", () => {
        gsap.from("#portfolioModalImg", {
          scale: 1.06,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        });
        gsap.from("#portfolioModalTitle", {
          y: 12,
          opacity: 0,
          duration: 0.45,
          delay: 0.08,
        });
        gsap.from("#portfolioModalDesc", {
          y: 8,
          opacity: 0,
          duration: 0.45,
          delay: 0.15,
        });
      });

      // OPTIONAL: if you want a "reveal" fallback for elements with class .reveal, mark them visible when in view
      // (keeps compatibility with CSS reveal classes you used earlier)
      gsap.utils.toArray(".reveal").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          onEnter: () => el.classList.add("visible"),
          once: true,
        });
      });

      // Accessibility: reduce motion respects user preference (stop/limit animations)
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );
      if (reduceMotion.matches) {
        gsap.globalTimeline.timeScale(0.001); // effectively freeze most animations while keeping layout stable
        // restore some simple CSS-based motions if desired by adjusting code above
      }
