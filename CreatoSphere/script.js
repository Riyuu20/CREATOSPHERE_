// DOM Elements
const searchInput = document.querySelector(".search-input")
const languageCards = document.querySelectorAll(".language-card")
const courseCards = document.querySelectorAll(".course-card")
const playButtons = document.querySelectorAll(".play-btn, .play-overlay")
const profileMenu = document.querySelector(".profile-menu")
const navLinks = document.querySelectorAll(".nav-link")

// Global Variables
const currentUser = {
  name: "Alex Johnson",
  email: "alex@creatosphere.com",
  avatar: "https://via.placeholder.com/120",
  streak: 15,
  totalHours: 156,
  completedCourses: 47,
  badges: 23,
  friends: 89,
}

const notifications = [
  { id: 1, type: "badge", message: "You earned a new badge: JavaScript Master!", time: "2 hours ago" },
  { id: 2, type: "reminder", message: "Time for your React lesson!", time: "30 minutes ago" },
  { id: 3, type: "friend", message: "Sarah completed Python Basics", time: "1 hour ago" },
]

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function (...args) {
    
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
  setupEventListeners()
  startAnimations()
  updateDateTime()
  loadUserData()
  initializeTheme()
  optimizePerformance()
})

// Initialize Application
function initializeApp() {
  console.log("🚀 CreatoSphere Learning Platform Initialized")

  // Set current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const dateElements = document.querySelectorAll("#current-date, #currentDate")
  dateElements.forEach((element) => {
    if (element) element.textContent = currentDate
  })

  // Initialize counters
  animateCounters()

  // Setup robot speech
  setupRobotSpeech()

  // Load notifications
  updateNotificationCount()
}

// Initialize animations
function startAnimations() {
  // Typing animation for hero title
  const typingText = document.querySelector(".typing-text")
  if (typingText) {
    const text = typingText.textContent
    typingText.textContent = ""

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        typingText.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }

    setTimeout(typeWriter, 1000)
  }

  // Particle animation
  createParticleAnimation()
}

// Create Particle Animation
function createParticleAnimation() {
  const particleContainer = document.querySelector(".animated-particles")
  if (!particleContainer) return

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div")
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: var(--primary-color);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat ${5 + Math.random() * 10}s linear infinite;
      opacity: ${0.3 + Math.random() * 0.7};
    `
    particleContainer.appendChild(particle)
  }
}

// Add particle animation CSS
const particleStyle = document.createElement("style")
particleStyle.textContent = `
  @keyframes particleFloat {
    0% {
      transform: translateY(100vh) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
`
document.head.appendChild(particleStyle)

// Setup event listeners
function setupEventListeners() {
  // Navigation
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavigation)
  })

  // Search functionality
  const searchInput = document.querySelector(".search-input")
  if (searchInput) {
    searchInput.addEventListener("input", debounce(handleSearch, 300))
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSearchSubmit()
      }
    })
  }

  // Buttons
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary")
  buttons.forEach((button) => {
    button.addEventListener("click", handleButtonClick)
  })

  // FAB
  const fabMain = document.querySelector(".fab-main")
  if (fabMain) {
    fabMain.addEventListener("click", toggleFAB)
  }

  const fabOptions = document.querySelectorAll(".fab-option")
  fabOptions.forEach((option) => {
    option.addEventListener("click", handleFABAction)
  })

  // Feature cards
  const featureCards = document.querySelectorAll(".feature-card")
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", handleFeatureHover)
    card.addEventListener("mouseleave", handleFeatureLeave)
  })

  // Dashboard items
  const dashboardItems = document.querySelectorAll(".dashboard-item")
  dashboardItems.forEach((item) => {
    item.addEventListener("click", handleDashboardItemClick)
  })

  // Video player
  const playOverlays = document.querySelectorAll(".play-overlay")
  playOverlays.forEach((overlay) => {
    overlay.addEventListener("click", handleVideoPlay)
  })

  // Keyboard shortcuts
  document.addEventListener("keydown", handleKeyboardShortcuts)

  // Scroll effects
  setupScrollEffects()
}

// Handle Navigation
function handleNavigation(e) {
  e.preventDefault()
  const href = e.currentTarget.getAttribute("href")

  // Remove active class from all nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
  })

  // Add active class to clicked link
  e.currentTarget.classList.add("active")

  // Navigate to page
  if (href && href !== "#") {
    window.location.href = href
  }

  // Add click animation
  e.currentTarget.style.transform = "scale(0.95)"
  setTimeout(() => {
    e.currentTarget.style.transform = ""
  }, 150)
}

// Handle Search
function handleSearch(e) {
  const query = e.target.value.toLowerCase()
  console.log("Searching for:", query)

  // Add search animation
  const searchIcon = document.querySelector(".search-icon")
  if (searchIcon) {
    searchIcon.style.color = "var(--primary-color)"
    searchIcon.classList.add("fa-spin")

    setTimeout(() => {
      searchIcon.style.color = ""
      searchIcon.classList.remove("fa-spin")
    }, 1000)
  }

  // Simulate search results
  if (query.length > 2) {
    showSearchSuggestions(query)
  } else {
    hideSearchSuggestions()
  }
}

function handleSearchSubmit() {
  const searchInput = document.querySelector(".search-input")
  const query = searchInput.value.trim()

  if (query) {
    console.log("Search submitted:", query)
    // Redirect to explore page with search query
    window.location.href = `explore.html?search=${encodeURIComponent(query)}`
  }
}

function showSearchSuggestions(query) {
  // Create suggestions dropdown
  let suggestionsContainer = document.querySelector(".search-suggestions")

  if (!suggestionsContainer) {
    suggestionsContainer = document.createElement("div")
    suggestionsContainer.className = "search-suggestions"
    suggestionsContainer.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--bg-card);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      margin-top: 5px;
      max-height: 300px;
      overflow-y: auto;
      z-index: 1001;
    `
    document.querySelector(".search-container").appendChild(suggestionsContainer)
  }

  // Sample suggestions
  const suggestions = [
    "JavaScript Fundamentals",
    "React Hooks Tutorial",
    "Node.js Backend Development",
    "Python Data Science",
    "CSS Grid Layout",
    "MongoDB Database",
  ].filter((item) => item.toLowerCase().includes(query))

  suggestionsContainer.innerHTML = suggestions
    .map(
      (suggestion) => `
    <div class="search-suggestion" style="
      padding: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      border-bottom: 1px solid var(--border-color);
    " onmouseover="this.style.background='rgba(0,212,255,0.1)'" 
       onmouseout="this.style.background='transparent'"
       onclick="selectSuggestion('${suggestion}')">
      <i class="fas fa-search" style="color: var(--primary-color); margin-right: 0.5rem;"></i>
      ${suggestion}
    </div>
  `,
    )
    .join("")
}

function hideSearchSuggestions() {
  const suggestionsContainer = document.querySelector(".search-suggestions")
  if (suggestionsContainer) {
    suggestionsContainer.remove()
  }
}

function selectSuggestion(suggestion) {
  const searchInput = document.querySelector(".search-input")
  searchInput.value = suggestion
  hideSearchSuggestions()
  handleSearchSubmit()
}

// Language card interactions
function handleLanguageCardClick(e) {
  const card = e.currentTarget
  const language = card.dataset.lang

  // Add click animation
  card.style.transform = "scale(0.95)"
  setTimeout(() => {
    card.style.transform = "translateY(-10px) scale(1)"
  }, 150)

  // Simulate navigation to language-specific content
  console.log(`Navigating to ${language} courses`)

  // You can add actual navigation logic here
  // window.location.href = `courses.html?lang=${language}`;
}

function handleLanguageCardHover(e) {
  const card = e.currentTarget
  const progressBar = card.querySelector(".progress")

  // Animate progress bar on hover
  if (progressBar) {
    const currentWidth = progressBar.style.width
    progressBar.style.width = "100%"
    progressBar.style.background = "linear-gradient(135deg, #ff0080, #00d4ff)"

    setTimeout(() => {
      progressBar.style.width = currentWidth
      progressBar.style.background = "linear-gradient(135deg, #00d4ff, #0099cc)"
    }, 300)
  }
}

function handleLanguageCardLeave(e) {
  const card = e.currentTarget
  // Reset any hover effects if needed
}

// Course card interactions
function handleCourseCardClick(e) {
  const card = e.currentTarget
  const courseTitle = card.querySelector("h3").textContent

  // Add click effect
  card.style.transform = "scale(0.98)"
  setTimeout(() => {
    card.style.transform = "translateY(-10px)"
  }, 150)

  console.log(`Opening course: ${courseTitle}`)

  // Simulate course opening
  showCourseModal(courseTitle)
}

// Play button interactions
function handlePlayButtonClick(e) {
  e.stopPropagation()
  const button = e.currentTarget

  // Add ripple effect
  const ripple = document.createElement("div")
  ripple.style.position = "absolute"
  ripple.style.borderRadius = "50%"
  ripple.style.background = "rgba(255, 255, 255, 0.6)"
  ripple.style.transform = "scale(0)"
  ripple.style.animation = "ripple 0.6s linear"
  ripple.style.left = "50%"
  ripple.style.top = "50%"
  ripple.style.width = "100px"
  ripple.style.height = "100px"
  ripple.style.marginLeft = "-50px"
  ripple.style.marginTop = "-50px"

  button.style.position = "relative"
  button.appendChild(ripple)

  setTimeout(() => {
    ripple.remove()
  }, 600)

  // Simulate video play
  console.log("Playing video...")
  showVideoPlayer()
}

// Navigation smooth scrolling
function handleNavLinkClick(e) {
  e.preventDefault()
  const targetId = e.target.getAttribute("href")
  const targetSection = document.querySelector(targetId)

  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Profile menu toggle
function toggleProfileMenu(e) {
  const dropdown = e.currentTarget.querySelector(".dropdown")
  if (dropdown) {
    dropdown.style.opacity = dropdown.style.opacity === "1" ? "0" : "1"
    dropdown.style.visibility = dropdown.style.visibility === "visible" ? "hidden" : "visible"
  }
}

// Scroll effects
function setupScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for scroll animations
  const elementsToObserve = document.querySelectorAll(".language-card, .course-card, .feature-card")
  elementsToObserve.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "all 0.6s ease"
    observer.observe(element)
  })
}

// Progress bar animations
function setupProgressAnimations() {
  const progressBars = document.querySelectorAll(".progress")

  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target
          const targetWidth = progressBar.style.width
          progressBar.style.width = "0%"

          setTimeout(() => {
            progressBar.style.width = targetWidth
          }, 500)
        }
      })
    },
    { threshold: 0.5 },
  )

  progressBars.forEach((bar) => {
    progressObserver.observe(bar)
  })
}

// Modal functions
function showCourseModal(courseTitle) {
  // Create modal overlay
  const modal = document.createElement("div")
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `

  // Create modal content
  const modalContent = document.createElement("div")
  modalContent.style.cssText = `
        background: rgba(20, 20, 20, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `

  modalContent.innerHTML = `
        <h2 style="color: #fff; margin-bottom: 1rem;">${courseTitle}</h2>
        <p style="color: #ccc; margin-bottom: 2rem;">This course will be available soon. Stay tuned for updates!</p>
        <button onclick="closeModal()" style="
            background: linear-gradient(135deg, #00d4ff, #0099cc);
            color: #fff;
            border: none;
            padding: 10px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
        ">Close</button>
    `

  modal.appendChild(modalContent)
  document.body.appendChild(modal)

  // Animate modal appearance
  setTimeout(() => {
    modal.style.opacity = "1"
    modalContent.style.transform = "scale(1)"
  }, 10)

  // Close modal on overlay click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })

  // Store modal reference for closing
  window.currentModal = modal
}

function showVideoPlayer(title) {
  const modal = createModal(
    "Video Player",
    `
    <div class="video-player-container" style="max-width: 800px;">
      <div class="video-header" style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
      ">
        <h3 style="color: var(--text-primary);">${title}</h3>
        <button class="btn-secondary" onclick="closeModal()" style="padding: 0.5rem 1rem;">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="video-screen" style="
        background: #000;
        border-radius: 10px;
        aspect-ratio: 16/9;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
        position: relative;
      ">
        <div style="text-align: center; color: white;">
          <i class="fas fa-play-circle" style="font-size: 4rem; margin-bottom: 1rem; color: var(--primary-color);"></i>
          <p>Video player will be integrated here</p>
          <p style="font-size: 0.9rem; opacity: 0.7;">Click to start learning</p>
        </div>
      </div>
      <div class="video-actions" style="display: flex; gap: 1rem; justify-content: center;">
        <button class="btn-primary">
          <i class="fas fa-bookmark"></i>
          Save Video
        </button>
        <button class="btn-secondary">
          <i class="fas fa-share"></i>
          Share
        </button>
      </div>
    </div>
  `,
  )

  document.body.appendChild(modal)
}

// Create Modal
function createModal(title, content) {
  const modal = document.createElement("div")
  modal.className = "modal-overlay"
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
  `

  modal.innerHTML = `
    <div class="modal-content" style="
      background: var(--bg-card);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 2rem;
      max-width: 90vw;
      max-height: 90vh;
      overflow-y: auto;
      transform: scale(0.8);
      transition: transform 0.3s ease;
    ">
      ${content}
    </div>
  `

  // Animate modal appearance
  setTimeout(() => {
    modal.style.opacity = "1"
    modal.querySelector(".modal-content").style.transform = "scale(1)"
  }, 10)

  // Close on overlay click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })

  return modal
}

// Close Modal
function closeModal() {
  const modal = document.querySelector(".modal-overlay")
  if (modal) {
    modal.style.opacity = "0"
    modal.querySelector(".modal-content").style.transform = "scale(0.8)"
    setTimeout(() => {
      modal.remove()
    }, 300)
  }
}

// Handle Button Clicks
function handleButtonClick(e) {
  const button = e.currentTarget
  const buttonText = button.textContent.trim()

  // Add click animation
  button.style.transform = "scale(0.95)"
  setTimeout(() => {
    button.style.transform = ""
  }, 150)

  // Handle different button actions
  switch (buttonText) {
    case "Start Learning":
    case "Start Learning Now":
      window.location.href = "explore.html"
      break
    case "Explore Content":
    case "Explore Videos":
      window.location.href = "explore.html"
      break
    case "Watch Demo":
      showVideoDemo()
      break
    default:
      console.log("Button clicked:", buttonText)
  }

  // Add ripple effect
  createRippleEffect(button, e)
}

// Create Ripple Effect
function createRippleEffect(element, event) {
  const ripple = document.createElement("span")
  const rect = element.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  `

  element.style.position = "relative"
  element.style.overflow = "hidden"
  element.appendChild(ripple)

  setTimeout(() => {
    ripple.remove()
  }, 600)
}

// Add ripple animation to CSS
const rippleStyle = document.createElement("style")
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`
document.head.appendChild(rippleStyle)

// Handle FAB Actions
function toggleFAB() {
  const fabOptions = document.querySelector(".fab-options")
  const isVisible = fabOptions.style.opacity === "1"

  if (isVisible) {
    fabOptions.style.opacity = "0"
    fabOptions.style.visibility = "hidden"
    fabOptions.style.transform = "translateY(20px)"
  } else {
    fabOptions.style.opacity = "1"
    fabOptions.style.visibility = "visible"
    fabOptions.style.transform = "translateY(0)"
  }
}

function handleFABAction(e) {
  const tooltip = e.currentTarget.getAttribute("data-tooltip")
  console.log("FAB action:", tooltip)

  switch (tooltip) {
    case "Add to Today's Plan":
      window.location.href = "notes.html"
      break
    case "Quick Note":
      window.location.href = "notes.html"
      break
    case "Find Friends":
      window.location.href = "profile.html"
      break
  }

  // Close FAB
  toggleFAB()
}

// Handle Feature Card Hover
function handleFeatureHover(e) {
  const card = e.currentTarget
  const icon = card.querySelector(".feature-icon")

  if (icon) {
    icon.style.transform = "scale(1.1) rotate(5deg)"
    icon.style.boxShadow = "0 10px 30px rgba(0, 212, 255, 0.4)"
  }
}

function handleFeatureLeave(e) {
  const card = e.currentTarget
  const icon = card.querySelector(".feature-icon")

  if (icon) {
    icon.style.transform = ""
    icon.style.boxShadow = ""
  }
}

// Handle Dashboard Item Click
function handleDashboardItemClick(e) {
  const item = e.currentTarget
  const isCompleted = item.classList.contains("completed")

  if (!isCompleted) {
    // Mark as completed
    item.classList.remove("pending")
    item.classList.add("completed")

    const checkbox = item.querySelector(".todo-checkbox")
    const icon = checkbox.querySelector("i")

    checkbox.classList.add("checked")
    icon.className = "fas fa-check"

    // Add completion animation
    item.style.transform = "scale(1.05)"
    setTimeout(() => {
      item.style.transform = ""
    }, 300)

    // Show badge notification
    showBadgeNotification("Task Completed!")
  }
}

// Handle Video Play
function handleVideoPlay(e) {
  e.preventDefault()
  const videoContainer = e.currentTarget.closest(".video-player-mockup, .video-card")
  const videoTitle = videoContainer.querySelector("h4, h3").textContent

  console.log("Playing video:", videoTitle)
  showVideoPlayer(videoTitle)
}

// Show Video Demo
function showVideoDemo() {
  const modal = createModal(
    "Video Demo",
    `
    <div style="text-align: center; padding: 2rem;">
      <div style="
        width: 100px;
        height: 100px;
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 2rem;
        animation: pulse 2s infinite;
      ">
        <i class="fas fa-play" style="font-size: 2rem; color: white; margin-left: 5px;"></i>
      </div>
      <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Welcome to CreatoSphere!</h3>
      <p style="color: var(--text-secondary); margin-bottom: 2rem;">
        Experience the future of learning with our interactive platform.
      </p>
      <button class="btn-primary" onclick="closeModal()">
        <i class="fas fa-rocket"></i>
        Start Learning Now
      </button>
    </div>
  `,
  )

  document.body.appendChild(modal)
}

// Show Badge Notification
function showBadgeNotification(message) {
  const notification = document.createElement("div")
  notification.className = "badge-notification"
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 2rem;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
    z-index: 10001;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `

  notification.innerHTML = `
    <i class="fas fa-trophy"></i>
    <span>${message}</span>
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, 3000)
}

// Handle Keyboard Shortcuts
function handleKeyboardShortcuts(e) {
  // Ctrl/Cmd + K for search
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault()
    const searchInput = document.querySelector(".search-input")
    if (searchInput) {
      searchInput.focus()
    }
  }

  // Escape to close modals
  if (e.key === "Escape") {
    closeModal()
    hideSearchSuggestions()
  }

  // Space to pause/play videos
  if (e.key === " " && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
    e.preventDefault()
    // Handle video play/pause
  }
}

// Update Date Time
function updateDateTime() {
  setInterval(() => {
    const now = new Date()
    const timeString = now.toLocaleTimeString()
    const dateString = now.toLocaleDateString()

    // Update any time displays
    const timeElements = document.querySelectorAll(".current-time")
    timeElements.forEach((element) => {
      element.textContent = timeString
    })
  }, 1000)
}

// Load User Data
function loadUserData() {
  // Simulate loading user data
  setTimeout(() => {
    console.log("User data loaded:", currentUser)

    // Update user avatar
    const avatars = document.querySelectorAll(".user-avatar img")
    avatars.forEach((avatar) => {
      avatar.src = currentUser.avatar
    })

    // Update user name
    const nameElements = document.querySelectorAll(".user-name")
    nameElements.forEach((element) => {
      element.textContent = currentUser.name
    })
  }, 1000)
}

// Animate Counters
function animateCounters() {
  const counters = document.querySelectorAll("[data-count]")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-count"))
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      counter.textContent = Math.floor(current).toLocaleString()
    }, 16)
  })
}

// Setup Robot Speech
function setupRobotSpeech() {
  const robotSpeech = document.getElementById("robot-speech")
  if (!robotSpeech) return

  const speeches = [
    "Why wait? Dive into CreatoSphere and learn something new!",
    "Ready to unlock your potential? Let's start coding!",
    "The future belongs to learners. Join us today!",
    "Every expert was once a beginner. Start your journey!",
    "Code, learn, grow, repeat. That's the CreatoSphere way!",
  ]

  let currentIndex = 0

  setInterval(() => {
    robotSpeech.style.opacity = "0"
    setTimeout(() => {
      robotSpeech.textContent = speeches[currentIndex]
      robotSpeech.style.opacity = "1"
      currentIndex = (currentIndex + 1) % speeches.length
    }, 500)
  }, 4000)
}

// Update Notification Count
function updateNotificationCount() {
  const notificationCount = document.querySelector(".notification-count")
  if (notificationCount) {
    notificationCount.textContent = notifications.length

    if (notifications.length > 0) {
      notificationCount.style.display = "flex"
    } else {
      notificationCount.style.display = "none"
    }
  }
}

// Initialize theme
function initializeTheme() {
  const savedTheme = loadFromLocalStorage("theme") || "dark"
  document.body.setAttribute("data-theme", savedTheme)
}

// Performance optimization
function optimizePerformance() {
  // Lazy load images
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute("data-src")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Utility Functions
function showToast(message, type = "info") {
  const toast = document.createElement("div")
  toast.className = "toast"
  toast.style.cssText = `
    position: fixed;
    top: 100px;
    right: 2rem;
    background: var(--bg-card);
    backdrop-filter: blur(20px);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 1rem 1.5rem;
    color: var(--text-primary);
    z-index: 10001;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    max-width: 300px;
  `

  const icons = {
    info: "fas fa-info-circle",
    success: "fas fa-check-circle",
    warning: "fas fa-exclamation-triangle",
    error: "fas fa-times-circle",
  }

  const colors = {
    info: "var(--primary-color)",
    success: "var(--success-color)",
    warning: "var(--warning-color)",
    error: "var(--error-color)",
  }

  toast.innerHTML = `
    <i class="${icons[type]}" style="color: ${colors[type]};"></i>
    <span>${message}</span>
  `

  document.body.appendChild(toast)

  setTimeout(() => {
    toast.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    toast.style.transform = "translateX(100%)"
    setTimeout(() => {
      toast.remove()
    }, 300)
  }, 3000)
}

function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error("Error saving to localStorage:", error)
  }
}

function loadFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Error loading from localStorage:", error)
    return null
  }
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)
  showToast("An error occurred. Please refresh the page.", "error")
})

console.log("🤖 CreatoSphere JavaScript loaded successfully!")
