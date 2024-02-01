// Import the csv-writer module
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Create a CSV writer with the path and header configuration
const csvWriter = createCsvWriter({
    path: 'predefined_prompts.csv',
    header: [
      {id: 'prompt', title: 'prompt'}
    ]
});

// Define the prompts to be written to the CSV file
const prompts = [
    {prompt: "Create your predefined prompt in /backend/prompt.js"},
    {prompt: "Create your predefined prompt in /backend/prompt.js"}
];

// Write the prompts to the CSV file
csvWriter.writeRecords(prompts)
    .then(() => {
      // Log a success message when the CSV file is written successfully
      console.log('The CSV file was written successfully');
    });
