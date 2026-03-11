// -----------------------------
// Mobile Menu
// -----------------------------
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });
}

// -----------------------------
// Theme Toggle
// -----------------------------
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
  });
}

// -----------------------------
// GSAP Animations
// -----------------------------
if (typeof gsap !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".reveal-up").forEach((el, i) => {
    gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: i * 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
        },
      }
    );
  });

  gsap.utils.toArray(".reveal-left").forEach((el) => {
    gsap.fromTo(
      el,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      }
    );
  });

  gsap.utils.toArray(".reveal-right").forEach((el) => {
    gsap.fromTo(
      el,
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      }
    );
  });

  gsap.utils.toArray(".reveal-scale").forEach((el) => {
    gsap.fromTo(
      el,
      { scale: 0.92, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
      }
    );
  });

  gsap.to(".chip-1", {
    y: -12,
    duration: 2.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".chip-2", {
    y: 10,
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".chip-3", {
    y: -8,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".chip-4", {
    y: 12,
    duration: 2.1,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".node-card-left", {
    y: -12,
    duration: 2.6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".node-card-right", {
    y: 10,
    duration: 2.4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

// -----------------------------
// Canvas Network Animation
// Inspired by modern node-flow visuals
// -----------------------------
const canvas = document.getElementById("networkCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");
  let width;
  let height;
  let particles = [];
  const particleCount = 68;
  const mouse = { x: null, y: null, radius: 130 };

  function resizeCanvas() {
    const parent = canvas.parentElement;
    width = parent.clientWidth;
    height = parent.clientHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    createParticles();
  }

  class Particle {
    constructor() {
      this.reset();
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.size = Math.random() * 2.2 + 1.2;
      this.color = this.getColor();
    }

    getColor() {
      const palette = [
        "rgba(109, 93, 252, 0.9)",
        "rgba(23, 195, 143, 0.9)",
        "rgba(0, 208, 255, 0.9)",
        "rgba(255, 77, 184, 0.9)",
        "rgba(255,255,255,0.75)"
      ];
      return palette[Math.floor(Math.random() * palette.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += Math.cos(angle) * force * 1.6;
          this.y += Math.sin(angle) * force * 1.6;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const opacity = 1 - distance / 120;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(160, 190, 255, ${opacity * 0.18})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // central connection glow
    const centerX = width / 2;
    const centerY = height / 2;
    particles.forEach((p) => {
      const dx = p.x - centerX;
      const dy = p.y - centerY;
      const d = Math.sqrt(dx * dx + dy * dy);

      if (d < 170) {
        const opacity = 1 - d / 170;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(centerX, centerY);
        ctx.strokeStyle = `rgba(109, 93, 252, ${opacity * 0.18})`;
        ctx.stroke();
      }
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    drawConnections();

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animate);
  }

  window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener("resize", resizeCanvas);

  resizeCanvas();
  animate();
}