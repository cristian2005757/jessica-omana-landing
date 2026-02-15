(function () {
    // Burger menu
    const burger = document.querySelector("[data-burger]");
    const mobile = document.querySelector("[data-mobile]");
  
    function closeMobile() {
      if (mobile) {
        mobile.style.display = "none";
        if (burger) burger.setAttribute("aria-expanded", "false");
      }
    }
  
    function openMobile() {
      if (mobile) {
        mobile.style.display = "block";
        if (burger) burger.setAttribute("aria-expanded", "true");
      }
    }
  
    function toggleMobile() {
      const isOpen = mobile && mobile.style.display === "block";
      if (isOpen) closeMobile();
      else openMobile();
    }
  
    if (burger && mobile) {
      burger.addEventListener("click", toggleMobile);
    }
  
    // Cerrar menú móvil al hacer clic en un link de navegación
    document.querySelectorAll(".mobile__inner a[href^='#']").forEach((link) => {
      link.addEventListener("click", closeMobile);
    });
  
    // Modal
    const openButtons = document.querySelectorAll("[data-open-modal]");
    const closeButtons = document.querySelectorAll("[data-close-modal]");
    let lastFocusedBeforeModal = null;
    let escHandler = null;
  
    function openModal(name, openerEl) {
      const modal = document.querySelector(`[data-modal="${name}"]`);
      if (!modal) return;
      lastFocusedBeforeModal = openerEl || document.activeElement;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      const closeBtn = modal.querySelector("button[data-close-modal]");
      if (closeBtn) closeBtn.focus();
      escHandler = (e) => {
        if (e.key === "Escape") removeModalAndCleanup(name);
      };
      document.addEventListener("keydown", escHandler);
    }
  
    function removeModalAndCleanup(name) {
      const modal = document.querySelector(`[data-modal="${name}"]`);
      if (!modal) return;
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (escHandler) {
        document.removeEventListener("keydown", escHandler);
        escHandler = null;
      }
      if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === "function") {
        lastFocusedBeforeModal.focus();
      }
    }
  
    function closeModal(name) {
      removeModalAndCleanup(name);
    }
  
    openButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        openModal(btn.dataset.openModal, e.currentTarget);
      });
    });
  
    closeButtons.forEach((btn) => {
      btn.addEventListener("click", () => closeModal(btn.dataset.closeModal));
    });
  
    // Demo pay
    const demoPay = document.getElementById("btn-demo-pay");
    if (demoPay) {
      demoPay.addEventListener("click", () => {
        alert("Demo: aquí iría el checkout real (Hotmart / link).");
      });
    }

    // Nav activo según sección visible (IntersectionObserver)
    const sectionIds = ["plan", "beneficios", "incluye", "testimonios", "faq"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const allNavLinks = document.querySelectorAll('.nav a[href^="#"], .mobile__inner a[href^="#"]');

    function setActiveLink(activeId) {
      allNavLinks.forEach((link) => {
        const href = link.getAttribute("href") || "";
        const linkId = href.slice(1);
        link.classList.toggle("active", activeId && linkId === activeId);
      });
    }

    function updateActiveSection() {
      const offset = 150;
      let activeSection = null;
      let bestTop = -Infinity;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom > 0) {
          if (rect.top > bestTop) {
            bestTop = rect.top;
            activeSection = section;
          }
        }
      });
      setActiveLink(activeSection ? activeSection.id : "");
    }

    const observer = new IntersectionObserver(
      () => requestAnimationFrame(updateActiveSection),
      { rootMargin: "-100px 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    updateActiveSection();

    // Reveal: animación al entrar en viewport
    const revealEls = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.05 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  })();
  