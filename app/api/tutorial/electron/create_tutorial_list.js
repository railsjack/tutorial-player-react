const glob = require('glob');
const path = require('path');
const fs = require('fs');

function writeListFile(arrList1, arrList2, fileName, dirPath) {
  try {
    let newArrList1 = arrList1.map(function(item) {
      return item.replace(dirPath + '/', '');
    });
    let newArrList2 = arrList2.map(function(item) {
      return item.replace(dirPath + '/', '');
    });

    var content = '';
    for (var i = 0; i < newArrList1.length; i++) {
      content += `,\n\t[\n\t\t"${newArrList1[i]}",\n\t\t"${newArrList2[i]}"\n\t]`;
    }
    content = `[${content.substr(1)}\n]`;
    fs.writeFileSync(dirPath + '/' + fileName, content);
  } catch (error) {
    console.log('error on writeListFile', error, arrList2);
  }
}

function naturalSort(myArray) {
  var collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base'
  });
  return myArray.sort(collator.compare);
}

function generateSubtitle(mp4_files, vtt_files, srt_files) {
  var subtitle_files = [];
  mp4_files.map((mp4_file, index) => {
    const srt_file = srt_files[index];
    let vtt_file = vtt_files[index];
    if(!vtt_file) {
      vtt_file = srt_file.substr(0, srt_file.length - 4) + '.vtt';
    }
    if (fs.existsSync(srt_file) && !fs.existsSync(vtt_file)) {
      createVTTFromSRT(srt_file, vtt_file);
    }
    subtitle_files.push(vtt_file);
  });
  return subtitle_files;
}

const createVTTFromSRT = srtPath => {
  try {
    let content = fs.readFileSync(srtPath, 'utf-8');
    if (content) {
      content = content.replace(/(\.\d{2})/g, '$10');
      content = 'WEBVTT\n\n' + content;
      const vttPath = srtPath.substr(0, srtPath.length - 4) + '.vtt';
      fs.writeFileSync(vttPath, content);
    }
  } catch (error) {
    console.log('error on createVTTFromSRT', error);
  }
};

module.exports = (dirPath, cb) => {
  let mp4_files = glob.sync(path.join(dirPath, '/**/*.mp4'));
  let srt_files = glob.sync(path.join(dirPath, '/**/*.srt'));
  let vtt_files = glob.sync(path.join(dirPath, '/**/*.vtt'));

  if (mp4_files.length === 0) {
    cb({ result: false, reason: 'NO_VIDEO_FILES' });
  } else {
    mp4_files = naturalSort(mp4_files);
    vtt_files = naturalSort(vtt_files);
    srt_files = naturalSort(srt_files);

    vtt_files = generateSubtitle(mp4_files, vtt_files, srt_files);

    const newDirPath = dirPath.replace(/\\/g, '/');
    writeListFile(mp4_files, vtt_files, 'list.json', newDirPath);
    cb({ result: true });
  }
};
