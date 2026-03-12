const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Некорректный email' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('UNISENDER_API_KEY');
    if (!apiKey) {
      throw new Error('UNISENDER_API_KEY is not configured');
    }

    const params = new URLSearchParams({
      format: 'json',
      api_key: apiKey,
      'list_ids': '3',
      'fields[email]': email.trim(),
      double_optin: '3',
      overwrite: '1',
    });

    const response = await fetch(
      `https://api.unisender.com/ru/api/subscribe?${params.toString()}`,
      { method: 'POST' }
    );

    const data = await response.json();

    if (data.error) {
      console.error('Unisender subscribe error:', data);
      return new Response(
        JSON.stringify({ error: data.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, person_id: data.result?.person_id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Subscribe error:', error);
    return new Response(
      JSON.stringify({ error: 'Ошибка сервера' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
