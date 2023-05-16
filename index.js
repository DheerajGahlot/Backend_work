const { request } = require('express');
const express = require('express');
const cors = require("cors");
const Rider = require('./db/Rider')
const Driver = require('./db/Driver')
const Cab = require('./db/Cab')
const Match = require('./db/Match')

require('./db/config')

const app = express();

app.use(express.json());
app.use(cors());

app.post("/add-rider", async (req,resp) =>{
  let rider = new Rider(req.body);
  let result = await rider.save();
  resp.send("Rider added successfully")
})

app.post("/add-driver", async (req,resp) =>{
  let driver = new Driver(req.body);
  let result = await driver.save();
  resp.send("Driver added successfully")
})

app.post("/add-cab", async (req,resp) =>{
  let cab = new Cab(req.body);
  let result = await cab.save();
  resp.send("Cab added successfully")
})

app.get("/riders",async (req,resp)=>{
  let riders = await Rider.find();
  if(riders.length>0){
    resp.send(riders)
  }else{
    resp.send({result :"No rider found"})
  }
})

app.get("/drivers",async (req,resp)=>{
  let drivers = await Driver.find();
  if(drivers.length>0){
    resp.send(drivers)
  }else{
    resp.send({result :"No driver found"})
  }
})

app.get("/cabs",async (req,resp)=>{
  let cabs = await Cab.find();
  if(cabs.length>0){
    resp.send(cabs)
  }else{
    resp.send({result :"No cab found"})
  }
})

app.get("/match/:riderId", async (req, resp) => {
  
    const riderId = req.params.riderId;
    const rider = await Rider.findById(riderId);
    let drivers = await Driver.find();
    let matches = await Match.find();
    let cabs = await Cab.find();
    if (!rider) {
      resp.send("No rider found");
      return;
    }else
    {
       let driver = null;
       let cab = null;
       for(let i =0 ;i<drivers.length;i++)
       {
        if(drivers[i].rating > rider.rating)
        { 
          let flag = 0;
          for(let j =0 ;j<matches.length;j++)
          {
            if(drivers[i]._id.toString() == matches[j].driverId)
            {
              flag = 1;
              break;
            }
          }
          if(!flag){
          driver = drivers[i];
          cab = cabs[i];
          break;
          }
        }
       }
       if(driver){
       let riderid = riderId;
       let driverid = driver._id;
         const match = new Match({
      riderId: riderid,
      driverId: driverid.toString()
    });

    await match.save();
       resp.send({driver,cab});
  }else{
      resp.send("none");
  }
       
    }
    
});

app.listen(4000);
