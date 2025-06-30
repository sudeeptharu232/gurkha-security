// Mobile menu functionality
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const sidebar = document.getElementById("sidebar")
  const sidebarOverlay = document.getElementById("sidebar-overlay")
  const navLinks = document.querySelectorAll(".nav-link")

  // Toggle mobile menu
  function toggleMobileMenu() {
    sidebar.classList.toggle("open")
    sidebarOverlay.classList.toggle("active")

    // Update button icon
    const icon = mobileMenuBtn.querySelector("i")
    if (sidebar.classList.contains("open")) {
      icon.className = "fas fa-times"
    } else {
      icon.className = "fas fa-bars"
    }
  }

  // Close mobile menu
  function closeMobileMenu() {
    sidebar.classList.remove("open")
    sidebarOverlay.classList.remove("active")

    // Reset button icon
    const icon = mobileMenuBtn.querySelector("i")
    icon.className = "fas fa-bars"
  }

  // Event listeners
  mobileMenuBtn.addEventListener("click", toggleMobileMenu)
  sidebarOverlay.addEventListener("click", closeMobileMenu)

  // Close menu when clicking nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
  })

  // Handle active navigation states for single page
  if (window.location.pathname === "/" || window.location.pathname.includes("index.html")) {
    handleSinglePageNavigation()
  }

  // Contact form functionality
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm)
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})

// Single page navigation handling
function handleSinglePageNavigation() {
  const navLinks = document.querySelectorAll(".nav-link[data-section]")
  const sections = document.querySelectorAll("section[id]")

  // Update active nav link based on scroll position
  function updateActiveNavLink() {
    let current = ""
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("data-section") === current) {
        link.classList.add("active")
      }
    })
  }

  // Scroll event listener
  window.addEventListener("scroll", updateActiveNavLink)

  // Initial call
  updateActiveNavLink()
}

// Smooth scroll to section function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Contact form handler
function handleContactForm(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    service: formData.get("service"),
    message: formData.get("message"),
  }

  // Basic validation
  if (!data.name || !data.email || !data.message) {
    alert("Please fill in all required fields.")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    alert("Please enter a valid email address.")
    return
  }

  // Simulate form submission
  alert("Thank you for your inquiry! We will contact you within 24 hours.")

  // Reset form
  e.target.reset()
}

// Animation on scroll
function animateOnScroll() {
  const animatedElements = document.querySelectorAll(".animate-fade-in-up")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running"
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  animatedElements.forEach((element) => {
    observer.observe(element)
  })
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", animateOnScroll)

// Handle window resize
window.addEventListener("resize", () => {
  // Close mobile menu on desktop
  if (window.innerWidth >= 1024) {
    const sidebar = document.getElementById("sidebar")
    const sidebarOverlay = document.getElementById("sidebar-overlay")
    const mobileMenuBtn = document.getElementById("mobile-menu-btn")

    sidebar.classList.remove("open")
    sidebarOverlay.classList.remove("active")

    // Reset button icon
    const icon = mobileMenuBtn.querySelector("i")
    icon.className = "fas fa-bars"
  }
})

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Smooth scroll polyfill for older browsers
if (!("scrollBehavior" in document.documentElement.style)) {
  const script = document.createElement("script")
  script.src = "https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js"
  document.head.appendChild(script)
}
