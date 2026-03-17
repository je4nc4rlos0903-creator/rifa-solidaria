import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

export default async function handler(req, res){

  const body = req.body;

  if(body.type === "payment"){

    const payment = await mercadopago.payment.findById(body.data.id);

    if(payment.body.status === "approved"){

      const numeros = payment.body.metadata.numeros;

      for(let num of numeros){
        await fetch(
          "https://qswajeisicdtsmmqokna.supabase.co/rest/v1/numeros_rifa?numero=eq."+num,
          {
            method:"PATCH",
            headers:{
              "Content-Type":"application/json",
              apikey:"sb_publishable_7VLK-dHs3ybJKV2eBcS00Q_RzwvrmD2",
              Authorization:"Bearer sb_publishable_7VLK-dHs3ybJKV2eBcS00Q_RzwvrmD2"
            },
            body: JSON.stringify({status:"pago"})
          }
        );
      }

    }
  }

  res.status(200).send("ok");
}
