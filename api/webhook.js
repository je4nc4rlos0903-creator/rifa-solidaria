import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

export default async function handler(req, res){

  try {

    const body = req.body;

    console.log("Webhook recebido:", body);

    if(body.type === "payment"){

      const paymentId = body.data?.id;

      if(!paymentId){
        return res.status(200).send("ok");
      }

      const payment = await mercadopago.payment.findById(paymentId);

      if(payment.body.status === "approved"){

        const numeros = payment.body.metadata?.numeros || [];

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

  } catch (error) {

    console.error("Erro no webhook:", error);

    res.status(500).json({ error: error.message });

  }

}
