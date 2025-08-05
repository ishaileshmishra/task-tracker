// chart.js - Handles the graphical representation of tasks in a bar chart using Chart.js

document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("taskChart");
  if (!ctx) return;

  // Set canvas height to 1/10th of default (default is 150px)
  ctx.height = 15;

  new Chart(ctx, {
    type: "line",
    data: {
      labels: [
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
      ],
      datasets: [
        {
          label: "Tasks Completed",
          data: new Array(12).fill(0),
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          borderColor: "#3b82f6",
          borderWidth: 2,
          pointBackgroundColor: ["#7c3aed", "#10b981", "#3b82f6"],
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#3b82f6",
          pointRadius: 5,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true, position: "top" },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `Tasks: ${context.raw}`;
            },
          },
        },
      },
      scales: {
        r: {
          beginAtZero: true,
          min: 0,
          max: 3,
          ticks: { stepSize: 1 },
          pointLabels: {
            font: {
              size: 14,
              weight: "bold",
            },
          },
        },
      },
    },
  });
});
