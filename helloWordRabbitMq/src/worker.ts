import * as ampq from 'amqplib'

async function worker() {
    let queue:string = 'task_queue'
    const connection:ampq.Connection = await ampq.connect('amqp://localhost')
    const channel:ampq.Channel = await connection.createChannel()
  await  channel.assertQueue(queue,{
        durable:true
    })
   await channel.consume(queue,function(msg){
        if(msg){
            let secs  = msg.content.toString().split('.').length - 1
            console.log(" [x] Recebido %s",msg.content.toString())
            console.log(secs)
            setTimeout(function(){
                console.log(" [x] Concluido")
            }, secs * 1000)
        }
        else{
            console.log('Mensagem vazia')
        }
    },{noAck:true}
)
}


worker()