export default async function handler(req,res){

const supabaseUrl = "https://qswajeisicdtsmmqokna.supabase.co";

const response = await fetch(
supabaseUrl+"/rest/v1/numeros_rifa?status=eq.disponivel&select=numero",
{
headers:{
apikey:"SUA_CHAVE_PUBLICA",
Authorization:"Bearer SUA_CHAVE_PUBLICA"
}
}
);

const data = await response.json();

res.status(200).json({
disponiveis:data.length
});

}
