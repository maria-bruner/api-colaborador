const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

class LoggerService {
  constructor() {
    this.logDirectory = path.join(__dirname, '../logs');
    this.createLogDirectoryAndSetFilePath();

    this.csvWriter = createCsvWriter({
      path: this.filePath + '.csv',
      append: fs.existsSync(this.filePath + '.csv'),
      fieldDelimiter: ';',
      encoding: 'utf8',
      header: [{
          id: 'timestamp',
          title: 'Data/Hora'
        },
        {
          id: 'message',
          title: 'Mensagem'
        }
      ]
    });
  }

  createLogDirectoryAndSetFilePath() {
    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory);
    }

    const dateFormat = new Date().toISOString().replace(/[:.]/g, '-');
    this.filePath = path.join(this.logDirectory, `processamento_${dateFormat}`);
  }

  async log(message) {
    const date = new Date().toISOString();
    const logMessage = `[${date}] ${message}\n`;

    fs.appendFileSync(`${this.filePath}.log`, logMessage);

    await this.csvWriter.writeRecords([{
      timestamp: date,
      message: message
    }]);
  }
}

module.exports = LoggerService