export async function onRequestGet(context) {
  const { env } = context;
  // KVから大会リストを取得（まだ何もなければ空配列を返す）
  const data = await env.TOURNAMENT_KV.get("tournaments_list");
  return new Response(data || "[]", {
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.text();
    // KVに大会リストを保存
    await env.TOURNAMENT_KV.put("tournaments_list", body);
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json;charset=UTF-8" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json;charset=UTF-8" }
    });
  }
}
