async function getLatestMessage() {
    let botToken = "7937988041:AAGHLlHc-FLpBph-vtpzcnKwL3ScWqCvf6Q";
    const res = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`);
    const data = await res.json();

    if (data.result.length > 0) {
        const latestUpdate = data.result[data.result.length - 1]; // Get the last message
        if (latestUpdate.message && latestUpdate.message.text) {
            const message = latestUpdate.message.text;
            const parsedData = parseMessage(message);
            displayCards(parsedData);
        }
    } else {
        console.log("No updates found.");
    }
}

// Function to parse the message
function parseMessage(message) {
    const lines = message.split("\n");
    const data = [];

    for (let i = 0; i < lines.length; i += 3) {
        const id = lines[i]?.split(":")[1]?.trim();
        const quantity = lines[i + 1]?.split(":")[1]?.trim();
        const price = lines[i + 2]?.split(":")[1]?.trim();

        if (id && quantity && price) {
            data.push({
                id,
                quantity,
                price
            });
        }
    }

    return data;
}

// Function to create cards and display them
function displayCards(data) {
    const container = document.getElementById("card-container");
    container.innerHTML = ""; // Clear the container

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        const cardHeader = document.createElement("div");
        cardHeader.className = "card-header";
        cardHeader.innerHTML = `<h2>Diamond #${item.id}</h2>`;

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        cardBody.innerHTML = `
            <p><strong>Quantity:</strong> ${item.quantity}</p>
            <p><strong>Price:</strong> ${item.price}</p>
        `;

        const cardFooter = document.createElement("div");
        cardFooter.className = "card-footer";
        cardFooter.innerHTML = `<a href="#">Buy Now</a>`;

        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);

        container.appendChild(card);
    });
}

// Load messages when the page is opened
getLatestMessage();
