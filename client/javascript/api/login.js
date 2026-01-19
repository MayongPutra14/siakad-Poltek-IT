const logiForm = document.getElementById("loginForm");

logiForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // 1. TAKE DATA FROM INPUT BOX
  const nim = document.querySelector("#nim-input").value;
  const password = document.querySelector("#password-input").value;
  try {
    // 2. SEND DATA TO BACK END
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // SAVE SESSION
      //   CHANGE DATA TO STRING
      body: JSON.stringify({
        nim: nim,
        password: password,
      }),
    });

    const result = await response.json(); // WAITING FOR AN ANSWER

    // 3. LOGIC AFTER RECIEVE THE ANSWER
    if (response.ok) {
      alert("Login berhasil!");
      window.location.href = "dashboard.html"; // CHANGE PATH TO dashboard.html
    } else {
      alert(`Gagal: ${result.message}`);
    }
  } catch (error) {
    console.error(`Error koumnikasi ke server ${error}`);
  }
});
