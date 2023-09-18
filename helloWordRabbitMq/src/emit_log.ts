import * as ampq from 'amqplib'

const createExchangeAndSendMessage = async () => {
    const connect:ampq.Connection = await ampq.connect('amqp://localhost')
    const createChannel:ampq.Channel = await connect.createChannel()
    let exchange:string = 'logs'
    let msg = process.argv.slice(2).join(' ') || 'Hello World!'
    await createChannel.assertExchange(exchange,'fanout',{durable:false})
    //'' em publish signfica chave de roteamento, não precisa para o tipo de exchange fanout
    //fanout --> envia a mensagem para todas as filas que estão vinculadas ao intermediario
    createChannel.publish(exchange,'',Buffer.from(msg))
    console.log(' [x] Enviado %s',msg)
    setTimeout(()=>{
        connect.close()
        process.exit(0)
    ,500})
}


createExchangeAndSendMessage()