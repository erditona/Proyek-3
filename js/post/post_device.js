const postDevices = async () => {
    try {
        const nama = document.getElementById("isiName").value;
        const topic = document.getElementById("isiTopic").value.toLowerCase();
        const loadingElement = document.getElementById("loading");
        const diabuttonElement = document.getElementById("diabutton");
        const email = localStorage.getItem("userEmail");

        diabuttonElement.style.display = "none";
        loadingElement.style.display = "block";

        if (nama === "" || topic === "") {
            throw new Error("Please fill in all fields.");
        }

        // Validate topic
        const topicRegex = /^[a-z]+$/; // Only lowercase letters
        if (!topicRegex.test(topic)) {
            throw new Error("Topic harus menggunakan huruf kecil dan tidak menggunakan angka.");
        }

        const target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-insertdevices";
        const datainjson = {
            name: nama,
            topic: `urse/${email}/${topic}`,
        };

        const result = await postWithBearer(target_url, getCookie("token"), datainjson);
        responseData(result);
        loadingElement.style.display = "none";
        diabuttonElement.style.display = "flex";
    } catch (error) {
        console.error("Error:", error.message);
        Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: error.message,
        });
        loadingElement.style.display = "none";
        diabuttonElement.style.display = "flex";
    }
};

const responseData = (result) => {
    if (result) {
        Swal.fire({
            icon: "success",
            title: "Tambah Device Berhasil",
            text: result.message,
        }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
                window.location.href = "device_control.html";
            }
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Tambah Device Gagal",
            text: "An error occurred while processing your request.",
        });
    }
};


// window.postDevices = postDevices;




// import { postWithBearer } from "https://jscroot.github.io/api/croot.js";
// import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

// document.addEventListener("DOMContentLoaded", () => {
//     const loadingElement = document.getElementById("loading");
//     if (loadingElement) {
//         loadingElement.style.display = "none";
//     }
// });

// const postDevices = () => {
//     const nama = document.getElementById("isiName").value;
//     const topic = document.getElementById("isiTopic").value.toLowerCase();
//     const loadingElement = document.getElementById("loading");
//     const diabuttonElement = document.getElementById("diabutton");
//     const email = localStorage.getItem("userEmail");

//     diabuttonElement.style.display = "none";
//     loadingElement.style.display = "block";

//     if (nama === "" || topic === "") {
//         Swal.fire({
//             icon: "error",
//             title: "Gagal Menambahkan Device",
//             text: "Please fill in all fields.",
//         });

//         loadingElement.style.display = "none";
//         diabuttonElement.style.display = "flex";
//         return;
//     }

//     // Validate topic
//     const topicRegex = /^[a-z]+$/; // Only lowercase letters
//     if (!topicRegex.test(topic)) {
//         Swal.fire({
//             icon: "error",
//             title: "Invalid Topic",
//             text: "Topic harus menggunakan huruf kecil dan tidak menggunakan angka.",
//         });

//         loadingElement.style.display = "none";
//         diabuttonElement.style.display = "flex";
//         return;
//     }

//     const target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-insertdevices";
//     const datainjson = {
//         name: nama,
//         topic: "urse/" + email + "/" + topic,
//     };

//     postWithBearer(target_url, getCookie("token"), datainjson, (result) => {
//         responseData(result);
//         loadingElement.style.display = "none";
//         diabuttonElement.style.display = "flex";
//     });
// };

// const responseData = (result) => {
//     if (result) {
//         Swal.fire({
//             icon: "success",
//             title: "Tambah Device Berhasil",
//             text: result.message,
//         }).then((result) => {
//             if (result.isConfirmed || result.isDismissed) {
//                 window.location.href = "device_control.html";
//             }
//         });
//     } else {
//         Swal.fire({
//             icon: "error",
//             title: "Tambah Device Gagal",
//             text: result.message,
//         });
//     }
// };

window.postDevices = postDevices;
