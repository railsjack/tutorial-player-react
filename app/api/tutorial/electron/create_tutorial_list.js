const glob = require('glob');
const path = require('path');
const fs = require('fs');

function writeListFile(arrList1, arrList2, fileName, dirPath) {
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
}

function naturalSort(myArray) {
  var collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base'
  });
  return myArray.sort(collator.compare);
}

function generateSubtitle(mp4_files, prefix) {
  var subtitle_files = [];
  mp4_files.map(mp4_file => {
    subtitle_files.push(mp4_file.substr(0, mp4_file.length - 4) + '.' + prefix);
  });
  return subtitle_files;
}

module.exports = (dirPath, cb) => {
  let mp4_files = glob.sync(path.join(dirPath, '/**/*.mp4'));
  let vtt_files = glob.sync(path.join(dirPath, '/**/*.vtt'));
  let srt_files = glob.sync(path.join(dirPath, '/**/*.srt'));
  let subtitle_type;

  if (
    mp4_files.length === 0 &&
    vtt_files.length === 0 &&
    srt_files.length === 0
  ) {
    cb({ result: false, reason: 'NO_VIDEO_FILES' });
  } else {
    // Subtitle files are written in srt or vtt?
    if (vtt_files.length < srt_files.length) {
      subtitle_type = 'SRT';
    } else {
      subtitle_type = 'VTT';
    }

    mp4_files = naturalSort(mp4_files);

    if (subtitle_type === 'SRT') {
      vtt_files = generateSubtitle(mp4_files, 'srt');
    } else {
      vtt_files = generateSubtitle(mp4_files, 'vtt');
    }

    const newDirPath = dirPath.replace(/\\/g, '/');
    writeListFile(mp4_files, vtt_files, 'list.json', newDirPath);
    cb({ result: true });
  }
};
