export default async function handler(req,res){

const supabaseUrl = "https://qswajeisicdtsmmqokna.supabase.co";

const response = await fetch(
supabaseUrl+"/rest/v1/numeros_rifa?status=eq.disponivel&select=numero",
{
headers:{
apikey:"sb_publishable_7VLK-dHs3ybJKV2eBcS00Q_RzwvrmD2",
Authorization:"Bearer sb_publishable_7VLK-dHs3ybJKV2eBcS00Q_RzwvrmD2"
}
}
);

const data = await response.json();

res.status(200).json({
disponiveis:data.length
});

}
