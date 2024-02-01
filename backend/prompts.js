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
    {prompt: "Wie ist dein Wissenstand über das Unternehmen 'Comsysto Reply'?"},
    {prompt: "Was sind die Hauptstädte von Deutschland, Frankreich und Italien?"},
    {prompt: "Schreibe mir die Fibonacci-Funktion in JavaScript bitte."},
    {prompt: "Was sind die neuesten Nachrichten über künstliche Intelligenz?"},
    {prompt: "Könntest du mir helfen, diesen englischen Text ins Deutsche zu übersetzen: 'Hello, how are you?'"},
    {prompt: "Könntest du mir helfen, diesen Code zu debuggen: 'console.log('Hello, world!';'"},
    {prompt: "Was ist die Quadratwurzel von 16?"},
    {prompt: "Was ist das Integral von x^2 von 0 bis 1?"},
    {prompt: "Was ist die Ableitung von sin(x)?"},
    {prompt: "Löse die Gleichung 2x + 3 = 7."},
    {prompt: "Was ist die Summe der Zahlen von 1 bis 100?"}
];

// Write the prompts to the CSV file
csvWriter.writeRecords(prompts)
    .then(() => {
      // Log a success message when the CSV file is written successfully
      console.log('The CSV file was written successfully');
    });