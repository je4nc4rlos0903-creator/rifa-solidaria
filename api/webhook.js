export default async function handler(req, res){

  try {

    console.log("Webhook:", req.body);

    res.status(200).send("ok");

  } catch (e) {
    console.log(e);
    res.status(500).send("erro");
  }

}
