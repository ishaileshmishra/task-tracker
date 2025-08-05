// chart.js - Handles the graphical representation of tasks in a bar chart using Chart.js

document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("taskChart");
  if (!ctx) return;
  // Set canvas height to 1/10th of default (default is 150px)
  ctx.height = 15;
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["April", "May", "July"],
      datasets: [
        {
          label: "Tasks Completed",
          data: [2, 2, 2],
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: ["#7c3aed", "#10b981", "#3b82f6"],
          pointRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      elements: {
        line: { borderWidth: 3 },
        point: { borderWidth: 2 },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 },
        },
      },
    },
  });
});
