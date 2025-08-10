// Admin functionality for the task tracker

// Admin password - in a real application, this should be handled server-side
const ADMIN_PASSWORD = "admin123"; // You should change this password

// Modal handling
function showAdminLogin() {
  document.getElementById("adminLoginModal").classList.remove("hidden");
}

function closeAdminLogin() {
  document.getElementById("adminLoginModal").classList.add("hidden");
  document.getElementById("adminPassword").value = "";
}

function showAdminPanel() {
  document.getElementById("adminPanelModal").classList.remove("hidden");
}

function closeAdminPanel() {
  document.getElementById("adminPanelModal").classList.add("hidden");
}

// Admin authentication
function validateAdmin() {
  const password = document.getElementById("adminPassword").value;
  if (password === ADMIN_PASSWORD) {
    closeAdminLogin();
    showAdminPanel();
  } else {
    alert("Invalid password");
  }
}

// Handle new task submission
document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();

  try {
    const newTask = {
      month: document.getElementById("taskMonth").value,
      title: document.getElementById("taskTitle").value,
      description: document.getElementById("taskDescription").value,
      status: "Completed",
    };

    // Validate inputs
    if (!newTask.title.trim() || !newTask.description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    // In a real application, you would send this to a server
    // For now, we'll create the HTML element directly
    const monthSection = document.querySelector(
      `[data-month="${newTask.month}"]`
    );

    if (monthSection) {
      const taskContainer = monthSection.querySelector(".mt-2");
      if (!taskContainer) {
        console.error("Task container not found");
        return;
      }

      const taskHTML = createTaskHTML(newTask);
      taskContainer.insertAdjacentHTML("afterbegin", taskHTML);

      // Immediately update chart data
      setTimeout(() => {
        updateChartData();
      }, 100);

      // Clear form and close panel
      document.getElementById("taskForm").reset();
      closeAdminPanel();

      // Show success message
      alert("Task added successfully!");
    } else {
      alert("Error: Could not find the selected month section");
    }
  } catch (error) {
    console.error("Error adding task:", error);
    alert("Error adding task. Please try again.");
  }
});

// Helper function to create task HTML
function createTaskHTML(task) {
  return `
        <a href="#" class="block bg-white dark:bg-gray-800 p-4 rounded shadow task-card hover:bg-blue-100 dark:hover:bg-gray-700">
            <h3 class="text-lg font-bold">${task.title}</h3>
            <p>${task.description}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Status: ${task.status}</p>
        </a>
    `;
}

// Function to update chart data
function updateChartData() {
  const monthCounts = {
    april: 0,
    may: 0,
    july: 0,
  };

  // Count tasks for each month
  document.querySelectorAll(".month-section").forEach((section) => {
    const month = section.dataset.month;
    monthCounts[month] = section.querySelectorAll(".task-card").length;
  });

  // Update chart if it exists
  const chart = Chart.getChart(document.getElementById("taskChart"));
  if (chart) {
    const newData = [monthCounts.april, monthCounts.may, monthCounts.july];

    // Update all datasets with new data
    chart.data.datasets.forEach((dataset) => {
      dataset.data = newData;
    });

    chart.update("active"); // Using 'active' mode for smooth transitions
  }

  // Also update the chart's parent container height if needed
  const chartContainer = document.getElementById("taskChart").parentElement;
  if (chartContainer) {
    chartContainer.style.height = "auto";
  }
}
