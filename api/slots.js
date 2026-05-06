const GAS_WEBAPP_URL = 'https://script.google.com/a/macros/urof.co.jp/s/AKfycbzVe5g22GZ-sYzOvk1I6sQ2XhB8SIqYTD_2FgBciRws4JZjT2WkoZZA1toERVgluKL6/exec';

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({
        success: false,
        message: 'Method Not Allowed'
      });
    }

    const response = await fetch(`${GAS_WEBAPP_URL}?action=slots`, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Accept: 'application/json'
      }
    });

    const text = await response.text();

    let json;
    try {
      json = JSON.parse(text);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `GAS slots の返却がJSONではありません。HTTP ${response.status} / ${text.slice(0, 300)}`
      });
    }

    return res.status(response.ok ? 200 : 500).json(json);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'slots API error'
    });
  }
}
