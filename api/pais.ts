import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const nome = req.query.nome;

    if (typeof nome !== 'string' || !nome) {
      return res.status(400).json({
        error: 'Informe o nome do país.'
      });
    }

    const apiKey = process.env.REST_COUNTRIES_API_KEY;

    console.log('API KEY EXISTE:', !!apiKey);
    console.log('PAÍS:', nome);

    if (!apiKey) {
      return res.status(500).json({
        error: 'REST_COUNTRIES_API_KEY não configurada na Vercel.'
      });
    }

    const url =
      `https://api.restcountries.com/countries/v5?q=${encodeURIComponent(nome)}&api-key=${apiKey}`;

    const response = await fetch(url);

    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (error) {
    console.error('ERRO NA FUNÇÃO /api/pais:', error);

    return res.status(500).json({
      error: 'Erro ao consultar a API de países.'
    });
  }
}