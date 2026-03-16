export default async function handler(req, res) {

const accessToken = "APP_USR-3786896236100040-031520-af925d59062b761ca86ccbfc4aa9b7cf-2218793350";

const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
method: "POST",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${accessToken}`
},
body: JSON.stringify({
items: [
{
title: "Rifa Solidária",
quantity: 1,
currency_id: "BRL",
unit_price: 5
}
]
})
});

const data = await response.json();

res.status(200).json({
link: data.init_point
});

}
