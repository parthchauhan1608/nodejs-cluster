const cluster = require('cluster');
const os = require('os');

const cpuslen =os.cpus().length;
let i,arr=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
let workers=[];

if(cluster.isMaster){
    console.log(`Number of CPU>>>>>>>>>>>>>>${cpuslen}`);
    //create workers
    for(i=0;i<cpuslen;i++){
        workers.push(cluster.fork());

        if(arr[0]){
            //assign work to worker or emit "message" event
            workers[i].send({id:i,msg:arr[0]});
            arr.shift();
        }
    }

    //listen master "message" event from worker
    cluster.on('message',(id)=>{
        if(arr[0]){
            //assign new task and emit "message" event
            cluster.workers[id.id].send({id:id.id,msg:arr[0]});
            arr.shift();
        }
        else{
            cluster.workers[id.id].kill();
        }
    });
}

if(cluster.isWorker){
    //listen worket "messagee" event from master
    process.on('message',(arg)=>{
        console.log(`${arg.id}>>>>${process.pid}>>>>>${arg.msg}`);
        //emit "message" event to master 
        process.send({id:arg.id});
    });
}