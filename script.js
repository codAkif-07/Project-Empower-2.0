// Define the API endpoint and key
const apiEndpoint = 'https://api.data.gov/ed/collegescorecard/v1/schools';
const apiKey = 'drFNGnsAY8NCR3bSeJ9hRy5Y7iXb3wZt1VNLz1y3';
const fields = 'id,school.name,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state';
const perPage = 100; // Number of results per page (maximum allowed is 100)

// Function to fetch data from the API
async function fetchData() {
    try {
        let moreData = true;
        let currentPage = 0; // Starting page number
        let allSchools = []; // Array to store all fetched schools

        while (moreData) {
            const url = `${apiEndpoint}?api_key=${apiKey}&fields=${fields}&page=${currentPage}&per_page=${perPage}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Check if 'results' field is present and is an array
            if (!Array.isArray(data.results)) {
                console.error('Invalid data structure:', data);
                moreData = false;
                continue;
            }

            allSchools = allSchools.concat(data.results);

            // Check if there are more pages of data
            moreData = data.results.length === perPage;
            currentPage++;
        }

        // Populate the dropdown menu with all collected schools
        populateDropdown(allSchools);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to populate the dropdown menu
function populateDropdown(schools) {
    const dropdown = document.getElementById('schoolDropdown');

    // Clear existing options, except the first one
    dropdown.innerHTML = '<option value="">Select a School</option>';

    if (!Array.isArray(schools)) {
        console.error('Invalid schools data:', schools);
        return;
    }

    // Sort schools alphabetically by name
    schools.sort((a, b) => a['school.name'].localeCompare(b['school.name']));

    schools.forEach(school => {
        const option = document.createElement('option');
        option.value = school.id;
        option.textContent = school['school.name'];
        option.dataset.tuitionInState = school['latest.cost.tuition.in_state']; // Store in-state tuition
        option.dataset.tuitionOutState = school['latest.cost.tuition.out_of_state']; // Store out-of-state tuition
        dropdown.appendChild(option);
    });
}

// Function to display guidance based on selected school and tuition type
function displayGuidance() {
    const dropdown = document.getElementById('schoolDropdown');
    const guidanceMessage = document.getElementById('guidanceMessage');
    const selectedOption = dropdown.options[dropdown.selectedIndex];

    if (selectedOption.value === "") {
        guidanceMessage.textContent = "";
        return;
    }

    // Determine which tuition type is selected
    const selectedTuitionType = document.querySelector('input[name="tuitionType"]:checked');
    
    if (!selectedTuitionType) {
        guidanceMessage.textContent = "Please select a tuition type.";
        return;
    }

    const tuitionType = selectedTuitionType.value;
    const tuitionInState = parseInt(selectedOption.dataset.tuitionInState, 10);
    const tuitionOutState = parseInt(selectedOption.dataset.tuitionOutState, 10);

    let message = "";

    if (tuitionType === "inState") {
        message = `In-State Tuition: $${tuitionInState}`;
    } else if (tuitionType === "outState") {
        message = `Out-of-State Tuition: $${tuitionOutState}`;
    }

    guidanceMessage.textContent = message;
}

// Add event listener for the Show Tuition button
document.getElementById('showTuition').addEventListener('click', displayGuidance);

// Call the function to fetch data
fetchData();