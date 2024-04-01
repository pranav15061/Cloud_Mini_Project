let applications = [];

// Get DOM elements
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");
const modal = document.getElementById("myModal");
const closeBtn = document.querySelector(".close");
const saveBtn = document.getElementById("saveBtn");
const companyName = document.getElementById("companyName");
const position = document.getElementById("position");
const status = document.getElementById("status");
const appId = document.getElementById("appId");
const filterStatus = document.getElementById("filterStatus");
const sortSelect = document.getElementById("sortSelect");

// Event listeners
addBtn.addEventListener("click", () => showModal());
closeBtn.addEventListener("click", () => closeModal());
saveBtn.addEventListener("click", () => saveApplication());
filterStatus.addEventListener("change", () => renderTable());
sortSelect.addEventListener("change", () => renderTable());

// Functions
function showModal(application) {
  if (application) {
    appId.value = application.id;
    companyName.value = application.company;
    position.value = application.position;
    status.value = application.status;
  } else {
    appId.value = "";
    companyName.value = "";
    position.value = "";
    status.value = "applied";
  }
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function saveApplication() {
  const app = {
    id: appId.value || Date.now(),
    company: companyName.value,
    position: position.value,
    status: status.value,
  };

  if (appId.value) {
    const index = applications.findIndex((a) => a.id === app.id);
    applications[index] = app;
  } else {
    applications.push(app);
  }

  renderTable();
  closeModal();
}

function deleteApplication(id) {
  applications = applications.filter((app) => app.id !== id);
  renderTable();
}

// function editRow({app}) {
//     // Get the row of the clicked button

//     console.log(app);

//     let row = button.parentNode.parentNode;

//     // Extract the current values from the row
//     let company = row.cells[0].innerText;
//     let position = row.cells[1].innerText;
//     let status = row.cells[2].innerText;

//     // Prompt the user to enter new values
//     let newCompany = prompt("Enter new company name:", company);
//     let newPosition = prompt("Enter new position:", position);
//     let newStatus = prompt("Enter new status:", status);

//     // Update the row with new values if the user entered something
//     if (newCompany !== null && newPosition !== null && newStatus !== null) {
//         row.cells[0].innerText = newCompany;
//         row.cells[1].innerText = newPosition;
//         row.cells[2].innerText = newStatus;
//     }
// }

function renderTable() {
  const filteredStatus = filterStatus.value;
  const sortBy = sortSelect.value;

  let filteredApplications = applications;

  if (filteredStatus !== "all") {
    filteredApplications = applications.filter(
      (app) => app.status === filteredStatus
    );
  }

  if (sortBy === "position") {
    filteredApplications.sort((a, b) => a.position.localeCompare(b.position));
  } else if (sortBy === "status") {
    filteredApplications.sort((a, b) => a.status.localeCompare(b.status));
  }

  tableBody.innerHTML = "";
  filteredApplications.forEach((app) => {
    const row = `
            <tr>
                <td>${app.company}</td>
                <td>${app.position}</td>
                <td>${app.status}</td>
                <td>
                    <button onclick="deleteApplication(${app.id})">Delete</button>
                </td>
            </tr>
        `;
    tableBody.innerHTML += row;
  });
}

// Initial rendering
renderTable();
