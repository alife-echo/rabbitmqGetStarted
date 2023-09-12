import * as amqp from 'amqplib';

async function enviarMensagem() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue:string = 'hello';
    const msg:string = 'Hello world';

    await channel.assertQueue(queue, {
      durable: false
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);

    await channel.close();
    await connection.close();

    setTimeout(function() {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error('Houve um erro:', error);
  }
}

enviarMensagem();
