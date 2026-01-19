document.getElementById("btn-logout").addEventListener("click", async function (e) {
  e.preventDefault(); // supaya tidak reload halaman
  try {
    const res = await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include", // WAJIB supaya session cookie ikut terkirim
    });

    const data = await res.json();
    console.log(data);
    if (res.ok) {
      alert(data.message);

      // redirect ke halaman login
      window.location.href = "/login.html";
    } else {
      alert(data.message || "Logout gagal");
    }

  } catch (error) {
    console.error("Error saat logout:", error);
    alert("Terjadi kesalahan saat logout");
  }
});
