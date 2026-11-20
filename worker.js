export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. 大会データ用 API (/api/data)
    if (url.pathname === "/api/data") {
      if (request.method === "GET") {
        const data = await env.TOURNAMENT_KV.get("tournaments_list");
        return new Response(data || "[]", {
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        });
      }

      if (request.method === "POST") {
        try {
          const body = await request.text();
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
    }

    // 2. 卓球場メンバー名簿用 API (/api/members)
    if (url.pathname === "/api/members") {
      if (request.method === "GET") {
        const data = await env.TOURNAMENT_KV.get("club_members");
        return new Response(data || "[]", {
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        });
      }

      if (request.method === "POST") {
        try {
          const body = await request.text();
          await env.TOURNAMENT_KV.put("club_members", body);
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
    }

    // それ以外はHTMLなどの静的アセットを返す
    return env.ASSETS.fetch(request);
  }
};
