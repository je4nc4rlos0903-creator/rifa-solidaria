export default async function handler(req, res){

  try {

    const { numeros } = req.body;

    if(!numeros || numeros.length === 0){
      return res.status(400).json({ error: "Sem números" });
    }

    // criar preferência no Mercado Pago
    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        },
        body: JSON.stringify({
          items: [
            {
              title: "Rifa Solidária",
              quantity: numeros.length,
              unit_price: 5
            }
          ],
          metadata: {
            numeros: numeros
          }
        })
      }
    );

    const data = await response.json();

    console.log("Resposta MP:", data);

    // retornar link de pagamento
    res.status(200).json({
      init_point: data.init_point
    });

  } catch (error) {

    console.error("Erro pagar:", error);

    res.status(500).json({ error: "Erro ao criar pagamento" });

  }

}
