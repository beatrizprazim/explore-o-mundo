export default async function handler(req, res) {
  try {
    const nome = req.query.nome;

    if (!nome) {
      return res.status(400).json({
        error: 'Informe o nome do país.'
      });
    }

    const apiKey = process.env.REST_COUNTRIES_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'REST_COUNTRIES_API_KEY não encontrada.'
      });
    }

    const url =
      'https://api.restcountries.com/countries/v5?q=' +
      encodeURIComponent(nome) +
      '&api-key=' +
      apiKey;

    const response = await fetch(url);
    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (error) {
    console.error('ERRO:', error);

    return res.status(500).json({
      error: error instanceof Error ? error.message : String(error)
    });
  }
}