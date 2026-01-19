// GET DATA MENU-DASHBOARD
export const initDashboard = async () => {
  try {
    const response = await fetch("http://localhost:5000/mahasiswa/dashboard", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });

    statusResponse(response.status);

    const result = await response.json();
    if (result.status === "Success") {
      const dataMahasiswa = result.data;
      // RENDERING DATA
      renderDataDashboard(dataMahasiswa);
    }
  } catch (error) {
    console.error(`Gagal mengambil data dashboard: ${error}`);
  }
};

export const studentIndentity = async () => {
  try {
    const response = await fetch("http://localhost:5000/mahasiswa/profile", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });
    // CHECKING STATUS RESPONSE
    statusResponse(response.status);

    const result = await response.json();
    if (result.status === "Success") {
      const dataMahasiswa = result.data;
      // RENDERING DATA
      renderIndentity(dataMahasiswa);
    }
  } catch (error) {
    console.error(`Gagal mengambil Biodata: ${error}`);
  }
};

function statusResponse(response) {
  if (response.status === 401) {
    // IF SESSION FINISH OR INVALID
    window.location.href = "login.html";
    return;
  }
}

// RENDERING MENU DASHBOARD
function renderDataDashboard(data) {
  document.querySelector(".identity-detail .student-name").textContent =
    data.nama;
  document.getElementById("student-nim").textContent = data.nim;
  document.querySelector(".student-major").textContent = data.program_studi;
  document.querySelector(".status").textContent = data.status_akademik;

  document.getElementById("curr-ips").textContent = data.ip_semester;
  document.getElementById("curr-ipk").textContent = data.ipk;
  document.getElementById("curr-sks").textContent = data.total_sks;
  document.getElementById("subject-active").textContent =
    data.jumlah_matkul_aktif;
}

// RENDERING MENU BIODATA
function renderIndentity(data) {
  document.querySelector("#name-bio").innerText = data.nama;
  document.querySelector(".identity-detail .major-name").innerText = data.nama_prodi;
  document.querySelector("#status-bio").innerText = data.status;
  document.querySelector(".biodata-item .student-nim").innerText = data.nim;
  document.querySelector(".biodata-item .student-major").innerText =
    data.nama_prodi;
  document.querySelector(".biodata-item .student-age").innerText =
    data.angkatan;
  document.querySelector(".biodata-item .student-gender").innerText =
    data.jenis_kelamin;
  document.querySelector(".biodata-item .student-nik").innerText = data.nik;
  document.querySelector(".biodata-item .student-email").innerText = data.email;
  document.querySelector(".biodata-item .student-religion").innerText =
    data.agama;
  document.querySelector(".biodata-item .student-birth").innerText =
    `${data.kota_lahir}, ${data.tanggal_lahir}`;
  document.querySelector(".biodata-item .student-address").innerText =
    data.alamat;
}

// Memastikan script hanya berjalan saat HTML sudah siap sepenuhnya
document.addEventListener("DOMContentLoaded", () => {
  initDashboard();
});
document.addEventListener("DOMContentLoaded", () => {
  studentIndentity();
})