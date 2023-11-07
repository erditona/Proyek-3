// import mqqtt connection
import mqttClient from "./mqttConnection.js";

// getdevice.js
export const URLGetDevice = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-getdevices";

// Ini adalah elemen container di mana Anda akan menambahkan elemen toggle switch
const devicesContainer = document.getElementById("devices");

export function responseData(results) {
  console.log(results);
  results.data.forEach(isiCard);
}

export function isiCard(value) {
  const topic = value.topic;
  const name = value.name;

  // Buat elemen toggle switch
  const toggleSwitch = document.createElement("div");
  toggleSwitch.className = "toggle-switch relative inline-flex w-[52px] h-1 mb-6";

  const input = document.createElement("input");
  input.className = "toggle-checkbox";
  input.type = "checkbox";
  input.checked = false;
  input.style.display = "none"; // Sembunyikan checkbox

  toggleSwitch.appendChild(input);

  const label = document.createElement("label");
  label.className = "toggle-icon relative block w-12 h-8 rounded-full transition-color duration-150 ease-out";
  label.setAttribute("for", `toggle-${topic}`);

  toggleSwitch.appendChild(label);

  // Buat elemen tombol Edit
  const editButton = document.createElement("button");
  editButton.className = "p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 absolute top-2 right-2";
  editButton.textContent = "Edit";

  // Buat elemen tombol Delete
  const deleteButton = document.createElement("button");
  deleteButton.className = "p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 absolute top-2 right-10";
  deleteButton.textContent = "Delete";

  // Tambahkan elemen toggle switch ke container
  const cardDiv = document.createElement("div");
  cardDiv.className = "flex-shrink max-w-full px-4 w-full sm:w-1/2 mb-6";
  cardDiv.innerHTML = `
  <div class="bg-white dark-bg-surfacedark-200 rounded-lg shadow-lg h-full p-6 relative">
    <div class="flex flex-wrap flex-row items-center">
        <div class="flex-shrink max-w-full w-1/2">
            <h5 class="text-gray-500 mb-1">${topic}</h5>
            <h3 class="text-lg font-bold mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="inline-block ltr:mr-2 rtl:ml-2 -mt-1 bi bi-cpu" viewBox="0 0 16 16">
                    <path
                        d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                </svg>
                ${name}
            </h3>
            <p class="status text-sm text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="inline-block ltr:mr-2 rtl:ml-2 -mt-1 bi bi-broadcast"
                    viewBox="0 0 16 16">
                    <path
                        d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                </svg>
                <span id="status-${topic}">OFF</span>
            </p>
            <br />
        </div>
        <div class="flex-shrink max-w-full w-1/2">
            <canvas class="max-w-100" id="LineAreaSm"
                style="display: block; box-sizing: border-box; height: 66px; width: 132px"
                width="528" height="264"></canvas>
        </div>
    </div>
  </div>
  `;

  cardDiv.querySelector(".flex-shrink").appendChild(toggleSwitch);
  cardDiv.appendChild(editButton);
  cardDiv.appendChild(deleteButton);
  devicesContainer.appendChild(cardDiv);

  toggleSwitch.addEventListener("click", (event) => {
    const input = event.currentTarget.querySelector("input");
    const cardId = `status-${topic}`; // ID elemen status yang sesuai dengan card
    const statusSpan = document.getElementById(cardId); // Dapatkan elemen status yang sesuai

    input.checked = !input.checked;

    const payload = input.checked ? "1" : "0";

    if (mqttClient && mqttClient.connected) {
      mqttClient.publish(topic, payload);
      console.log(`Mengirim payload ${payload} ke topik ${topic}`);
      statusSpan.textContent = input.checked ? "ON" : "OFF";
      // insertHistory();
    } else {
      console.error("Koneksi MQTT tidak aktif");
    }
  });
}