import * as ampq from 'amqplib'


async function addTask() {
    let queue:string = 'task_queue'
    let msg:any = {
        "airConditioners": [
          {
            "brand": "Samsung",
            "code": "AC1234",
            "qualityIndex": 8.5
          },
          {
            "brand": "LG",
            "code": "AC5678",
            "qualityIndex": 9.2
          },
          {
            "brand": "Daikin",
            "code": "AC9101",
            "qualityIndex": 9.8
          },
          {
            "brand": "Mitsubishi",
            "code": "AC2468",
            "qualityIndex": 7.9
          }
        ]
      }
    const connection:ampq.Connection = await ampq.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await  channel.assertQueue(queue,{
        durable:true
    })
    channel.sendToQueue(queue,Buffer.from(JSON.stringify(msg)),{
        persistent:true
    })
    console.log(" [x] Enviando '%s'", msg);
    setTimeout(()=>{
        connection.close()
        process.exit(0)
    },500)
}


addTask()