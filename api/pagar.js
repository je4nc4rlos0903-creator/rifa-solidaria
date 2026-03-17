import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: "SEU_ACCESS_TOKEN_AQUI"
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { numeros, total } = req.body;

  try {
    const pagamento = await mercadopago.preferences.create({
      items: [
        {
          title: "Rifa Solidária",
          quantity: numeros.length,
          unit_price: 5
        }
      ]
    });

    res.status(200).json({
      init_point: pagamento.body.init_point
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
