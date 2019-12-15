const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

const createTutorialList = require('../utils/create_tutorial_list');

ipcMain.on('Request', (event, dirPath) => {
  if (!fs.existsSync(dirPath)) {
    event.sender.send('Response', {
      code: 400,
      reason: 'NOEXITS',
      message: 'The file/directory does not exist'
    });
  } else if (!fs.lstatSync(dirPath).isDirectory()) {
    event.sender.send('Response', {
      code: 401,
      reason: 'NOTDIR',
      message: 'The file is not a directory'
    });
  } else if (
    path.basename(dirPath).match(/[^a-zA-Z0-9_\-\.\'\"\& ]+/g) !== null
  ) {
    event.sender.send('Response', {
      code: 300,
      reason: 'INVALID_DIRNAME',
      message: 'The directory name is invalid',
      data: path.basename(dirPath)
    });
  } else {
    createTutorialList(dirPath, data => {
      event.sender.send('Response', {
        code: 201,
        reason: 'CREATED',
        message: 'The list is created successfully!',
        data: { ...data, path: dirPath }
      });
    });
  }
});
