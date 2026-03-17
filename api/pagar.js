export default async function handler(req, res){

  try {

    const { numeros, nome, telefone } = req.body;

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
            numeros,
            nome,
            telefone
          },

          back_urls: {
            success: "https://rifa-solidaria2.vercel.app/sucesso.html",
            failure: "https://rifa-solidaria2.vercel.app/erro.html",
            pending: "https://rifa-solidaria2.vercel.app/pendente.html"
          },

          auto_return: "approved"

        })
      }
    );

    const data = await response.json();

    res.status(200).json({
      init_point: data.init_point
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Erro ao criar pagamento" });

  }

}
