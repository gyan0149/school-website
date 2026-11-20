# School AI Worker

Cloudflare Worker that answers the website's AI questions (study helper, quiz, career guide,
scholarship helper, teacher tools, "ask the school") using Claude. The Anthropic API key is stored
as a Worker secret, so it never reaches the browser.

Without this Worker the website runs in **demo mode** (built-in sample answers).

## Deploy (one time)

```bash
cd ai-worker
npm install
npx wrangler login                          # opens Cloudflare in the browser
npx wrangler secret put ANTHROPIC_API_KEY   # paste the key from console.anthropic.com
npx wrangler kv namespace create RATE       # optional: per-visitor daily limit; paste the id into wrangler.toml
npx wrangler deploy                         # prints the Worker URL
```

Then build the website with that URL:

- GitHub Pages: add a repository variable `VITE_AI_URL` (Settings → Secrets and variables → Actions → Variables)
  with the Worker URL and re-run the deploy workflow.
- Local: `VITE_AI_URL=https://school-ai.<you>.workers.dev npm run dev`

## Settings (`wrangler.toml`)

| Variable | Meaning |
|---|---|
| `ALLOWED_ORIGINS` | Websites allowed to call the Worker |
| `MODEL` | Claude model (default `claude-opus-5-5`) |
| `DAILY_LIMIT_PER_IP` | Questions per visitor per day (needs the `RATE` KV namespace) |

Set a monthly spend limit in the Anthropic Console as a safety net.
