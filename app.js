var apiEndpoint = 'https://api.data.gov/ed/collegescorecard/v1/schools';
var apiKey = 'drFNGnsAY8NCR3bSeJ9hRy5Y7iXb3wZt1VNLz1y3';
var fields = 'id,school.name,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state';
var perPage = 100; // Number of results per page (maximum allowed is 100)

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

var quotes = [
    "“In three words I can sum up everything I’ve learned about life: It goes on.” -Robert Frost",
    "“The most common way people give up their power is by thinking they don’t have any.” -Alice Walker",
    "“There is no better compass than compassion.” – Amanda Gorman",
    "“Vitality shows not only in the ability to persist but in the ability to start over.” -F. Scott Fitzgerald",
    "“Love yourself first and everything else falls into line.” – Lucille Ball",
    "“It is never too late to be what you might have been.” -George Eliot",
    "“Keep your face always toward the sunshine, and shadows will fall behind you.” -Walt Whitman",
    "“If you’re having fun, that’s when the best memories are built.” -Simone Biles",
    "“Definitions belong to the definers, not the defined.” -Toni Morrison",
    "“A problem is a chance for you to do your best.” -Duke Ellington",
    "“Optimism is a happiness magnet. If you stay positive, good things and good people will be drawn to you.” -Mary Lou Retton",
    "“To live is the rarest thing in the world. Most people just exist.” -Oscar Wilde",
    "“Your story is what you have, what you will always have. It is something to own.” -Michelle Obama",
    "“If you prioritize yourself, you are going to save yourself.” –Gabrielle Union",
    "“Failure is the condiment that gives success its flavor.” –Truman Capote",
    "“First you do, then you become.” - Iman Gadzhi"
]

var quoteText = document.querySelector(".quote_text");

function generateQuote () {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteText.innerHTML = quote;
}