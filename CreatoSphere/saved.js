// Saved Videos Page JavaScript
let savedVideos = []
let filteredSavedVideos = []
let currentFilter = "all"

// Initialize saved page
document.addEventListener("DOMContentLoaded", () => {
  loadSavedVideos()
  setupSavedEventListeners()
  updateSavedStats()
  checkEmptyState()
})

function loadSavedVideos() {
  // Load from localStorage
  savedVideos = JSON.parse(localStorage.getItem("savedVideos") || "[]")
  filteredSavedVideos = [...savedVideos]

  console.log("📚 Loaded", savedVideos.length, "saved videos")

  // If no saved videos, add some sample data for demo
  if (savedVideos.length === 0) {
    addSampleSavedVideos()
  }

  renderSavedVideos()
}

function addSampleSavedVideos() {
  const sampleSaved = [
    {
      id: "sample1",
      title: "JavaScript Full Course for Beginners",
      channel: "Programming with Mosh",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "3:45:20",
      views: "2.5M",
      likes: "45K",
      category: "javascript",
      description: "Complete JavaScript tutorial for beginners.",
      tags: ["javascript", "programming", "beginner"],
      savedDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      watchProgress: 65,
      status: "watching",
      isFavorite: true,
    },
    {
      id: "sample2",
      title: "React Hooks Deep Dive",
      channel: "Academind",
      thumbnail: "https://img.youtube.com/vi/w7ejDZ8SWv8/maxresdefault.jpg",
      duration: "1:45:30",
      views: "1.5M",
      likes: "32K",
      category: "react",
      description: "Master React Hooks: useState, useEffect, useContext.",
      tags: ["react", "hooks", "frontend"],
      savedDate: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      watchProgress: 100,
      status: "completed",
      isFavorite: false,
    },
    {
      id: "sample3",
      title: "Node.js Complete Course",
      channel: "The Net Ninja",
      thumbnail: "https://img.youtube.com/vi/RLtyhwFtXQA/maxresdefault.jpg",
      duration: "5:30:45",
      views: "2.8M",
      likes: "48K",
      category: "nodejs",
      description: "Complete Node.js course covering Express, MongoDB.",
      tags: ["nodejs", "backend", "express"],
      savedDate: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      watchProgress: 25,
      status: "watching",
      isFavorite: true,
    },
    {
      id: "sample4",
      title: "Python Data Science Tutorial",
      channel: "freeCodeCamp",
      thumbnail: "https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg",
      duration: "4:45:30",
      views: "2.3M",
      likes: "45K",
      category: "python",
      description: "Learn data science with Python: NumPy, Pandas, Matplotlib.",
      tags: ["python", "data-science", "pandas"],
      savedDate: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
      watchProgress: 0,
      status: "saved",
      isFavorite: false,
    },
  ]

  savedVideos = sampleSaved
  filteredSavedVideos = [...savedVideos]
  localStorage.setItem("savedVideos", JSON.stringify(savedVideos))
}

function setupSavedEventListeners() {
  // Filter tabs
  const filterTabs = document.querySelectorAll(".filter-tab")
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", handleFilterChange)
  })

  // Select all button
  const selectAllBtn = document.getElementById("selectAllBtn")
  if (selectAllBtn) {
    selectAllBtn.addEventListener("click", handleSelectAll)
  }

  // Delete selected button
  const deleteSelectedBtn = document.getElementById("deleteSelectedBtn")
  if (deleteSelectedBtn) {
    deleteSelectedBtn.addEventListener("click", handleDeleteSelected)
  }
}

function handleFilterChange(e) {
  const filter = e.target.getAttribute("data-filter")

  // Update active tab
  document.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.classList.remove("active")
  })
  e.target.classList.add("active")

  // Filter videos
  currentFilter = filter
  applyFilter(filter)
  renderSavedVideos()
  updateSavedStats()
}

function applyFilter(filter) {
  switch (filter) {
    case "all":
      filteredSavedVideos = [...savedVideos]
      break
    case "watching":
      filteredSavedVideos = savedVideos.filter((video) => video.status === "watching")
      break
    case "completed":
      filteredSavedVideos = savedVideos.filter((video) => video.status === "completed")
      break
    case "favorites":
      filteredSavedVideos = savedVideos.filter((video) => video.isFavorite)
      break
    default:
      filteredSavedVideos = [...savedVideos]
  }
}

function renderSavedVideos() {
  const savedVideosGrid = document.getElementById("savedVideosGrid")
  const emptyState = document.getElementById("emptyState")

  if (!savedVideosGrid) return

  if (filteredSavedVideos.length === 0) {
    savedVideosGrid.style.display = "none"
    if (emptyState) emptyState.style.display = "block"
    return
  }

  savedVideosGrid.style.display = "grid"
  if (emptyState) emptyState.style.display = "none"

  savedVideosGrid.innerHTML = ""

  filteredSavedVideos.forEach((video, index) => {
    const videoCard = createSavedVideoCard(video, index)
    savedVideosGrid.appendChild(videoCard)
  })
}

function createSavedVideoCard(video, index) {
  const card = document.createElement("div")
  card.className = "saved-video-card"
  card.setAttribute("data-video-id", video.id)

  card.style.cssText = `
    background: var(--bg-card);
    backdrop-filter: blur(20px);
    border: 1px solid var(--border-color);
    border-radius: 15px;
    overflow: hidden;
    transition: all 0.3s ease;
    position: relative;
    opacity: 0;
    transform: translateY(30px);
    animation: slideInUp 0.5s ease forwards;
    animation-delay: ${index * 0.1}s;
  `

  const statusColors = {
    saved: "var(--warning-color)",
    watching: "var(--primary-color)",
    completed: "var(--success-color)",
  }

  const statusIcons = {
    saved: "fas fa-bookmark",
    watching: "fas fa-play-circle",
    completed: "fas fa-check-circle",
  }

  card.innerHTML = `
    <div class="video-header" style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
    ">
      <div class="video-status" style="
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: ${statusColors[video.status]};
        font-size: 0.9rem;
        font-weight: 500;
      ">
        <i class="${statusIcons[video.status]}"></i>
        <span>${video.status.charAt(0).toUpperCase() + video.status.slice(1)}</span>
      </div>
      <div class="video-actions" style="display: flex; gap: 0.5rem;">
        <button class="action-btn favorite-btn ${video.isFavorite ? "active" : ""}" 
                data-video-id="${video.id}"
                style="
                  width: 35px;
                  height: 35px;
                  border: none;
                  border-radius: 50%;
                  background: ${video.isFavorite ? "var(--accent-color)" : "rgba(255,255,255,0.1)"};
                  color: white;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                ">
          <i class="fas fa-heart"></i>
        </button>
        <button class="action-btn delete-btn" 
                data-video-id="${video.id}"
                style="
                  width: 35px;
                  height: 35px;
                  border: none;
                  border-radius: 50%;
                  background: rgba(255, 68, 68, 0.2);
                  color: var(--error-color);
                  cursor: pointer;
                  transition: all 0.3s ease;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                ">
          <i class="fas fa-trash"></i>
        </button>
        <input type="checkbox" class="video-checkbox" 
               data-video-id="${video.id}"
               style="
                 width: 20px;
                 height: 20px;
                 cursor: pointer;
                 accent-color: var(--primary-color);
               ">
      </div>
    </div>
    
    <div class="video-content" style="display: flex; cursor: pointer;" onclick="playVideo('${video.id}')">
      <div class="video-thumbnail" style="
        position: relative;
        width: 200px;
        flex-shrink: 0;
      ">
        <img src="${video.thumbnail}" alt="${video.title}" style="
          width: 100%;
          height: 120px;
          object-fit: cover;
        ">
        <div class="play-overlay" style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          background: rgba(0, 212, 255, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
        ">
          <i class="fas fa-play" style="color: white; font-size: 0.9rem; margin-left: 2px;"></i>
        </div>
        <div class="video-duration" style="
          position: absolute;
          bottom: 5px;
          right: 5px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 0.7rem;
        ">${video.duration}</div>
        ${
          video.watchProgress > 0
            ? `
          <div class="progress-bar" style="
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(0, 0, 0, 0.5);
          ">
            <div class="progress-fill" style="
              width: ${video.watchProgress}%;
              height: 100%;
              background: var(--primary-color);
            "></div>
          </div>
        `
            : ""
        }
      </div>
      
      <div class="video-info" style="
        flex: 1;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      ">
        <div>
          <h3 style="
            color: var(--text-primary);
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          ">${video.title}</h3>
          <p style="
            color: var(--primary-color);
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
            font-weight: 500;
          ">${video.channel}</p>
          <p style="
            color: var(--text-secondary);
            font-size: 0.8rem;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          ">${video.description}</p>
        </div>
        
        <div class="video-meta" style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          font-size: 0.8rem;
          color: var(--text-muted);
        ">
          <div style="display: flex; gap: 1rem;">
            <span><i class="fas fa-eye"></i> ${video.views}</span>
            <span><i class="fas fa-thumbs-up"></i> ${video.likes}</span>
          </div>
          <span>Saved ${formatDate(video.savedDate)}</span>
        </div>
        
        ${
          video.watchProgress > 0
            ? `
          <div class="watch-progress" style="
            margin-top: 0.5rem;
            font-size: 0.8rem;
            color: var(--primary-color);
          ">
            <i class="fas fa-play-circle"></i>
            ${video.watchProgress}% watched
          </div>
        `
            : ""
        }
      </div>
    </div>
  `

  // Add hover effects
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px)"
    this.style.boxShadow = "0 10px 30px rgba(0, 212, 255, 0.2)"

    const playOverlay = this.querySelector(".play-overlay")
    if (playOverlay) playOverlay.style.opacity = "1"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = ""
    this.style.boxShadow = ""

    const playOverlay = this.querySelector(".play-overlay")
    if (playOverlay) playOverlay.style.opacity = "0"
  })

  // Add event listeners
  const favoriteBtn = card.querySelector(".favorite-btn")
  favoriteBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    toggleFavorite(video.id)
  })

  const deleteBtn = card.querySelector(".delete-btn")
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    deleteVideo(video.id)
  })

  return card
}

function playVideo(videoId) {
  const video = savedVideos.find((v) => v.id === videoId)
  if (!video) return

  console.log("Playing video:", video.title)

  // Create video player modal
  const modal = document.createElement("div")
  modal.className = "video-modal"
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
  `

  modal.innerHTML = `
    <div class="video-player-container" style="
      background: var(--bg-card);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 2rem;
      max-width: 800px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
    ">
      <div class="video-header" style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
      ">
        <h3 style="color: var(--text-primary); margin: 0;">${video.title}</h3>
        <button class="close-btn" onclick="this.closest('.video-modal').remove()" style="
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s ease;
        ">
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
        margin-bottom: 1.5rem;
        position: relative;
        overflow: hidden;
      ">
        <img src="${video.thumbnail}" alt="${video.title}" style="
          width: 100%;
          height: 100%;
          object-fit: cover;
        ">
        <div class="play-button" style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: rgba(0, 212, 255, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        " onclick="startWatching('${videoId}')">
          <i class="fas fa-play" style="color: white; font-size: 2rem; margin-left: 5px;"></i>
        </div>
        
        ${
          video.watchProgress > 0
            ? `
          <div class="video-progress" style="
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
          ">
            <div style="
              width: ${video.watchProgress}%;
              height: 100%;
              background: var(--primary-color);
            "></div>
          </div>
        `
            : ""
        }
      </div>
      
      <div class="video-details" style="
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
      ">
        <div>
          <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Channel</h4>
          <p style="color: var(--primary-color); margin-bottom: 1rem;">${video.channel}</p>
          
          <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Description</h4>
          <p style="color: var(--text-secondary); line-height: 1.6;">${video.description}</p>
        </div>
        
        <div>
          <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Stats</h4>
          <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
            <span style="color: var(--text-secondary);"><i class="fas fa-eye"></i> ${video.views} views</span>
            <span style="color: var(--text-secondary);"><i class="fas fa-thumbs-up"></i> ${video.likes} likes</span>
            <span style="color: var(--text-secondary);"><i class="fas fa-clock"></i> ${video.duration}</span>
            <span style="color: var(--text-secondary);"><i class="fas fa-bookmark"></i> Saved ${formatDate(video.savedDate)}</span>
          </div>
          
          <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Tags</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${video.tags
              .map(
                (tag) => `
              <span style="
                background: rgba(0, 212, 255, 0.1);
                color: var(--primary-color);
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 0.8rem;
                border: 1px solid rgba(0, 212, 255, 0.3);
              ">${tag}</span>
            `,
              )
              .join("")}
          </div>
        </div>
      </div>
      
      <div class="video-actions" style="
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--border-color);
      ">
        <button class="btn-primary" onclick="startWatching('${videoId}')">
          <i class="fas fa-play"></i>
          ${video.watchProgress > 0 ? "Continue Watching" : "Start Watching"}
        </button>
        <button class="btn-secondary" onclick="toggleFavorite('${videoId}'); this.innerHTML='<i class=\\'fas fa-heart\\'></i> ${video.isFavorite ? "Remove from" : "Add to"} Favorites'">
          <i class="fas fa-heart"></i>
          ${video.isFavorite ? "Remove from" : "Add to"} Favorites
        </button>
      </div>
    </div>
  `

  document.body.appendChild(modal)

  setTimeout(() => {
    modal.style.opacity = "1"
  }, 10)

  // Close on overlay click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove()
    }
  })
}

function startWatching(videoId) {
  const video = savedVideos.find((v) => v.id === videoId)
  if (!video) return

  // Update video status
  video.status = "watching"
  if (video.watchProgress === 0) {
    video.watchProgress = 1
  }

  // Save to localStorage
  localStorage.setItem("savedVideos", JSON.stringify(savedVideos))

  // Close modal and refresh
  document.querySelector(".video-modal")?.remove()
  loadSavedVideos()

  showToast("Started watching: " + video.title, "success")
}

function toggleFavorite(videoId) {
  const video = savedVideos.find((v) => v.id === videoId)
  if (!video) return

  video.isFavorite = !video.isFavorite
  localStorage.setItem("savedVideos", JSON.stringify(savedVideos))

  // Update UI
  const favoriteBtn = document.querySelector(`[data-video-id="${videoId}"].favorite-btn`)
  if (favoriteBtn) {
    if (video.isFavorite) {
      favoriteBtn.classList.add("active")
      favoriteBtn.style.background = "var(--accent-color)"
    } else {
      favoriteBtn.classList.remove("active")
      favoriteBtn.style.background = "rgba(255,255,255,0.1)"
    }
  }

  showToast(video.isFavorite ? "Added to favorites" : "Removed from favorites", "success")

  // Refresh if currently showing favorites
  if (currentFilter === "favorites") {
    applyFilter("favorites")
    renderSavedVideos()
  }

  updateSavedStats()
}

function deleteVideo(videoId) {
  const video = savedVideos.find((v) => v.id === videoId)
  if (!video) return

  if (confirm(`Are you sure you want to remove "${video.title}" from saved videos?`)) {
    savedVideos = savedVideos.filter((v) => v.id !== videoId)
    localStorage.setItem("savedVideos", JSON.stringify(savedVideos))

    // Remove from filtered list
    filteredSavedVideos = filteredSavedVideos.filter((v) => v.id !== videoId)

    // Animate removal
    const videoCard = document.querySelector(`[data-video-id="${videoId}"]`)
    if (videoCard) {
      videoCard.style.transform = "translateX(-100%)"
      videoCard.style.opacity = "0"

      setTimeout(() => {
        renderSavedVideos()
        updateSavedStats()
        checkEmptyState()
      }, 300)
    }

    showToast("Video removed from saved list", "success")
  }
}

function handleSelectAll() {
  const checkboxes = document.querySelectorAll(".video-checkbox")
  const selectAllBtn = document.getElementById("selectAllBtn")
  const allChecked = Array.from(checkboxes).every((cb) => cb.checked)

  checkboxes.forEach((checkbox) => {
    checkbox.checked = !allChecked
  })

  if (allChecked) {
    selectAllBtn.innerHTML = '<i class="fas fa-check-square"></i> Select All'
  } else {
    selectAllBtn.innerHTML = '<i class="fas fa-square"></i> Deselect All'
  }

  updateDeleteButton()
}

function handleDeleteSelected() {
  const selectedCheckboxes = document.querySelectorAll(".video-checkbox:checked")
  const selectedIds = Array.from(selectedCheckboxes).map((cb) => cb.getAttribute("data-video-id"))

  if (selectedIds.length === 0) {
    showToast("No videos selected", "warning")
    return
  }

  if (confirm(`Are you sure you want to remove ${selectedIds.length} selected video(s)?`)) {
    selectedIds.forEach((id) => {
      savedVideos = savedVideos.filter((v) => v.id !== id)
      filteredSavedVideos = filteredSavedVideos.filter((v) => v.id !== id)
    })

    localStorage.setItem("savedVideos", JSON.stringify(savedVideos))
    renderSavedVideos()
    updateSavedStats()
    checkEmptyState()

    showToast(`${selectedIds.length} video(s) removed`, "success")
  }
}

function updateDeleteButton() {
  const selectedCount = document.querySelectorAll(".video-checkbox:checked").length
  const deleteBtn = document.getElementById("deleteSelectedBtn")

  if (deleteBtn) {
    if (selectedCount > 0) {
      deleteBtn.style.opacity = "1"
      deleteBtn.style.pointerEvents = "auto"
      deleteBtn.innerHTML = `<i class="fas fa-trash"></i> Delete Selected (${selectedCount})`
    } else {
      deleteBtn.style.opacity = "0.5"
      deleteBtn.style.pointerEvents = "none"
      deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Delete Selected'
    }
  }
}

function updateSavedStats() {
  const savedCount = document.getElementById("savedCount")
  const watchTime = document.getElementById("watchTime")
  const completedCount = document.getElementById("completedCount")

  if (savedCount) savedCount.textContent = savedVideos.length

  if (watchTime) {
    const totalMinutes = savedVideos.reduce((total, video) => {
      const duration = parseDuration(video.duration)
      return total + Math.floor(duration / 60)
    }, 0)
    watchTime.textContent = Math.floor(totalMinutes / 60)
  }

  if (completedCount) {
    const completed = savedVideos.filter((v) => v.status === "completed").length
    completedCount.textContent = completed
  }
}

function checkEmptyState() {
  const emptyState = document.getElementById("emptyState")
  const savedVideosGrid = document.getElementById("savedVideosGrid")

  if (filteredSavedVideos.length === 0) {
    if (emptyState) emptyState.style.display = "block"
    if (savedVideosGrid) savedVideosGrid.style.display = "none"
  } else {
    if (emptyState) emptyState.style.display = "none"
    if (savedVideosGrid) savedVideosGrid.style.display = "grid"
  }
}

function parseDuration(duration) {
  const parts = duration.split(":").map(Number)
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2]
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1]
  }
  return 0
}

function formatDate(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return "yesterday"
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return date.toLocaleDateString()
}

function showToast(message, type = "info") {
  const toast = document.createElement("div")
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

// Add event listener for checkboxes
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("video-checkbox")) {
    updateDeleteButton()
  }
})

// Add slide in animation
const slideInStyle = document.createElement("style")
slideInStyle.textContent = `
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
  
  .saved-videos-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  @media (min-width: 768px) {
    .saved-videos-grid {
      grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
    }
  }
`
document.head.appendChild(slideInStyle)

console.log("💾 Saved videos page JavaScript loaded successfully!")
