document.addEventListener("DOMContentLoaded", () => {

    /* ================= DOM ================= */
    const taskModal = document.getElementById("taskModal");
    const noteModal = document.getElementById("noteModal");

    const addTaskBtn = document.getElementById("addTaskBtn");
    const addNewTask = document.getElementById("addNewTask");
    const closeTaskModal = document.getElementById("closeTaskModal");
    const cancelTask = document.getElementById("cancelTask");

    const addNoteBtn = document.getElementById("addNoteBtn");
    const addNewNote = document.getElementById("addNewNote");
    const closeNoteModal = document.getElementById("closeNoteModal");
    const cancelNote = document.getElementById("cancelNote");

    const taskForm = document.getElementById("taskForm");
    const noteForm = document.getElementById("noteForm");

    const todoList = document.getElementById("todoList");
    const notesGrid = document.getElementById("notesGrid");

    /* ================= DATE ================= */
    document.getElementById("currentDate").innerText =
        new Date().toDateString();

    /* ================= MODAL CONTROLS ================= */
    function openModal(modal) {
        modal.style.display = "flex";
    }

    function closeModal(modal) {
        modal.style.display = "none";
    }

    addTaskBtn.onclick = () => openModal(taskModal);
    addNewTask.onclick = () => openModal(taskModal);
    closeTaskModal.onclick = () => closeModal(taskModal);
    cancelTask.onclick = () => closeModal(taskModal);

    addNoteBtn.onclick = () => openModal(noteModal);
    addNewNote.onclick = () => openModal(noteModal);
    closeNoteModal.onclick = () => closeModal(noteModal);
    cancelNote.onclick = () => closeModal(noteModal);

    /* ================= STORAGE ================= */
    const Storage = {
        getTasks: () => JSON.parse(localStorage.getItem("cs_tasks")) || [],
        saveTasks: data => localStorage.setItem("cs_tasks", JSON.stringify(data)),
        getNotes: () => JSON.parse(localStorage.getItem("cs_notes")) || [],
        saveNotes: data => localStorage.setItem("cs_notes", JSON.stringify(data))
    };

    /* ================= ADD TASK ================= */
    taskForm.addEventListener("submit", e => {
        e.preventDefault();

        const task = {
            id: Date.now(),
            title: taskTitle.value,
            desc: taskDescription.value,
            time: taskSchedule.value,
            done: false
        };

        const tasks = Storage.getTasks();
        tasks.push(task);
        Storage.saveTasks(tasks);

        taskForm.reset();
        closeModal(taskModal);
        renderTasks();
        scheduleReminder(task);
    });

    /* ================= RENDER TASK ================= */
    function renderTasks() {
        todoList.innerHTML = "";

        Storage.getTasks().forEach(task => {
            const div = document.createElement("div");
            div.className = `note-card ${task.done ? "task-done" : ""}`;
            div.innerHTML = `
                <div class="card-actions">
                    <i class="fas fa-check" data-id="${task.id}"></i>
                    <i class="fas fa-trash" data-id="${task.id}"></i>
                </div>
                <h4>${task.title}</h4>
                <small>${task.time ? new Date(task.time).toLocaleString() : "No reminder"}</small>
                <p>${task.desc || ""}</p>
            `;
            todoList.appendChild(div);
        });
    }

    /* ================= TASK ACTIONS ================= */
    todoList.addEventListener("click", e => {
        const id = Number(e.target.dataset.id);
        if (!id) return;

        let tasks = Storage.getTasks();

        if (e.target.classList.contains("fa-check")) {
            tasks = tasks.map(t =>
                t.id === id ? { ...t, done: !t.done } : t
            );
        }

        if (e.target.classList.contains("fa-trash")) {
            tasks = tasks.filter(t => t.id !== id);
        }

        Storage.saveTasks(tasks);
        renderTasks();
    });

    /* ================= ADD NOTE ================= */
    noteForm.addEventListener("submit", e => {
        e.preventDefault();

        const note = {
            id: Date.now(),
            title: noteTitle.value,
            category: noteCategory.value,
            content: noteContent.value,
            created: new Date().toLocaleString()
        };

        const notes = Storage.getNotes();
        notes.unshift(note);
        Storage.saveNotes(notes);

        noteForm.reset();
        closeModal(noteModal);
        renderNotes();
    });

    /* ================= RENDER NOTES ================= */
    function renderNotes() {
        notesGrid.innerHTML = "";

        Storage.getNotes().forEach(note => {
            const div = document.createElement("div");
            div.className = "note-card";
            div.innerHTML = `
                <div class="card-actions">
                    <i class="fas fa-trash" data-id="${note.id}"></i>
                </div>
                <h4>${note.title}</h4>
                <small>${note.category} • ${note.created}</small>
                <p>${note.content}</p>
            `;
            notesGrid.appendChild(div);
        });
    }

    /* ================= NOTE DELETE ================= */
    notesGrid.addEventListener("click", e => {
        const id = Number(e.target.dataset.id);
        if (!id) return;

        let notes = Storage.getNotes();
        notes = notes.filter(n => n.id !== id);
        Storage.saveNotes(notes);
        renderNotes();
    });

    /* ================= REMINDER ================= */
    function scheduleReminder(task) {
        if (!task.time) return;

        const time = new Date(task.time).getTime();
        const interval = setInterval(() => {
            if (Date.now() >= time && !task.done) {
                alert(`🤖 Reminder:\n${task.title}`);
                clearInterval(interval);
            }
        }, 30000);
    }

    /* ================= INIT ================= */
    renderTasks();
    renderNotes();

});
