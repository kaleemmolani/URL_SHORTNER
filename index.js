const express = require('express'); // import express library
const app = express() // instantiate express object 
const fs = require("fs") // import file system library
let urlmapper = JSON.parse(fs.readFileSync('urlmapper.json'));
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const urlshortner = ()=>{
  let r = (Math.random() + 1).toString(32).substring(3,7);
  return r;
}


app.get('/add',(req,res)=>{
  const url = req.query.url;
  const code = urlshortner();
  urlmapper[code] = url;
  fs.writeFileSync('urlmapper.json',JSON.stringify(urlmapper));
  res.send(`localhost:3001/${code}`);
})


app.get("/urls",(req,res)=>{
  console.log(urlmapper);
  res.send(`
  <ol>
  ${Object.keys(urlmapper).map(url=>
    `<li>${urlmapper[url]} url:  <a href=/${url} > ${url}</a></li>`
  )}
  </ol>
  `)
})


app.get('/:vd',(req,res)=>{
  const code = req.params.vd;
  console.log(code);
  const url = urlmapper[code];
  console.log(url)
  if(url){
    res.redirect(url)
  }else {
    res.send('url not found')
  }
});

app.listen(3001,(error)=>{
    if(error){
      console.log(error)
    }
    console.log(`server running at http://localhost:3001`)
})
