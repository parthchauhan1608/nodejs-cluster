const cluster = require('cluster');
const os = require('os');
const cpuslen =os.cpus().length;
let i,arr=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
let workers=[];


if(cluster.isWorker){
    process.on('message',(arg)=>{
        console.log(`${arg.id}>>>>${process.pid}>>>>>${arg.msg}`);
        process.send({id:arg.id});
    });
}

if(cluster.isMaster){
    for(i=0;i<cpuslen;i++){
        workers.push(cluster.fork());

        if(arr[0]){
            workers[i].send({id:i,msg:arr[0]});
            arr.shift();
        }
    }

    workers[0].on('message',(id)=>{
        if(arr[0]){
            recall();
            // cluster.workers[id.id].send({id:id.id,msg:arr[0]});
            // arr.shift();
        }
    });
}

function recall(){
    for(i in workers){
        if(arr[0]){
            workers[i].send({id:i,msg:arr[0]});
            arr.shift();
        }
    }
}