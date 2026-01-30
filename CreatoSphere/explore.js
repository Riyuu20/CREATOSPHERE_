// Explore page functionality
let allCourses = []
let filteredCourses = []
const currentCategory = "all"
const currentSort = "popular"
const currentPage = 1
const coursesPerPage = 12
const allVideos = []
const currentVideos = []
const videosPerPage = 12
const isLoading = false

// Sample courses data
const coursesData = [
  {
    id: 1,
    title: "Complete JavaScript Course 2024",
    instructor: "Jonas Schmedtmann",
    description: "Master JavaScript with the most complete course! Projects, challenges, final exam, ES2024",
    image: "/placeholder.svg?height=200&width=350&text=JavaScript+Course",
    level: "Beginner",
    duration: "69 hours",
    rating: 4.8,
    reviews: 1205,
    price: 89.99,
    originalPrice: 129.99,
    category: "programming",
    tags: ["JavaScript", "Programming", "Web Development"],
    students: 45000,
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    title: "React - The Complete Guide",
    instructor: "Maximilian Schwarzmüller",
    description:
      "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
    image: "/placeholder.svg?height=200&width=350&text=React+Course",
    level: "Intermediate",
    duration: "48 hours",
    rating: 4.9,
    reviews: 2156,
    price: 94.99,
    originalPrice: 139.99,
    category: "programming",
    tags: ["React", "Frontend", "JavaScript"],
    students: 32000,
    lastUpdated: "2024-01-10",
  },
  {
    id: 3,
    title: "UI/UX Design Complete Course",
    instructor: "Daniel Schifano",
    description:
      "Learn UI/UX design from scratch. Master Figma, Adobe XD, user research, wireframing, and prototyping.",
    image: "/placeholder.svg?height=200&width=350&text=UI/UX+Design",
    level: "Beginner",
    duration: "35 hours",
    rating: 4.7,
    reviews: 856,
    price: 79.99,
    originalPrice: 119.99,
    category: "design",
    tags: ["UI Design", "UX Design", "Figma"],
    students: 28000,
    lastUpdated: "2024-01-20",
  },
  {
    id: 4,
    title: "Digital Marketing Masterclass",
    instructor: "Phil Ebiner",
    description:
      "Complete digital marketing course covering SEO, social media marketing, Google Ads, Facebook Ads & more!",
    image: "/placeholder.svg?height=200&width=350&text=Digital+Marketing",
    level: "Beginner",
    duration: "42 hours",
    rating: 4.6,
    reviews: 1542,
    price: 84.99,
    originalPrice: 124.99,
    category: "marketing",
    tags: ["Digital Marketing", "SEO", "Social Media"],
    students: 67000,
    lastUpdated: "2024-01-05",
  },
  {
    id: 5,
    title: "Business Strategy & Leadership",
    instructor: "Chris Haroun",
    description: "Learn business strategy, leadership skills, and management techniques used by top companies.",
    image: "/placeholder.svg?height=200&width=350&text=Business+Strategy",
    level: "Advanced",
    duration: "28 hours",
    rating: 4.8,
    reviews: 743,
    price: 99.99,
    originalPrice: 149.99,
    category: "business",
    tags: ["Business Strategy", "Leadership", "Management"],
    students: 15000,
    lastUpdated: "2024-01-18",
  },
  {
    id: 6,
    title: "Python Complete Bootcamp",
    instructor: "Jose Portilla",
    description:
      "Learn Python like a Professional! Start from the basics and go all the way to creating your own applications.",
    image: "/placeholder.svg?height=200&width=350&text=Python+Bootcamp",
    level: "Beginner",
    duration: "54 hours",
    rating: 4.9,
    reviews: 2834,
    price: 89.99,
    originalPrice: 129.99,
    category: "programming",
    tags: ["Python", "Programming", "Data Science"],
    students: 58000,
    lastUpdated: "2024-01-12",
  },
  {
    id: 7,
    title: "Graphic Design Masterclass",
    instructor: "Lindsay Marsh",
    description:
      "Learn Photoshop, Illustrator & InDesign! Create stunning logos, graphics and designs for web and print.",
    image: "/placeholder.svg?height=200&width=350&text=Graphic+Design",
    level: "Intermediate",
    duration: "38 hours",
    rating: 4.7,
    reviews: 1267,
    price: 74.99,
    originalPrice: 109.99,
    category: "design",
    tags: ["Graphic Design", "Photoshop", "Illustrator"],
    students: 22000,
    lastUpdated: "2024-01-08",
  },
  {
    id: 8,
    title: "Social Media Marketing 2024",
    instructor: "Alex Genadinik",
    description: "Complete social media marketing course. Instagram, Facebook, Twitter, YouTube, LinkedIn & more!",
    image: "/placeholder.svg?height=200&width=350&text=Social+Media",
    level: "Beginner",
    duration: "31 hours",
    rating: 4.5,
    reviews: 987,
    price: 69.99,
    originalPrice: 99.99,
    category: "marketing",
    tags: ["Social Media", "Instagram", "Facebook Marketing"],
    students: 34000,
    lastUpdated: "2024-01-22",
  },
  {
    id: 9,
    title: "Node.js Complete Developer Course",
    instructor: "Andrew Mead",
    description: "Learn Node.js by building real-world applications with Node, Express, MongoDB, Jest, and more!",
    image: "/placeholder.svg?height=200&width=350&text=Node.js+Course",
    level: "Intermediate",
    duration: "46 hours",
    rating: 4.8,
    reviews: 1456,
    price: 94.99,
    originalPrice: 134.99,
    category: "programming",
    tags: ["Node.js", "Express", "MongoDB"],
    students: 28000,
    lastUpdated: "2024-01-14",
  },
  {
    id: 10,
    title: "Complete Web Development Bootcamp",
    instructor: "Angela Yu",
    description:
      "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps",
    image: "/placeholder.svg?height=200&width=350&text=Web+Development",
    level: "Beginner",
    duration: "85 hours",
    rating: 4.9,
    reviews: 3245,
    price: 94.99,
    originalPrice: 149.99,
    category: "programming",
    tags: ["Web Development", "Full Stack", "HTML", "CSS"],
    students: 78000,
    lastUpdated: "2024-01-25",
  },
]

// Sample videos data
const codingVideos = [
  {
    id: "dQw4w9WgXcQ",
    title: "JavaScript Tutorial for Beginners",
    description: "Learn JavaScript from scratch in this beginner-friendly tutorial.",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    duration: "2:15:30",
    uploadDate: "2 days ago",
    views: "2.5M",
    likes: "45K",
    channel: "FreeCodeCamp.org",
    category: "javascript",
    tags: ["JavaScript", "Tutorial", "Beginner"],
    difficulty: "beginner",
  },
  {
    id: "Ke90Tje7VS0",
    title: "React JS Tutorial for Beginners",
    description: "Get started with React JS in this comprehensive tutorial for beginners.",
    thumbnail: "https://i.ytimg.com/vi/Ke90Tje7VS0/mqdefault.jpg",
    duration: "1:45:22",
    uploadDate: "1 week ago",
    views: "1.8M",
    likes: "32K",
    channel: "Net Ninja",
    category: "react",
    tags: ["React", "Tutorial", "Beginner"],
    difficulty: "beginner",
  },
  {
    id: "WyxB8P4P0IE",
    title: "Python Full Course for Beginners",
    description: "Learn Python in this full course for beginners. No prior programming experience needed.",
    thumbnail: "https://i.ytimg.com/vi/WyxB8P4P0IE/mqdefault.jpg",
    duration: "4:10:15",
    uploadDate: "3 weeks ago",
    views: "3.2M",
    likes: "60K",
    channel: "Programming with Mosh",
    category: "python",
    tags: ["Python", "Tutorial", "Beginner"],
    difficulty: "beginner",
  },
  {
    id: "TlB_eWDSmt4",
    title: "Node.js API Development for Beginners",
    description: "Build a RESTful API with Node.js, Express, and MongoDB in this beginner-friendly tutorial.",
    thumbnail: "https://i.ytimg.com/vi/TlB_eWDSmt4/mqdefault.jpg",
    duration: "2:30:45",
    uploadDate: "1 month ago",
    views: "1.5M",
    likes: "28K",
    channel: "Traversy Media",
    category: "nodejs",
    tags: ["Node.js", "API", "MongoDB"],
    difficulty: "intermediate",
  },
  {
    id: "8cm1xYS6Q_Q",
    title: "Java Programming Tutorial",
    description: "Learn Java programming in this comprehensive tutorial for beginners.",
    thumbnail: "https://i.ytimg.com/vi/8cm1xYS6Q_Q/mqdefault.jpg",
    duration: "3:00:00",
    uploadDate: "2 months ago",
    views: "2.0M",
    likes: "38K",
    channel: "Bro Code",
    category: "java",
    tags: ["Java", "Tutorial", "Beginner"],
    difficulty: "beginner",
  },
  {
    id: "vLnPwxZdW4Y",
    title: "C++ Tutorial for Beginners",
    description: "Get started with C++ programming in this beginner-friendly tutorial.",
    thumbnail: "https://i.ytimg.com/vi/vLnPwxZdW4Y/mqdefault.jpg",
    duration: "2:45:10",
    uploadDate: "3 months ago",
    views: "1.2M",
    likes: "22K",
    channel: "The Cherno",
    category: "cpp",
    tags: ["C++", "Tutorial", "Beginner"],
    difficulty: "beginner",
  },
  {
    id: "4ZAEBxGipoA",
    title: "Web Development Tutorial",
    description: "Learn web development from scratch in this comprehensive tutorial.",
    thumbnail: "https://i.ytimg.com/vi/4ZAEBxGipoA/mqdefault.jpg",
    duration: "5:00:00",
    uploadDate: "4 months ago",
    views: "2.8M",
    likes: "52K",
    channel: "Academind",
    category: "web",
    tags: ["Web Development", "HTML", "CSS", "JavaScript"],
    difficulty: "beginner",
  },
  {
    id: "i_LwzRVPJW4",
    title: "AI/ML Tutorial for Beginners",
    description: "Get started with Artificial Intelligence and Machine Learning in this beginner-friendly tutorial.",
    thumbnail: "https://i.ytimg.com/vi/i_LwzRVPJW4/mqdefault.jpg",
    duration: "3:30:20",
    uploadDate: "5 months ago",
    views: "1.0M",
    likes: "18K",
    channel: "Sentdex",
    category: "ai",
    tags: ["AI", "ML", "Tutorial", "Beginner"],
    difficulty: "beginner",
  },
  {
    id: "tBweoUiMsDs",
    title: "Advanced JavaScript Concepts",
    description: "Master advanced JavaScript concepts in this in-depth tutorial.",
    thumbnail: "https://i.ytimg.com/vi/tBweoUiMsDs/mqdefault.jpg",
    duration: "4:00:00",
    uploadDate: "6 months ago",
    views: "800K",
    likes: "15K",
    channel: "Fun Fun Function",
    category: "javascript",
    tags: ["JavaScript", "Advanced", "Tutorial"],
    difficulty: "advanced",
  },
  {
    id: "QETkGfrAGyk",
    title: "Advanced React Patterns",
    description: "Learn advanced React patterns and techniques in this tutorial.",
    thumbnail: "https://i.ytimg.com/vi/QETkGfrAGyk/mqdefault.jpg",
    duration: "3:45:30",
    uploadDate: "7 months ago",
    views: "700K",
    likes: "13K",
    channel: "Kent C. Dodds",
    category: "react",
    tags: ["React", "Advanced", "Patterns"],
    difficulty: "advanced",
  },
]

// Global variables
const savedVideos = JSON.parse(localStorage.getItem("savedVideos")) || []

// DOM Elements
const coursesGrid = document.getElementById("coursesGrid")
const videoGrid = document.getElementById("videoGrid")
const searchInput = document.getElementById("searchInput")
const filterButtons = document.querySelectorAll(".filter-btn")
const filterTabs = document.querySelectorAll(".filter-tab")
const sortSelect = document.getElementById("sortSelect")
const heroSearch = document.getElementById("heroSearch")
const loadMoreBtn = document.getElementById("loadMoreBtn")
const courseModal = document.getElementById("courseModal")
const videoModal = document.getElementById("videoModal")
const modalClose = document.getElementById("modalClose")
const modalOverlay = document.querySelector(".modal-overlay")
const toast = document.getElementById("toast")
const resultsCount = document.getElementById("resultsCount")

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Explore page loading...")
  allCourses = [...coursesData]
  filteredCourses = [...allCourses]

  // setupEventListeners() - This function is now part of the ExploreVideoPlayer class
  // renderCourses() - This function is no longer needed
  // updateResultsCount() - This function is now part of the ExploreVideoPlayer class

  console.log("✅ Explore page loaded successfully!")
})

// Explore Page - Professional YouTube-like Video Player
class ExploreVideoPlayer {
  constructor() {
    this.videos = []
    this.filteredVideos = []
    this.currentCategory = "all"
    this.currentSort = "relevance"
    this.currentPage = 1
    this.videosPerPage = 12
    this.isLoading = false
    this.savedVideos = JSON.parse(localStorage.getItem("savedVideos")) || []
    this.likedVideos = JSON.parse(localStorage.getItem("likedVideos")) || []
    this.currentVideoId = null
    this.isMinimized = false

    this.initializeVideos()
    this.setupEventListeners()
    this.loadVideos()
    this.updateStats()
  }

  // Real YouTube Videos Data
  initializeVideos() {
    this.videos = [
      {
        id: "PkZNo7MFNFg",
        title: "Learn JavaScript - Full Course for Beginners",
        channel: "freeCodeCamp.org",
        description:
          "This complete 134-part JavaScript tutorial for beginners will teach you everything you need to know to get started with the JavaScript programming language.",
        thumbnail: "https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
        duration: "3:26:42",
        views: "8.2M",
        likes: "156K",
        uploadDate: "2 years ago",
        category: "javascript",
        tags: ["JavaScript", "Programming", "Beginner", "Tutorial"],
        quality: "HD",
      },
      {
        id: "Ke90Tje7VS0",
        title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
        channel: "Academind",
        description:
          "Master React with this complete course! Learn React, Hooks, Redux, React Routing, Animations, Next.js and way more!",
        thumbnail: "https://img.youtube.com/vi/Ke90Tje7VS0/maxresdefault.jpg",
        duration: "40:52:13",
        views: "2.8M",
        likes: "89K",
        uploadDate: "1 year ago",
        category: "react",
        tags: ["React", "Redux", "Hooks", "Complete Course"],
        quality: "4K",
      },
      {
        id: "rfscVS0vtbw",
        title: "Learn Python - Full Course for Beginners [Tutorial]",
        channel: "freeCodeCamp.org",
        description:
          "This course will give you a full introduction into all of the core concepts in python. Follow along with the videos and you'll be a python programmer in no time!",
        thumbnail: "https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg",
        duration: "4:26:52",
        views: "15.2M",
        likes: "312K",
        uploadDate: "4 years ago",
        category: "python",
        tags: ["Python", "Programming", "Beginner", "Full Course"],
        quality: "HD",
      },
      {
        id: "fBNz5xF-Kx4",
        title: "Node.js Tutorial for Beginners: Learn Node in 1 Hour",
        channel: "Programming with Mosh",
        description:
          "Node.js tutorial for beginners. Learn Node.js in this crash course. We'll learn what Node is, why it's popular and we'll build a simple web server.",
        thumbnail: "https://img.youtube.com/vi/fBNz5xF-Kx4/maxresdefault.jpg",
        duration: "1:08:35",
        views: "3.1M",
        likes: "89K",
        uploadDate: "4 years ago",
        category: "nodejs",
        tags: ["Node.js", "Backend", "JavaScript", "Tutorial"],
        quality: "HD",
      },
      {
        id: "1Rs2ND1ryYc",
        title: "CSS Tutorial - Zero to Hero (Complete Course)",
        channel: "freeCodeCamp.org",
        description:
          "Learn CSS from zero to hero in this complete course. Master CSS fundamentals, flexbox, grid, animations, and more.",
        thumbnail: "https://img.youtube.com/vi/1Rs2ND1ryYc/maxresdefault.jpg",
        duration: "6:18:27",
        views: "3.8M",
        likes: "89K",
        uploadDate: "2 years ago",
        category: "css",
        tags: ["CSS", "Web Development", "Styling", "Complete Course"],
        quality: "HD",
      },
      {
        id: "W6NZfCO5SIk",
        title: "JavaScript Tutorial for Beginners: Learn JavaScript in 1 Hour",
        channel: "Programming with Mosh",
        description:
          "JavaScript tutorial for beginners. Learn JavaScript basics in 1 hour! You'll learn what JavaScript is, what it's used for, and how to write your first JavaScript program.",
        thumbnail: "https://img.youtube.com/vi/W6NZfCO5SIk/maxresdefault.jpg",
        duration: "1:08:43",
        views: "4.5M",
        likes: "112K",
        uploadDate: "4 years ago",
        category: "javascript",
        tags: ["JavaScript", "Tutorial", "Basics", "Beginner"],
        quality: "HD",
      },
      {
        id: "bMknfKXIFA8",
        title: "React Course - Beginner's Tutorial for React JavaScript Library [2022]",
        channel: "freeCodeCamp.org",
        description:
          "Learn React JS in this full course for beginners. React is a free and open-source front-end JavaScript library for building user interfaces or UI components.",
        thumbnail: "https://img.youtube.com/vi/bMknfKXIFA8/maxresdefault.jpg",
        duration: "11:55:27",
        views: "3.2M",
        likes: "78K",
        uploadDate: "1 year ago",
        category: "react",
        tags: ["React", "JavaScript", "Frontend", "Components"],
        quality: "4K",
      },
      {
        id: "_uQrJ0TkZlc",
        title: "Python Tutorial - Python for Beginners [Full Course]",
        channel: "Programming with Mosh",
        description:
          "Python tutorial for beginners - Learn Python for machine learning, web development, and more. This Python course covers all the fundamentals.",
        thumbnail: "https://img.youtube.com/vi/_uQrJ0TkZlc/maxresdefault.jpg",
        duration: "6:14:07",
        views: "12.8M",
        likes: "278K",
        uploadDate: "3 years ago",
        category: "python",
        tags: ["Python", "Tutorial", "Machine Learning", "Web Development"],
        quality: "HD",
      },
      {
        id: "RLtyhwFtXQA",
        title: "Node.js Crash Course",
        channel: "Traversy Media",
        description:
          "In this crash course we will explore Node.js fundamentals including modules, file system, events, http module and we will finish with a small web server using Express.",
        thumbnail: "https://img.youtube.com/vi/RLtyhwFtXQA/maxresdefault.jpg",
        duration: "1:30:44",
        views: "2.3M",
        likes: "67K",
        uploadDate: "2 years ago",
        category: "nodejs",
        tags: ["Node.js", "Express", "Backend", "Crash Course"],
        quality: "HD",
      },
      {
        id: "G3e-cpL7ofc",
        title: "HTML & CSS Full Course - Beginner to Pro (2022)",
        channel: "SuperSimpleDev",
        description:
          "Complete HTML & CSS course for beginners. Learn to build beautiful, responsive websites from scratch.",
        thumbnail: "https://img.youtube.com/vi/G3e-cpL7ofc/maxresdefault.jpg",
        duration: "6:31:04",
        views: "2.1M",
        likes: "56K",
        uploadDate: "1 year ago",
        category: "css",
        tags: ["HTML", "CSS", "Responsive", "Web Development"],
        quality: "HD",
      },
    ]

    this.filteredVideos = [...this.videos]
  }

  setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById("searchInput")
    const heroSearch = document.getElementById("heroSearch")
    const searchBtn = document.getElementById("searchBtn")
    const heroSearchBtn = document.getElementById("heroSearchBtn")

    searchInput?.addEventListener("input", this.debounce(this.handleSearch.bind(this), 300))
    heroSearch?.addEventListener("input", this.debounce(this.handleSearch.bind(this), 300))
    searchBtn?.addEventListener("click", this.handleSearchClick.bind(this))
    heroSearchBtn?.addEventListener("click", this.handleSearchClick.bind(this))

    // Search suggestions
    heroSearch?.addEventListener("focus", this.showSearchSuggestions.bind(this))
    document.addEventListener("click", this.hideSearchSuggestions.bind(this))

    // Filter tabs
    const filterTabs = document.querySelectorAll(".filter-tab")
    filterTabs.forEach((tab) => {
      tab.addEventListener("click", this.handleFilterChange.bind(this))
    })

    // Sort functionality
    const sortSelect = document.getElementById("sortSelect")
    sortSelect?.addEventListener("change", this.handleSortChange.bind(this))

    // View toggle
    const viewBtns = document.querySelectorAll(".view-btn")
    viewBtns.forEach((btn) => {
      btn.addEventListener("click", this.handleViewChange.bind(this))
    })

    // Refresh button
    const refreshBtn = document.getElementById("refreshBtn")
    refreshBtn?.addEventListener("click", this.refreshVideos.bind(this))

    // Load more button
    const loadMoreBtn = document.getElementById("loadMoreBtn")
    loadMoreBtn?.addEventListener("click", this.loadMoreVideos.bind(this))

    // Modal controls
    const modalClose = document.getElementById("modalClose")
    const modalOverlay = document.getElementById("modalOverlay")
    const fullscreenBtn = document.getElementById("fullscreenBtn")
    const minimizeBtn = document.getElementById("minimizeBtn")

    modalClose?.addEventListener("click", this.closeModal.bind(this))
    modalOverlay?.addEventListener("click", this.closeModal.bind(this))
    fullscreenBtn?.addEventListener("click", this.toggleFullscreen.bind(this))
    minimizeBtn?.addEventListener("click", this.minimizePlayer.bind(this))

    // Mini player controls
    const miniExpandBtn = document.getElementById("miniExpandBtn")
    const miniCloseBtn = document.getElementById("miniCloseBtn")

    miniExpandBtn?.addEventListener("click", this.expandMiniPlayer.bind(this))
    miniCloseBtn?.addEventListener("click", this.closeMiniPlayer.bind(this))

    // FAB controls
    const fabBtn = document.getElementById("fabBtn")
    const randomVideoBtn = document.getElementById("randomVideoBtn")
    const trendingBtn = document.getElementById("trendingBtn")

    fabBtn?.addEventListener("click", this.toggleFabMenu.bind(this))
    randomVideoBtn?.addEventListener("click", this.playRandomVideo.bind(this))
    trendingBtn?.addEventListener("click", this.showTrending.bind(this))

    // Keyboard shortcuts
    document.addEventListener("keydown", this.handleKeyboardShortcuts.bind(this))

    // Search suggestions clicks
    const suggestionItems = document.querySelectorAll(".suggestion-item")
    suggestionItems.forEach((item) => {
      item.addEventListener("click", this.handleSuggestionClick.bind(this))
    })
  }

  loadVideos() {
    this.showLoading(true)

    // Simulate API loading
    setTimeout(() => {
      this.renderVideos()
      this.updateResultsCount()
      this.showLoading(false)
    }, 1000)
  }

  showLoading(show) {
    const loadingSpinner = document.getElementById("loadingSpinner")
    const videosGrid = document.getElementById("videosGrid")

    if (show) {
      loadingSpinner.style.display = "flex"
      videosGrid.style.display = "none"
    } else {
      loadingSpinner.style.display = "none"
      videosGrid.style.display = "grid"
    }
  }

  renderVideos() {
    const videosGrid = document.getElementById("videosGrid")
    const startIndex = 0
    const endIndex = this.currentPage * this.videosPerPage
    const videosToShow = this.filteredVideos.slice(startIndex, endIndex)

    if (videosToShow.length === 0) {
      videosGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 4rem;">
                    <i class="fas fa-search" style="font-size: 4rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">No videos found</h3>
                    <p style="color: var(--text-secondary);">Try adjusting your search or filters</p>
                </div>
            `
      return
    }

    videosGrid.innerHTML = videosToShow.map((video, index) => this.createVideoCard(video, index)).join("")
    this.addVideoCardListeners()
    this.updateLoadMoreButton()
  }

  createVideoCard(video, index) {
    const isSaved = this.savedVideos.some((v) => v.id === video.id)
    const isLiked = this.likedVideos.some((v) => v.id === video.id)

    return `
            <div class="video-card" data-video-id="${video.id}" style="animation-delay: ${index * 0.1}s;">
                <div class="video-thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
                    <div class="video-overlay">
                        <div class="play-button">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="video-duration">${video.duration}</div>
                    <div class="video-quality">${video.quality}</div>
                </div>
                <div class="video-info">
                    <h3 class="video-title">${video.title}</h3>
                    <div class="video-channel">
                        <i class="fas fa-user-circle"></i>
                        ${video.channel}
                    </div>
                    <p class="video-description">${video.description}</p>
                    <div class="video-meta">
                        <div class="video-stats">
                            <span><i class="fas fa-eye"></i> ${video.views}</span>
                            <span><i class="fas fa-thumbs-up"></i> ${video.likes}</span>
                        </div>
                        <span>${video.uploadDate}</span>
                    </div>
                    <div class="video-actions">
                        <button class="action-btn like-btn ${isLiked ? "liked" : ""}" data-video-id="${video.id}">
                            <i class="fas fa-thumbs-up"></i>
                            <span>${isLiked ? "Liked" : "Like"}</span>
                        </button>
                        <button class="action-btn save-btn ${isSaved ? "saved" : ""}" data-video-id="${video.id}">
                            <i class="fas fa-bookmark"></i>
                            <span>${isSaved ? "Saved" : "Save"}</span>
                        </button>
                    </div>
                </div>
            </div>
        `
  }

  addVideoCardListeners() {
    const videoCards = document.querySelectorAll(".video-card")
    videoCards.forEach((card) => {
      card.addEventListener("click", (e) => {
        if (!e.target.closest(".video-actions")) {
          const videoId = card.getAttribute("data-video-id")
          this.openVideoModal(videoId)
        }
      })
    })

    // Like buttons
    const likeButtons = document.querySelectorAll(".like-btn")
    likeButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation()
        const videoId = btn.getAttribute("data-video-id")
        this.toggleLike(videoId)
      })
    })

    // Save buttons
    const saveButtons = document.querySelectorAll(".save-btn")
    saveButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation()
        const videoId = btn.getAttribute("data-video-id")
        this.toggleSave(videoId)
      })
    })
  }

  openVideoModal(videoId) {
    const video = this.videos.find((v) => v.id === videoId)
    if (!video) return

    this.currentVideoId = videoId

    // Update modal content
    document.getElementById("modalTitle").textContent = video.title
    document.getElementById("modalChannel").textContent = video.channel
    document.getElementById("modalViews").textContent = video.views + " views"
    document.getElementById("modalDate").textContent = video.uploadDate
    document.getElementById("modalViewCount").textContent = video.views
    document.getElementById("modalLikes").textContent = video.likes
    document.getElementById("modalDuration").textContent = video.duration
    document.getElementById("modalDescription").textContent = video.description

    // Update tags
    const tagsContainer = document.getElementById("modalTags")
    tagsContainer.innerHTML = video.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")

    // Setup video player
    const videoPlayer = document.getElementById("videoPlayer")
    videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&fs=1`

    // Update action buttons
    this.updateModalButtons(videoId)

    // Show modal
    const videoModal = document.getElementById("videoModal")
    videoModal.classList.add("active")
    document.body.style.overflow = "hidden"

    this.showToast("Video loaded successfully!", "success")
  }

  updateModalButtons(videoId) {
    const isSaved = this.savedVideos.some((v) => v.id === videoId)
    const isLiked = this.likedVideos.some((v) => v.id === videoId)

    const likeBtn = document.getElementById("likeBtn")
    const saveBtn = document.getElementById("saveBtn")

    likeBtn.innerHTML = `<i class="fas fa-thumbs-up"></i><span>${isLiked ? "Liked" : "Like"}</span>`
    likeBtn.className = `action-btn like-btn ${isLiked ? "liked" : ""}`
    likeBtn.onclick = () => this.toggleLike(videoId)

    saveBtn.innerHTML = `<i class="fas fa-bookmark"></i><span>${isSaved ? "Saved" : "Save"}</span>`
    saveBtn.className = `action-btn save-btn ${isSaved ? "saved" : ""}`
    saveBtn.onclick = () => this.toggleSave(videoId)

    const shareBtn = document.getElementById("shareBtn")
    shareBtn.onclick = () => this.shareVideo(videoId)

    const downloadBtn = document.getElementById("downloadBtn")
    downloadBtn.onclick = () => this.addToWatchLater(videoId)
  }

  closeModal() {
    const videoModal = document.getElementById("videoModal")
    videoModal.classList.remove("active")
    document.body.style.overflow = "auto"

    // Stop video
    const videoPlayer = document.getElementById("videoPlayer")
    videoPlayer.src = ""

    this.currentVideoId = null
  }

  minimizePlayer() {
    if (!this.currentVideoId) return

    const videoModal = document.getElementById("videoModal")
    const miniPlayer = document.getElementById("miniPlayer")
    const miniVideoPlayer = document.getElementById("miniVideoPlayer")

    // Move video to mini player
    miniVideoPlayer.src = `https://www.youtube.com/embed/${this.currentVideoId}?autoplay=1&rel=0&modestbranding=1`

    videoModal.classList.remove("active")
    miniPlayer.classList.add("active")
    document.body.style.overflow = "auto"

    this.isMinimized = true
    this.showToast("Video minimized to mini player", "info")
  }

  expandMiniPlayer() {
    if (!this.currentVideoId) return

    this.openVideoModal(this.currentVideoId)
    this.closeMiniPlayer()
  }

  closeMiniPlayer() {
    const miniPlayer = document.getElementById("miniPlayer")
    const miniVideoPlayer = document.getElementById("miniVideoPlayer")

    miniPlayer.classList.remove("active")
    miniVideoPlayer.src = ""
    this.isMinimized = false
    this.currentVideoId = null
  }

  toggleFullscreen() {
    const videoPlayer = document.getElementById("videoPlayer")

    if (videoPlayer.requestFullscreen) {
      videoPlayer.requestFullscreen()
    } else if (videoPlayer.webkitRequestFullscreen) {
      videoPlayer.webkitRequestFullscreen()
    } else if (videoPlayer.msRequestFullscreen) {
      videoPlayer.msRequestFullscreen()
    }

    this.showToast("Fullscreen mode activated", "info")
  }

  toggleLike(videoId) {
    const video = this.videos.find((v) => v.id === videoId)
    if (!video) return

    const existingIndex = this.likedVideos.findIndex((v) => v.id === videoId)

    if (existingIndex > -1) {
      this.likedVideos.splice(existingIndex, 1)
      this.showToast("Removed from liked videos", "info")
    } else {
      this.likedVideos.push({
        ...video,
        likedAt: new Date().toISOString(),
      })
      this.showToast("Added to liked videos!", "success")
    }

    localStorage.setItem("likedVideos", JSON.stringify(this.likedVideos))
    this.renderVideos()

    if (this.currentVideoId === videoId) {
      this.updateModalButtons(videoId)
    }
  }

  toggleSave(videoId) {
    const video = this.videos.find((v) => v.id === videoId)
    if (!video) return

    const existingIndex = this.savedVideos.findIndex((v) => v.id === videoId)

    if (existingIndex > -1) {
      this.savedVideos.splice(existingIndex, 1)
      this.showToast("Removed from saved videos", "info")
    } else {
      this.savedVideos.push({
        ...video,
        savedAt: new Date().toISOString(),
        progress: 0,
        status: "saved",
      })
      this.showToast("Video saved successfully!", "success")
    }

    localStorage.setItem("savedVideos", JSON.stringify(this.savedVideos))
    this.renderVideos()
    this.updateStats()

    if (this.currentVideoId === videoId) {
      this.updateModalButtons(videoId)
    }
  }

  shareVideo(videoId) {
    const video = this.videos.find((v) => v.id === videoId)
    const shareUrl = `https://youtu.be/${videoId}`
    const shareText = `Check out this amazing coding tutorial: ${video.title}`

    if (navigator.share) {
      navigator
        .share({
          title: video.title,
          text: shareText,
          url: shareUrl,
        })
        .then(() => {
          this.showToast("Video shared successfully!", "success")
        })
        .catch(() => {
          this.copyToClipboard(shareUrl)
        })
    } else {
      this.copyToClipboard(shareUrl)
    }
  }

  addToWatchLater(videoId) {
    const video = this.videos.find((v) => v.id === videoId)
    const watchLater = JSON.parse(localStorage.getItem("watchLater")) || []

    if (!watchLater.some((v) => v.id === videoId)) {
      watchLater.push({
        ...video,
        addedAt: new Date().toISOString(),
      })
      localStorage.setItem("watchLater", JSON.stringify(watchLater))
      this.showToast("Added to Watch Later!", "success")
    } else {
      this.showToast("Already in Watch Later", "warning")
    }
  }

  copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        this.showToast("Link copied to clipboard!", "success")
      })
      .catch(() => {
        // Fallback
        const textArea = document.createElement("textarea")
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
        this.showToast("Link copied to clipboard!", "success")
      })
  }

  handleSearch(e) {
    const query = e.target.value.toLowerCase().trim()

    if (query === "") {
      this.filteredVideos = [...this.videos]
    } else {
      this.filteredVideos = this.videos.filter(
        (video) =>
          video.title.toLowerCase().includes(query) ||
          video.description.toLowerCase().includes(query) ||
          video.channel.toLowerCase().includes(query) ||
          video.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    this.currentPage = 1
    this.applyFiltersAndSort()
    this.renderVideos()
    this.updateResultsCount()
  }

  handleSearchClick() {
    const searchInput = document.getElementById("searchInput")
    const heroSearch = document.getElementById("heroSearch")
    const query = searchInput.value || heroSearch.value

    if (query.trim()) {
      // Redirect to YouTube search
      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, "_blank")
      this.showToast("Redirecting to YouTube search...", "info")
    }
  }

  showSearchSuggestions() {
    const suggestions = document.getElementById("searchSuggestions")
    suggestions.classList.add("show")
  }

  hideSearchSuggestions(e) {
    const suggestions = document.getElementById("searchSuggestions")
    const heroSearch = document.getElementById("heroSearch")

    if (!e.target.closest(".hero-search")) {
      suggestions.classList.remove("show")
    }
  }

  handleSuggestionClick(e) {
    const query = e.target.getAttribute("data-query")
    const heroSearch = document.getElementById("heroSearch")
    const searchInput = document.getElementById("searchInput")

    heroSearch.value = query
    searchInput.value = query

    this.handleSearch({ target: { value: query } })
    this.hideSearchSuggestions({ target: document.body })
  }

  handleFilterChange(e) {
    const filterTabs = document.querySelectorAll(".filter-tab")
    filterTabs.forEach((tab) => tab.classList.remove("active"))
    e.target.classList.add("active")

    this.currentCategory = e.target.getAttribute("data-category")
    this.currentPage = 1
    this.applyFiltersAndSort()
    this.renderVideos()
    this.updateResultsCount()
  }

  handleSortChange(e) {
    this.currentSort = e.target.value
    this.applyFiltersAndSort()
    this.renderVideos()
  }

  handleViewChange(e) {
    const viewBtns = document.querySelectorAll(".view-btn")
    viewBtns.forEach((btn) => btn.classList.remove("active"))
    e.target.classList.add("active")

    const view = e.target.getAttribute("data-view")
    const videosGrid = document.getElementById("videosGrid")

    if (view === "list") {
      videosGrid.classList.add("list-view")
    } else {
      videosGrid.classList.remove("list-view")
    }
  }

  applyFiltersAndSort() {
    let filtered = [...this.filteredVideos]

    // Apply category filter
    if (this.currentCategory !== "all") {
      filtered = filtered.filter((video) => video.category === this.currentCategory)
    }

    // Apply sorting
    switch (this.currentSort) {
      case "date":
        filtered.sort((a, b) => this.parseDays(a.uploadDate) - this.parseDays(b.uploadDate))
        break
      case "viewCount":
        filtered.sort((a, b) => this.parseViews(b.views) - this.parseViews(a.views))
        break
      case "rating":
        filtered.sort((a, b) => this.parseViews(b.likes) - this.parseViews(a.likes))
        break
      case "duration":
        filtered.sort((a, b) => this.parseDuration(a.duration) - this.parseDuration(b.duration))
        break
      default: // relevance
        // Keep original order for relevance
        break
    }

    this.filteredVideos = filtered
  }

  refreshVideos() {
    this.showLoading(true)

    // Simulate refresh
    setTimeout(() => {
      this.filteredVideos = [...this.videos]
      this.currentPage = 1
      this.applyFiltersAndSort()
      this.renderVideos()
      this.updateResultsCount()
      this.showLoading(false)
      this.showToast("Videos refreshed!", "success")
    }, 1000)
  }

  loadMoreVideos() {
    if (this.isLoading) return

    this.isLoading = true
    const loadMoreBtn = document.getElementById("loadMoreBtn")
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...'
    loadMoreBtn.disabled = true

    setTimeout(() => {
      this.currentPage++
      this.renderVideos()
      this.updateLoadMoreButton()

      this.isLoading = false
      loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Videos'
      loadMoreBtn.disabled = false

      this.showToast("More videos loaded!", "success")
    }, 1000)
  }

  updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById("loadMoreBtn")
    const totalShown = this.currentPage * this.videosPerPage
    const hasMore = totalShown < this.filteredVideos.length

    if (hasMore) {
      loadMoreBtn.style.display = "inline-flex"
      const remaining = this.filteredVideos.length - totalShown
      loadMoreBtn.innerHTML = `<i class="fas fa-plus"></i> Load More Videos (${remaining} remaining)`
    } else {
      loadMoreBtn.style.display = "none"
    }
  }

  updateResultsCount() {
    const resultsCount = document.getElementById("resultsCount")
    const totalShown = Math.min(this.currentPage * this.videosPerPage, this.filteredVideos.length)
    resultsCount.textContent = `Showing 1-${totalShown} of ${this.filteredVideos.length} videos`
  }

  updateStats() {
    const totalVideos = document.getElementById("totalVideos")
    const totalViews = document.getElementById("totalViews")
    const savedCount = document.getElementById("savedCount")

    totalVideos.textContent = this.videos.length + "+"

    const totalViewsNum = this.videos.reduce((sum, video) => {
      return sum + this.parseViews(video.views)
    }, 0)
    totalViews.textContent = this.formatViews(totalViewsNum)

    savedCount.textContent = this.savedVideos.length
  }

  toggleFabMenu() {
    const fabMenu = document.getElementById("fabMenu")
    fabMenu.classList.toggle("active")
  }

  playRandomVideo() {
    const randomIndex = Math.floor(Math.random() * this.videos.length)
    const randomVideo = this.videos[randomIndex]
    this.openVideoModal(randomVideo.id)
    this.toggleFabMenu()
  }

  showTrending() {
    // Sort by views and show top videos
    this.currentSort = "viewCount"
    this.currentCategory = "all"

    // Update UI
    const sortSelect = document.getElementById("sortSelect")
    sortSelect.value = "viewCount"

    const filterTabs = document.querySelectorAll(".filter-tab")
    filterTabs.forEach((tab) => tab.classList.remove("active"))
    filterTabs[0].classList.add("active")

    this.applyFiltersAndSort()
    this.renderVideos()
    this.updateResultsCount()
    this.toggleFabMenu()
    this.showToast("Showing trending videos!", "info")
  }

  handleKeyboardShortcuts(e) {
    // Escape to close modal
    if (e.key === "Escape") {
      if (document.getElementById("videoModal").classList.contains("active")) {
        this.closeModal()
      }
    }

    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault()
      document.getElementById("searchInput").focus()
    }

    // Space to play/pause (when modal is open)
    if (e.key === " " && document.getElementById("videoModal").classList.contains("active")) {
      e.preventDefault()
      // YouTube iframe doesn't allow direct control, but we can show a message
      this.showToast("Use video controls to play/pause", "info")
    }
  }

  showToast(message, type = "success") {
    const toastContainer = document.getElementById("toastContainer")
    const toastId = "toast-" + Date.now()

    const toastHTML = `
            <div class="toast ${type}" id="${toastId}">
                <i class="toast-icon fas ${this.getToastIcon(type)}"></i>
                <span class="toast-message">${message}</span>
                <button class="toast-close" onclick="this.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `

    toastContainer.insertAdjacentHTML("beforeend", toastHTML)

    const toast = document.getElementById(toastId)
    setTimeout(() => toast.classList.add("show"), 100)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (toast) {
        toast.classList.remove("show")
        setTimeout(() => toast.remove(), 300)
      }
    }, 5000)
  }

  getToastIcon(type) {
    const icons = {
      success: "fa-check",
      error: "fa-times",
      warning: "fa-exclamation-triangle",
      info: "fa-info",
    }
    return icons[type] || icons.success
  }

  // Utility functions
  debounce(func, wait) {
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

  parseViews(viewsStr) {
    const num = Number.parseFloat(viewsStr.replace(/[^\d.]/g, ""))
    if (viewsStr.includes("M")) return num * 1000000
    if (viewsStr.includes("K")) return num * 1000
    return num
  }

  formatViews(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M+"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K+"
    return num.toString()
  }

  parseDuration(durationStr) {
    const parts = durationStr.split(":")
    if (parts.length === 3) {
      return Number.parseInt(parts[0]) * 3600 + Number.parseInt(parts[1]) * 60 + Number.parseInt(parts[2])
    } else if (parts.length === 2) {
      return Number.parseInt(parts[0]) * 60 + Number.parseInt(parts[1])
    }
    return 0
  }

  parseDays(dateStr) {
    if (dateStr.includes("day")) return Number.parseInt(dateStr)
    if (dateStr.includes("week")) return Number.parseInt(dateStr) * 7
    if (dateStr.includes("month")) return Number.parseInt(dateStr) * 30
    if (dateStr.includes("year")) return Number.parseInt(dateStr) * 365
    return 0
  }
}

// Initialize the explore page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Initializing Explore Video Player...")
  window.explorePlayer = new ExploreVideoPlayer()
  console.log("✅ Explore Video Player loaded successfully!")
})

// Add scroll effect to navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .video-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.2);
  }
  
  .video-card:hover .play-overlay {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
  
  .video-card:hover img {
    transform: scale(1.05);
  }
  
  .action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  .save-btn.saved {
    background: var(--success-color) !important;
    color: white !important;
    border-color: var(--success-color) !important;
  }
  
  .video-modal.active {
    opacity: 1;
    visibility: visible;
  }
  
  .video-modal {
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  
  .toast.show {
    transform: translateX(0);
    opacity: 1;
  }
  
  .toast {
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.3s ease;
  }
`
document.head.appendChild(style)

// Call initialize function after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    // initializeSavedButtons() - This function is no longer needed
  }, 100)
})

console.log("🎯 Explore page JavaScript loaded successfully!")
console.log("🎥 Explore page JavaScript loaded successfully with", codingVideos.length, "coding videos!")
