const ipkData = {
  semesters: [
    "Semester 1",
    "Semester 2",
    "Semester 3",
    "Semester 4",
    "Semester 5",
    "Semester 6",
  ],
  values: [3.2, 3.35, 3.8, 3.62, 3.5, 3.6],
};

const ctx = document.getElementById("ipkChart").getContext("2d");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ipkData.semesters,
    datasets: [
      {
        label: "IPK",
        data: ipkData.values,
        backgroundColor: "#66adff",
        borderRadius: 6,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 4,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});
