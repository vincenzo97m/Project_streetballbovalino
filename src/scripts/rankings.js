async function fetchCSV(url) {
    const response = await fetch(url);
    const text = await response.text();
    return text.trim().split("\n").map(row => row.split(","));
}




function renderRankingTable(data, containerId) {
    const container = document.getElementById(containerId);
    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    for (let i = 0; i < data[0].length - 1; i++) {
        const th = document.createElement("th");
        th.textContent = data[0][i];
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    data.slice(1).forEach(row => {
        const tr = document.createElement("tr");
        const color = row[row.length - 1];
        if (color) tr.style.backgroundColor = color;
        for (let i = 0; i < row.length - 1; i++) {
            const td = document.createElement("td");
            td.textContent = row[i];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    container.innerHTML = "";
    container.appendChild(table);
}

const classifiche = {
    "ranking-open-maschile": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSR53eUzgnaH3Fn_E7uDR7gxuKolf2VuxO7Kp3c6z6SlgptNJWhWDcBGARhjQbK83qxmu6AGzXrpG_e/pub?gid=0&single=true&output=csv",
    "ranking-open-femminile": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSR53eUzgnaH3Fn_E7uDR7gxuKolf2VuxO7Kp3c6z6SlgptNJWhWDcBGARhjQbK83qxmu6AGzXrpG_e/pub?gid=112140575&single=true&output=csv",
    "ranking-under-17": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSR53eUzgnaH3Fn_E7uDR7gxuKolf2VuxO7Kp3c6z6SlgptNJWhWDcBGARhjQbK83qxmu6AGzXrpG_e/pub?gid=909698791&single=true&output=csv",
    "ranking-under-14": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSR53eUzgnaH3Fn_E7uDR7gxuKolf2VuxO7Kp3c6z6SlgptNJWhWDcBGARhjQbK83qxmu6AGzXrpG_e/pub?gid=724036286&single=true&output=csv"
};

window.addEventListener("DOMContentLoaded", async () => {

    for (const [id, url] of Object.entries(classifiche)) {
        const data = await fetchCSV(url);
        renderRankingTable(data, id);
    }
});