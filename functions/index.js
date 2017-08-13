const functions = require('firebase-functions');
const express=require('express');
const firebase=require('firebase-admin');

const engines=require('consolidate');
const firebaseApp=firebase.initializeApp(

functions.config().firebase
);


function getFacts(){
	const ref=firebaseApp.database().ref('fact');

	return ref.on('value').then(snap=>snap.val());
}

const app=express();
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');


app.get('/timestamp',(req,res)=>{
	res.send(`${Date.now()}`);
})

app.get('/', (req,res)=>{

	res.set('Cache-Control','public, max-age=300, s-maxage=600');

	getFacts().then(facts=>
	{
			res.json(facts);	
	})



})

exports.app = functions.https.onRequest(app);
