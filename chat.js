require("dotenv").config();
const readline = require("readline");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function generateResponse(message) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const reply = response.data.choices[0].message.content;
    console.log("Assistant:", reply);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Function to prompt the user for input and generate a response
function promptUser() {
  rl.question("User: ", async (message) => {
    await generateResponse(message); // Generate a response based on the user input
    promptUser(); // Prompt the user again for the next input
  });
}

// Start the conversation by calling the promptUser function
promptUser();
