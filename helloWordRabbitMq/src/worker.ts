import * as ampq from 'amqplib'

async function worker() {
    let queue:string = 'task_queue'
    const connection:ampq.Connection = await ampq.connect('amqp://localhost')
    const channel:ampq.Channel = await connection.createChannel()
  await  channel.assertQueue(queue,{
        durable:true
    })
    channel.prefetch(1) //sem espera de envio de mensagens, caso um worker esteja ocupado, o rabbitmq despacha para outro worker
   console.log("[*] Esperando por mensangens e, %s. Para sair pressione CTRL+C",queue)
   await channel.consume(queue,function(msg){
        if(msg){
            let secs  = msg.content.toString().split('.').length - 1
            console.log(" [x] Recebido %s",msg.content.toString())
            console.log(secs)
            setTimeout(function(){
                console.log(" [x] Concluido")
                channel.ack(msg) //quando noAck é false o consumidor precisa confirmar cada mensagem recebida
            }, secs * 1000)
        }
        else{
            console.log('Mensagem vazia')
        }
    },{noAck:false}
)
}


worker()