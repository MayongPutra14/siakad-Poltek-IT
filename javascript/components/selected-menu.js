const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", (event) => {
    event.preventDefault();
    const target = document.querySelector(tab.dataset.tabTarget);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("clicked");
    });

    target.classList.add("clicked");
  });
});
