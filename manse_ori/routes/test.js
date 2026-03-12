

function dd() {
  let yongsinFile = require('../julgi/julgi.json')
  for(let i=0;i<yongsinFile.length;i++){
    delete yongsinFile[i]["_id"];
  }
  let data = {julgi : yongsinFile}
  var fs = require('fs');
  fs.writeFile('../julgi/julgi.json',JSON.stringify(data), (err) => {
    console.log(err)
  });
  /* for(let i=0;i<yongsinFile.length;i++){
    delete yongsinFile[i]["_id"];
  } */
}
dd();
