import * as ampq from 'amqplib'


async function addTask() {
    let queue:string = 'task_queue'
    let msg:any = process.argv.slice(2).join(' ') || "Hello World!"
    const connection:ampq.Connection = await ampq.connect('amqp://localhost')
    const channel = await connection.createChannel()
  await  channel.assertQueue(queue,{
        durable:true
    })
    channel.sendToQueue(queue,Buffer.from(msg),{
        persistent:true
    })
    console.log(" [x] Enviando '%s'", msg);
}


addTask()