document.addEventListener("DOMContentLoaded", function () {
    // Get references to buttons and tables
    var divisionButton = document.getElementById("division-button");
    var conferenceButton = document.getElementById("conference-button");
    var leagueButton = document.getElementById("league-button");

    var divisionTableAFC = document.getElementById("division-table-afc");
    var divisionTableNFC = document.getElementById("division-table-nfc");
    var conferenceTableAFC = document.getElementById("conference-table-afc");
    var conferenceTableNFC = document.getElementById("conference-table-nfc");
    var leagueTable = document.getElementById("league-table");

    // Helper function to show/hide search inputs based on the current page
    function toggleSearchInputs(showAfc_d, showNfc_d, showAfc_c, showNfc_c,showLeague) {
        document.getElementById("division-afc-search").style.display = showAfc_d ? "block" : "none";
        document.getElementById("division-nfc-search").style.display = showNfc_d ? "block" : "none";
        document.getElementById("conference-afc-search").style.display = showAfc_c ? "block" : "none";
        document.getElementById("conference-nfc-search").style.display = showNfc_c ? "block" : "none";
        document.getElementById("league-search").style.display = showLeague ? "block" : "none";
    }
    function toggleSearchLabels(showAfc_d, showNfc_d, showAfc_c, showNfc_c,showLeague) {
        document.getElementById("division-afc-search-label").style.display = showAfc_d ? "block" : "none";
        document.getElementById("division-nfc-search-label").style.display = showNfc_d ? "block" : "none";
        document.getElementById("conference-afc-search-label").style.display = showAfc_c ? "block" : "none";
        document.getElementById("conference-nfc-search-label").style.display = showNfc_c ? "block" : "none";
        document.getElementById("league-search-label").style.display = showLeague ? "block" : "none";
    }

    // Initial setup: Show division standings, hide others
    showTable(divisionTableAFC);
    showTable(divisionTableNFC);
    hideTable(conferenceTableAFC);
    hideTable(conferenceTableNFC);
    hideTable(leagueTable);
    toggleSearchInputs(true, true, false, false, false);
    toggleSearchLabels(true, true, false, false, false);

    // Event listeners
    divisionButton.addEventListener("click", function () {
        showTable(divisionTableAFC);
        showTable(divisionTableNFC);
        hideTable(conferenceTableAFC);
        hideTable(conferenceTableNFC);
        hideTable(leagueTable);
        toggleSearchInputs(true, true, false, false, false);
        toggleSearchLabels(true, true, false, false, false);
    });

    conferenceButton.addEventListener("click", function () {
        hideTable(divisionTableAFC);
        hideTable(divisionTableNFC);
        showTable(conferenceTableAFC);
        showTable(conferenceTableNFC);
        hideTable(leagueTable);
        toggleSearchInputs(false, false, true, true, false);
        toggleSearchLabels(false, false, true, true, false);
    });

    leagueButton.addEventListener("click", function () {
        hideTable(divisionTableAFC);
        hideTable(divisionTableNFC);
        hideTable(conferenceTableAFC);
        hideTable(conferenceTableNFC);
        showTable(leagueTable);
        toggleSearchInputs(false, false, false, false, true);
        toggleSearchLabels(false, false, false, false, true);
    });

    // Helper functions
    function showTable(table) {
        table.style.display = "table";
    }

    function hideTable(table) {
        table.style.display = "none";
    }
      
});
/**
     * Sorts a HTML table.
     * 
     * @param {HTMLTableElement} table The table to sort
     * @param {number} column The index of the column to sort
     * @param {boolean} asc Determines if the sorting will be in ascending
     */
function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    // Get all tbody sections within the table
    const tBodies = Array.from(table.querySelectorAll('tbody'));
    
    // Sort each tbody independently
    tBodies.forEach(tBody => {
        const rows = Array.from(tBody.querySelectorAll("tr"));
        
        // Sort each row
        const sortedRows = rows.sort((a, b) => {
            const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
            const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

            return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
        });

        // Remove all existing TRs from the tbody
        while (tBody.firstChild) {
            tBody.removeChild(tBody.firstChild);
        }

        // Re-add the newly sorted rows to the tbody
        tBody.append(...sortedRows);
    });


    // Remember how the column is currently sorted
    const headerRows = Array.from(table.querySelectorAll("thead tr"));
    headerRows.forEach(headerRow => {
        const th = headerRow.querySelector(`th:nth-child(${ column + 1})`);
        th.classList.remove("th-sort-asc", "th-sort-desc");
        th.classList.toggle("th-sort-asc", asc);
        th.classList.toggle("th-sort-desc", !asc);
    });
}
document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.closest("table");
        const headerIndex = Array.from(headerCell.parentElement.children).indexOf(headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});


// Function to filter table rows based on user input
function filterTable(tableId, inputId) {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(inputId);
    filter = input.value.toUpperCase();
    table = document.getElementById(tableId);
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows and hide those that don't match the filter
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0]; // The filter is applied to the first column
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// Attach event listeners for input fields
document.getElementById("division-afc-search").addEventListener("input", function () {
    filterTable("division-table-afc", "division-afc-search");
});
document.getElementById("division-nfc-search").addEventListener("input", function () {
    filterTable("division-table-nfc", "division-nfc-search");
});
document.getElementById("conference-afc-search").addEventListener("input", function () {
    filterTable("conference-table-afc", "conference-afc-search");
});
document.getElementById("conference-nfc-search").addEventListener("input", function () {
    filterTable("conference-table-nfc", "conference-nfc-search");
});
document.getElementById("league-search").addEventListener("input", function () {
    filterTable("league-table", "league-search");
});


