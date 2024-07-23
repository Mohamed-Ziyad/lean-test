// const express = require("express");
// const app = express();
// const http = require("http");
// const socketIo = require("socket.io");
// const { SpeechClient } = require("@google-cloud/speech");

// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// // Ensure this path is correct and the file exists
// process.env.GOOGLE_APPLICATION_CREDENTIALS = "googlecreds.json";
// const client = new SpeechClient();

// const request = {
//   config: {
//     encoding: "LINEAR16",
//     sampleRateHertz: 16000,
//     languageCode: "ar-SA", // Arabic language code
//     // languageCode: "en-US",
//     alternativeLanguageCodes: ["en-US"],
//     interimResults: true, // Enable interim results
//     enableAutomaticPunctuation: true, // Helps with punctuation
//     model: "default", // Enhanced model for better accuracy, change as needed ('default',phone_call, 'video', etc.)
//     useEnhanced: true, // Use enhanced models for better accuracy
//     speechContexts: [
//       // Contexts increase recognition accuracy for specific phrases
//       {
//         phrases: [
//           "مرحبا",
//           "السلام عليكم",
//           "تكنولوجيا",
//           "خاص بالموظفين",
//           "بيانات الموظفين",
//           "hello",
//           "goodbye",
//           "technology",
//           "specific term",
//           "custom phrase",
//           "task",
//           "erp",
//           // Include English words
//         ], // Example common phrases
//         boost: 20.0, // Boost probability of recognizing these phrases
//       },
//     ],
//     enableWordTimeOffsets: true, // Include word time offsets for further processing
//     enableSpeakerDiarization: true, // Differentiates speakers
//     diarizationSpeakerCount: 2, // Expected number of speakers (adjust based on use case)
//     profanityFilter: true, // Filter out profane words
//   },
// };
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get("/test", (req, res) => {
//   res.send("Node.js Google Speech-to-Text server is running");
// });

// // Handle socket connections
// io.on("connection", (socket) => {
//   console.log("New client connected");
//   let recognizeStream = null;

//   socket.on("startStream", () => {
//     console.log("Starting Recognize Stream");
//     recognizeStream = client
//       .streamingRecognize(request)
//       .on("error", (err) => {
//         console.error("API Request Error: ", err);
//         socket.emit("error", "Google Speech API Error");
//       })
//       .on("data", (data) => {
//         const str = data?.results[0]?.alternatives[0]?.transcript;
//         const sentence = str.replace(/\b(\w+)\b(?:\s+\1\b)+/gi, "$1");

//         console.log(
//           "----------------🔥🔥🔥DEBUG ALLLLLLLL LOG🔥🔥🔥-----------------------"
//         );
//         console.log(data?.results[0]?.alternatives);
//         console.log(
//           "----------------🔥🔥🔥DEBUG LOG🔥🔥🔥-----------------------"
//         );

//         socket.emit("speechData", sentence);
//       });
//   });

//   socket.on("audioData", (data) => {
//     if (recognizeStream !== null) {
//       recognizeStream.write(data, (err) => {
//         if (err) {
//           console.error("Stream Write Error: ", err);
//           socket.emit("error", "Stream Write Error");
//         }
//       });
//     } else {
//       console.warn("No active recognizeStream to write data");
//     }
//   });

//   socket.on("stopStream", () => {
//     if (recognizeStream !== null) {
//       recognizeStream.end();
//       console.log("Recognize Stream Ended");
//     } else {
//       console.warn("No active recognizeStream to stop");
//     }
//     recognizeStream = null;
//   });

//   socket.on("disconnect", () => {
//     if (recognizeStream !== null) {
//       recognizeStream.end();
//     }
//     console.log("Client disconnected");
//   });
// });

// const PORT = 4000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the simple Node.js server!" });
});

// Route to get a list of items
app.get("/items", (req, res) => {
  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ];
  res.json(items);
});

// Route to create a new item
app.post("/items", (req, res) => {
  const newItem = req.body;
  // In a real app, you would save the item to a database
  console.log("New item created:", newItem);
  res.status(201).json({ message: "Item created!", item: newItem });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
