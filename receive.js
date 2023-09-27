const amqp = require("amqplib/callback_api");

amqp.connect(
  {
    protocol: "amqp",
    hostname: "rmq1.pptik.id",
    port: "5672",
    username: "shadoofpertanian",
    password: "TaniBertani19",
    vhost: "/shadoofpertanian",
  },
  (err0, conn) => {
    if (err0) throw err0;

    conn.createChannel((err1, channel) => {
      if (err1) throw err1;

      const queue = "jarak1";

      channel.assertQueue(queue);

      channel.consume(
        queue,
        (msg) => {
          console.log(" [x] Receive %s", msg.content.toString());
        },
        { noAck: true }
      );
    });
  }
);
