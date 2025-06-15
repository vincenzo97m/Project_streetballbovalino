async function fetchCSV(url) {
    const response = await fetch(url);
    const text = await response.text();
    return text.trim().split("\n").map(row => row.split(","));
}

function renderCalendarTable(data, containerId) {
    const container = document.getElementById(containerId);
    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    for (let i = 0; i < 3; i++) {
        const th = document.createElement("th");
        th.textContent = data[0][i];
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    data.slice(1).forEach(row => {
        const tr = document.createElement("tr");

        // Colonna 0: orario
        const td0 = document.createElement("td");
        td0.textContent = row[0];
        td0.style.backgroundColor = "#fffbcc";
        tr.appendChild(td0);

        // Colonna 1: squadra 1
        const td1 = document.createElement("td");
        td1.textContent = row[1];
        if (row[3]) td1.style.backgroundColor = row[3];
        if (row[5] && row[5].toUpperCase().includes("IN CORSO")) {
            td1.classList.add("live-cell");
        }
        tr.appendChild(td1);

        // Colonna 2: squadra 2
        const td2 = document.createElement("td");
        td2.textContent = row[2];
        if (row[4]) td2.style.backgroundColor = row[4];
        if (row[6] && row[6].toUpperCase().includes("IN CORSO")) {
            td2.classList.add("live-cell");
        }
        tr.appendChild(td2);

        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    container.innerHTML = "";
    container.appendChild(table);
}

const calendarioURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRRDEiXWct3GxRhLnruPZ85qqCQw03mMqjMopHlfh4oUS1DE_oBlJbAFIFoD90lAi7uAVxHizkpewS0/pub?gid=0&single=true&output=csv";

window.addEventListener("DOMContentLoaded", async () => {
    const calendarioData = await fetchCSV(calendarioURL);
    renderCalendarTable(calendarioData, "calendar-content");
});