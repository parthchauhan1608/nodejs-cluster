const os = require('os');
const cluster  = require('cluster');
const cpuslen =os.cpus().length;
let i,workers=[];

if (cluster.isMaster) {
    masterProcess();
} 
else {
    childProcess();  
}

function masterProcess() {
  console.log(`Master>>>>>>>>>>>>>>>>>>>> ${process.pid} is running`);
  for (i = 0; i < cpuslen; i++) {
    workers.push(cluster.fork());
  }
//   process.exit();
}
function childProcess() {
    console.log(`Worker ${process.pid} started and finished`);
    //For send message or emit 'message' event
    // process.send('This message to worker');
    // console.log(process.pid);
    process.exit();
}

for(let i in workers){
    // console.log(workers[0]);
    // console.log("Conneted..",workers[0].isConnected());
    // console.log("isDead",workers[0].isDead());
    // workers[i].on('online',()=>{
    //     console.log(`${workers[i].process.pid} Worker is Online...`);
    // });

    // workers[i].on('exit',(code,signal)=>{
    //     if(signal){
    //         console.log(`worker was killed by signal: ${signal} >>${workers[i].process.pid}`);
    //     }
    //     else if(code !== 0){
    //         console.log(`Worker exited with error: ${code} >>${workers[i].process.pid}`);
    //     }
    //     else{
    //         console.log(`Woeker success!>>${workers[i].process.pid}`);
    //     }
    // });

    // workers[i].on('message',(message)=>{
    //     console.log(`Message... ${message}>>${workers[i].process.pid}`);
    // });


    // workers[i].on('disconnect',()=>{
    //     console.log(`Dissconnect... ${workers[i].process.pid}`);
    // });

    workers[i].on('setup',(o)=>{
        console.log(`setUp... ${o}`);
    });

    // workers[i].kill();
}



cluster.on('listening',(address)=>{
    console.log(`Listening... ${address}`);
});
