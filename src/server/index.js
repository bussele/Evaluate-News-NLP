const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
   })

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// Import the packge
const fetch = require('node-fetch');
// Use fetch to make HTTP requets
fetch('https://example.com/')
    .then(res => res.text())
    .then(body => console.log(body));

const baseURL = "https://api.meaningcloud.com/sentiment-2.1";
const API_KEY = process.env.API_KEY;
const getSentimentAnalysis = async (userURL) => {
	const res = await fetch(`${baseURL}?key=${API_KEY}&lang=en&url=${userURL}`);
	try {
		const data = await res.json();
		console.log("data: ", data);
		return data;
	} catch (error) {
		console.log("error", error);
	}
};

app.post('/data', async (req, res) => {
  const article = req.body.url;
  const semanticAnalysis = await (fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${api_key}&url=${article}&lang=en`, {
    method: 'POST',
  }))

  try {
    const newData = await semanticAnalysis.json();
    console.log(newData);
    res.send(newData);
  } catch(error) {
    console.log("Error", error);
  }  

})
