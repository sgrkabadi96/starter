const express = require('express')


const app = express();
const port = 4000 ;


let teaData = [];
let teaId = 1 ;

app.use(express.json());


app.get('/teas' , (req , res)=> {
    res.status(201).send(teaData);
})

app.post('/teas' , (req , res)=> {
    const {name ,price } = req.body ;
    const tea = {id : teaId++ , name , price};
    teaData.push(tea);
    res.status(201).send(tea);
});

app.get('/teas/:id' , (req , res)=> {
    const id = req.params.id ;
    const data = teaData.find(t=> t.id === parseInt(id));
    if(!data) {
        res.status(404).send("No tea found with id ");
    }
    res.status(201).send(data)
})


app.put("/teas/:id" , (req , res)=>{
    const teaId = req.params.id ;
    const tea = teaData.find(t=>t.id === parseInt(teaId));
    if(!tea) {
       return res.status(201).send("No tea found with id ");
    }
    const {name, price } = req.body ;
    tea.name =name;
    tea.price = price;
    res.send(200).send(tea);
})


app.delete('/teas/:id' , (req , res)=>{
    const id = req.params.id ;
    const idx = teaData.findIndex(t => t.id == parseInt(id));
    if(idx === -1) {
        return res.status(404).send("No Tea found with id");
    }
    teaData.splice(idx , 1);
    res.status(200).send(teaData);
})



app.listen(port , ()=>{
    console.log("Server has started listening")
})