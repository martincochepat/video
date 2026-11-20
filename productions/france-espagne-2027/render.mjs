import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { bundle } from '@remotion/bundler';
import { openBrowser, selectComposition, renderMedia, renderStill } from '@remotion/renderer';
const root = path.resolve(import.meta.dirname, '../..');
process.chdir(root);
const dir = path.join(root, 'productions/france-espagne-2027'), quality = path.join(dir, 'quality'), delivery = path.join(dir, 'delivery');
for (const f of [quality, delivery])
    fs.mkdirSync(f, { recursive: true });
const mode = process.argv[2] ?? 'render', timing = JSON.parse(fs.readFileSync(path.join(dir, 'timings.json'))), frames = Math.round(timing.durationSeconds * 30);
const hash = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const write = (f, x) => fs.writeFileSync(path.join(dir, f), JSON.stringify(x, null, 2) + '\n');
const serveUrl = await bundle({ entryPoint: path.join(root, 'src/index.ts') });
const browser = await openBrowser('chrome', { browserExecutable: '/usr/bin/chromium' });
try {
    const opts = { serveUrl, puppeteerInstance: browser, browserExecutable: '/usr/bin/chromium' };
    const composition = await selectComposition({ ...opts, id: 'FranceSpainNews', inputProps: { qa: false } });
    if (mode === 'render') {
        let last = -1;
        const outputLocation = path.join(delivery, 'france-espagne-encore-eux-sans-audio.mp4');
        await renderMedia({ ...opts, composition, inputProps: { qa: false }, outputLocation, codec: 'h264', pixelFormat: 'yuv420p', colorSpace: 'bt709', imageFormat: 'png', crf: 17, muted: true, concurrency: 4, onProgress: p => { const n = Math.floor(p.progress * 10); if (n !== last) {
                last = n;
                console.log('Rendu ' + n * 10 + '%');
            } } });
        write('render-record.json', { sha256: hash(outputLocation), composition: 'FranceSpainNews', engine: 'Remotion 4.0.544', generatedAt: new Date().toISOString(), workingVoice: false, subtitles:false, audio:null });
    }
    if (mode !== 'render') {
        const times = new Set([0,.8,2.2,3.4,5.8,6.8,8.3,10.5,12.8,16.2,20.5,23.5,26.5,30.2,33.8,36,38.5,41.5,44.5,47.5,50.5,53.8,57.8,61.8,65.5,68.5,71.5,74.5,77.5,82.1,86,89.8]);
        for(const s of timing.scenes.slice(1)) for(const dt of [-.15,.15]) times.add(s.startSeconds+dt);
        const checks = [];
        for (const t of [...times].sort((a, b) => a - b)) {
            const frame = Math.min(frames - 1, Math.round(t * 30));
            let seen = false;
            await renderStill({ ...opts, composition: { ...composition, props: { qa: true } }, inputProps: { qa: true }, frame, imageFormat: 'png', output: path.join(quality, `frame-${String(frame).padStart(4, '0')}.png`), onBrowserLog: log => { if (log.text.startsWith('WORKSHOP_QA:')) {
                    const c = JSON.parse(log.text.slice(12));
                    checks.push(c);
                    seen = true;
                } } });
            assert.ok(seen, 'Sonde absente ' + frame);
        }
        const errors = checks.flatMap(c => c.errors.map(e => ({ frame: c.frame, error: e })));
        write('layout-checks.json', { checks, errors, subtitles: false });
        console.log(checks.length + ' sondes ; ' + errors.length + ' erreurs');
        assert.equal(errors.length, 0, JSON.stringify(errors));
        await renderStill({ ...opts, composition, frame: 180, imageFormat: 'png', output: path.join(delivery, 'couverture.png') });
    }
    if (mode !== 'stills') {
        const file = path.join(delivery, 'france-espagne-encore-eux-sans-audio.mp4'), info = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-count_frames', '-show_streams', '-show_format', '-of', 'json', file], { encoding: 'utf8' })), v = info.streams.find(s => s.codec_type === 'video'), a = info.streams.find(s => s.codec_type === 'audio');
        assert.equal(v.codec_name, 'h264');
        assert.equal(v.width, 1080);
        assert.equal(v.height, 1920);
        assert.equal(v.r_frame_rate, '30/1');
        assert.equal(v.pix_fmt, 'yuv420p');
        assert.equal(+v.nb_read_frames, frames);
        assert.ok(!a, 'Le MP4 doit être sans flux audio');
        assert.ok(!info.streams.some(s=>s.codec_type==='subtitle'), 'Aucun sous-titre');
        assert.ok(Math.abs(+info.format.duration - timing.durationSeconds) < .08);
        execFileSync('ffmpeg', ['-v', 'error', '-i', file, '-f', 'null', '-'], { stdio: ['ignore', 'pipe', 'pipe'] });
        write('technical.json', { sha256: hash(file), width: v.width, height: v.height, fps: 30, frames, videoDuration: frames / 30, containerDuration: +info.format.duration, pixelFormat: v.pix_fmt, colorRange: v.color_range, audio: null, subtitleStreams: 0, fullDecode: true });
        console.log('Décodage et paramètres MP4 OK');
    }
}
finally {
    await browser.close({ silent: true });
}
