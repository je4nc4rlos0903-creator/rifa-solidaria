export default async function handler(req, res){

  try {

    const body = req.body;

    if(body.type === "payment"){

      const paymentId = body.data?.id;

      if(!paymentId){
        return res.status(200).send("ok");
      }

      const response = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers:{
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
          }
        }
      );

      const payment = await response.json();

      if(payment.status === "approved"){

        const numeros = payment.metadata?.numeros || [];
        const nome = payment.metadata?.nome || "";

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
              body: JSON.stringify({
                status:"pago",
                nome: nome
              })
            }
          );

        }

      }

    }

    res.status(200).send("ok");

  } catch (error) {

    console.error(error);
    res.status(200).send("erro tratado");

  }

}
