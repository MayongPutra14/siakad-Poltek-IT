export const initDashboard = async () => {
  try {
    const response = await fetch("http://localhost:5000/mahasiswa/dashboard", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (response.status === 401) {
      // IF SESSION FINISH OR INVALID

      window.location.href = "/login.html";
      return;
    }

    const result = await response.json();
    if (result.status === "Success") {
      const dataMahasiswa = result.data;
      // Lakukan DOM Manipulation di sini
        console.log("Data Mahasiswa Berhasil Dimuat:", result.data);
        renderDataToUI(dataMahasiswa);
    }
  } catch (error) {
    console.error(`Gagal mengambil data dashboard: ${error}`);
  }
};
// function rendering data to user
function renderDataToUI(data) {
  // RENDERING THE DATA
  document.getElementById("student-name").textContent = dataMahasiswa.nama;
  document.getElementById("student-nim").textContent = dataMahasiswa.nim;
  document.getElementById("student-major").textContent =
    dataMahasiswa.program_studi;
  document.getElementById("stundent-status").textContent =
    dataMahasiswa.status_akademik;
}

// RUN FUNCTION
initDashboard();
