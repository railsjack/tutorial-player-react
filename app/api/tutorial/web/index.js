class TutorialAPI {
  createListJSON(dstDirectory: string) {
    const { ipcRenderer } = require('electron');
    return new Promise((resolve, eject) => {
      ipcRenderer.send('Request', dstDirectory);
      ipcRenderer.once('Response', (event, response) => {
        console.log('api response', response);
        if (response.code === 201) {
          if (response.data && response.data.path) {
            resolve({
              success: true,
              message: response.message,
              createdPath: response.data.path
            });
          } else {
            eject({
              success: false,
              ...response
            });
          }
        } else {
          eject({
            success: false,
            ...response
          });
        }
      });
    });
  }
}

const showError = error => {
  switch (error.reason) {
    case 'NO_VIDEO_FILES':
      alert('There is no any video files on the directory');
      break;
    default:
      alert(error.message);
  }
};

export { showError };
export default new TutorialAPI();
