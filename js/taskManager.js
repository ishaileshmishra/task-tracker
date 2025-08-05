// Data management for the task tracker
let tasksData = null;

// Load tasks data
async function loadTasksData() {
  try {
    const response = await fetch("data/tasks.json");
    const data = await response.json();
    tasksData = data.tasks;
    return tasksData;
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
}

// Generate HTML for tags
function generateTagsHTML(tags) {
  return tags
    .map(
      (tag) =>
        `<span class="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm mr-2 mb-2">${tag}</span>`
    )
    .join("");
}

// Generate HTML for task details
function generateDetailsHTML(details) {
  return `<ul class="list-disc list-inside space-y-1 mt-2">
        ${details
          .map((detail) => `<li class="text-sm">${detail}</li>`)
          .join("")}
    </ul>`;
}

// Generate HTML for a single task
function generateTaskHTML(task) {
  return `
        <div id="${
          task.id
        }" class="block bg-white dark:bg-gray-800 p-4 rounded shadow task-card hover:bg-blue-100 dark:hover:bg-gray-700 mb-4">
            <div class="flex justify-between items-start">
                <h3 class="text-lg font-bold">${task.title}</h3>
                <span class="px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded text-sm">
                    ${task.status}
                </span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">${
              task.category
            }</p>
            ${generateDetailsHTML(task.details)}
            <div class="mt-3">
                ${generateTagsHTML(task.tags)}
            </div>
        </div>
    `;
}

// Generate HTML for a month section
function generateMonthSectionHTML(monthData) {
  const monthName = monthData.month.split(" ")[0].toLowerCase();
  return `
        <div class="mb-10 ml-4 month-section" data-month="${monthName}">
            <div class="absolute w-4 h-4 bg-blue-600 rounded-full -left-2.5 top-2"></div>
            <time class="text-sm text-gray-500 dark:text-gray-400">${
              monthData.month
            }</time>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${
              monthData.overview
            }</p>
            <div class="mt-2 space-y-3">
                ${monthData.tasks
                  .map((task) => generateTaskHTML(task))
                  .join("")}
            </div>
        </div>
    `;
}

// Render tasks to the timeline
function renderTasks(tasks) {
  const timelineContainer = document.querySelector(".timeline-container");
  if (!timelineContainer) return;

  const tasksHTML = tasks
    .map((monthData) => generateMonthSectionHTML(monthData))
    .join("");
  timelineContainer.innerHTML = tasksHTML;
}

// Update chart with task counts
function updateChartWithTaskData(tasks) {
  const monthCounts = {};
  tasks.forEach((monthData) => {
    const month = monthData.month.split(" ")[0];
    monthCounts[month.toLowerCase()] = monthData.tasks.length;
  });

  const chart = Chart.getChart(document.getElementById("taskChart"));
  if (chart) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const data = months.map((month) => monthCounts[month.toLowerCase()] || 0);

    chart.data.datasets.forEach((dataset) => {
      dataset.data = data;
    });

    chart.update("active");
  }
}

// Initialize the dashboard
async function initializeDashboard() {
  const tasks = await loadTasksData();
  renderTasks(tasks);
  updateChartWithTaskData(tasks);
}

// Export functions for use in other files
window.taskManager = {
  loadTasksData,
  renderTasks,
  updateChartWithTaskData,
  initializeDashboard,
};
