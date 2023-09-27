const amqp = require("amqplib/callback_api");
const express = require("express");
const app = express();
const PORT = 3001;
var cors = require("cors");

app.use(cors());
app.use(express.json());

const rabbitmq = (msg) =>
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
      if (err0) {
        console.log({ err0 });
        throw err0;
      }

      conn.createChannel((err1, channel) => {
        if (err1) throw err1;

        const queue = "jarak1";
        // const msg = "hello, world";
        // channel.assertQueue(queue, { durable: true });

        // const msg = "1";
        const exchange = "amq.topic";
        const key = "shaker";
        channel.assertExchange(exchange, "topic", { durable: true });
        channel.publish(exchange, key, Buffer.from(msg));
        // channel.sendToQueue(queue, Buffer.from(msg.toString()));
        console.log(" [x] Sent %s", msg);
      });
    }
  );

// amqp://user:pass@host.com/vhost
// amqp.connect(
//   {
//     protocol: "amqp",
//     hostname: "rmq1.pptik.id",
//     port: "5672",
//     username: "shadoofpertanian",
//     password: "TaniBertani19",
//     vhost: "/shadoofpertanian",
//   },
//   (err0, conn) => {
//     if (err0) {
//       console.log({ err0 });
//       throw err0;
//     }

//     conn.createChannel((err1, channel) => {
//       if (err1) throw err1;

//       const queue = "jarak1";
//       const msg = "1";
//       const exchange = "amq.topic";
//       const key = "shaker";
//       // channel.assertQueue(queue);
//       channel.assertExchange(exchange, "topic", { durable: true });
//       setInterval(() => {
//         channel.publish(exchange, key, Buffer.from(msg));
//         console.log(" [x] Sent %s", msg);
//       }, 3000);

//       // setInterval(() => {
//       //   channel.sendToQueue(queue, Buffer.from(msg.toString()));
//       //   console.log(" [x] Sent %s", "on");
//       // }, 3000);
//     });
//   }
// );

app.post("/", async (req, res) => {
  // console.log("data kecepatan", req.body);
  try {
    rabbitmq(req.body.msg);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});
app.post("/active", async (req, res) => {
  // console.log("data kecepatan", req.body);
  try {
    rabbitmq(req.body.msg);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(PORT, () => console.log("listening on port 3001"));
