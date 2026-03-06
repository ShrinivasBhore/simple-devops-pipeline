console.log("DevOps Frontend Initialized");

async function fetchStatus() {
    try {
        const response = await fetch('/api/status');
        const data = await response.json();
        console.log("System Status:", data);
    } catch (error) {
        console.error("Error fetching status:", error);
    }
}

fetchStatus();
