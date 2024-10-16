// cypress.config.js

const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse'); // Apenas se estiver usando a task parseCsv

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    setupNodeEvents(on, config) {
      // Registrar tasks personalizadas
      on('task', {
        // Task para obter o nome do arquivo CSV baixado
        getDownloadedFile({ downloadsFolder }) {
          const files = fs.readdirSync(downloadsFolder);
          const csvFiles = files.filter(file => file.endsWith('.csv'));
          
          if (csvFiles.length === 0) {
            return null;
          }

          // Retorna o arquivo CSV mais recente
          const latestFile = csvFiles[csvFiles.length - 1];
          return latestFile;
        },

        // Task para limpar a pasta de downloads antes de cada teste
        clearFolder({ downloadsFolder }) {
          if (fs.existsSync(downloadsFolder)) {
            fs.readdirSync(downloadsFolder).forEach((file) => {
              const filePath = path.join(downloadsFolder, file);
              fs.unlinkSync(filePath);
            });
          }
          return null;
        },

        // Task opcional para parsear CSV usando papaparse
        parseCsv({ filePath }) {
          const csvContent = fs.readFileSync(filePath, 'utf8');
          const parsed = Papa.parse(csvContent, { header: true });
          return parsed.data;
        },
      });
    },
    downloadsFolder: 'cypress/downloads', // Define a pasta de downloads
    // Outras configurações podem ser adicionadas aqui
  },
});


