import * as ampq from 'amqplib'

const consumerLogOfExchange = async () => {
    const connect:ampq.Connection = await ampq.connect('amqp://localhost')
    const createChannel:ampq.Channel = await connect.createChannel()
    let exchange:string = 'logs'
    await createChannel.assertExchange(exchange,'fanout',{durable:false})
    const assertQueue:ampq.Replies.AssertQueue = await createChannel.assertQueue('',{exclusive:true})// '' significa que rabbitmq vai dar um nome aleatorio para fila, exclusive true significa que ela será excluída quando a conexão com o consumidor for encerrada. 
    console.log("[x] Esperando por mensagens em %s. Pressione CTRL+C para sair da",assertQueue.queue)
    await createChannel.bindQueue(assertQueue.queue,exchange,'') // junta a nossa fila a uma intermediario(exchange) sem especificar uma chave de roteamento
    await createChannel.consume(assertQueue.queue,msg=>{
          if(msg?.content){
            console.log(" [x] Recebido %s",msg.content.toString())
          }
    },{noAck:true})

}

consumerLogOfExchange()