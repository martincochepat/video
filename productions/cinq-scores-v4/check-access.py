"""Read-only connectivity check with inherited proxy settings; no policy changes."""
from pathlib import Path
import concurrent.futures
import json
import subprocess
from datetime import datetime, timezone
p = Path(__file__).resolve().parent
sources = json.loads((p / 'sources.json').read_text())['requests']
def check(source):
    result = subprocess.run(['curl', '-sSL', '--max-time', '20', '-o', '/dev/null', '-w', '%{http_code}', source['url']], capture_output=True, text=True)
    return {'id': source['id'], 'url': source['url'], 'http': result.stdout, 'error': result.stderr.strip(), 'reachable': result.returncode == 0 and result.stdout == '200'}
with concurrent.futures.ThreadPoolExecutor(max_workers=7) as pool:
    results = list(pool.map(check, sources))
print(json.dumps({'checkedAt': datetime.now(timezone.utc).isoformat(), 'requests': results, 'note': 'Une page accessible ne signifie pas que son contenu ou les licences ont été vérifiés.'}, ensure_ascii=False, indent=2))
