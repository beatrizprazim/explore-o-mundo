import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log('FUNÇÃO /api/pais INICIOU');

  try {
    console.log('QUERY:', req.query);

    const nome = req.query.nome;

    if (typeof nome !== 'string' || nome.trim() === '') {
      return res.status(400).json({
        etapa: 'validacao',
        erro: 'Informe o nome do país.'
      });
    }

    console.log('PAÍS RECEBIDO:', nome);

    const apiKey = process.env.REST_COUNTRIES_API_KEY;

    console.log('API KEY EXISTE:', !!apiKey);

    if (!apiKey) {
      return res.status(500).json({
        etapa: 'environment',
        erro: 'REST_COUNTRIES_API_KEY não encontrada.'
      });
    }

    const url =
      `https://api.restcountries.com/countries/v5?q=${encodeURIComponent(nome)}&api-key=${apiKey}`;

    console.log('VAI CHAMAR REST COUNTRIES');

    const response = await fetch(url);

    console.log('RESPOSTA RECEBIDA:', response.status);

    const data = await response.json();

    console.log('JSON RECEBIDO');

    return res.status(response.status).json(data);

  } catch (error) {
    console.error('ERRO COMPLETO:', error);

    return res.status(500).json({
      etapa: 'catch',
      erro: error instanceof Error ? error.message : String(error)
    });
  }
}