import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { bundle } from '@remotion/bundler';
import { openBrowser, selectComposition, renderMedia, renderStill } from '@remotion/renderer';
const root = path.resolve(import.meta.dirname, '../..');
process.chdir(root);
const dir = path.join(root, 'productions/trois-pronostics'), quality = path.join(dir, 'quality'), delivery = path.join(dir, 'delivery');
for (const p of [quality, delivery])
    fs.mkdirSync(p, { recursive: true });
const write = (p, d) => fs.writeFileSync(p, JSON.stringify(d, null, 2) + '\n');
const mode = process.argv[2] ?? 'render';
assert.ok(['render', 'inspect', 'stills'].includes(mode));
const hash = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const serveUrl = await bundle({ entryPoint: path.join(root, 'src/index.ts') });
const browser = await openBrowser('chrome', { browserExecutable: '/usr/bin/chromium' });
try {
    const opts = { serveUrl, puppeteerInstance: browser, browserExecutable: '/usr/bin/chromium' };
    const composition = await selectComposition({ ...opts, id: 'ThreePredictions', inputProps: { qa: false, cover: false } });
    if (mode === 'render') {
        const outputLocation = path.join(delivery, 'ligue-onze-3-pronostics.mp4');
        let previous = -1;
        await renderMedia({ ...opts, composition, inputProps: { qa: false, cover: false }, outputLocation, codec: 'h264', pixelFormat: 'yuv420p', colorSpace: 'bt709', imageFormat: 'png', crf: 17, audioCodec: 'aac', audioBitrate: '192k', concurrency: 2, overwrite: true, onProgress: p => { const n = Math.floor(p.progress * 10); if (n !== previous) {
                previous = n;
                console.log(`Rendu ${n * 10}%`);
            } } });
        write(path.join(dir, 'render-record.json'), { generatedAt: new Date().toISOString(), sha256: hash(outputLocation), engine: 'Remotion 4.0.544', composition: 'ThreePredictions', fps: 30, duration: 27, audio: 'original-sfx-no-voice-no-music' });
    }
    const checks = [];
    const times = [0, .5, 1.5, 2.8, 3.05, 3.3, 3.85, 4.8, 7.8, 8.05, 8.3, 8.85, 9.8, 12.8, 13.05, 13.3, 13.85, 14.8, 17.8, 18.05, 18.3, 19.2, 21.5, 23.8, 24.05, 24.4, 25.5, 26.966];
    for (const t of times) {
        const frame = Math.min(809, Math.round(t * 30));
        let seen = false;
        await renderStill({ ...opts, composition: { ...composition, props: { qa: true, cover: false } }, frame, inputProps: { qa: true, cover: false }, imageFormat: 'png', output: path.join(quality, `frame-${String(frame).padStart(3, '0')}.png`), onBrowserLog: log => { if (log.text.startsWith('WORKSHOP_QA:')) {
                const c = JSON.parse(log.text.slice(12));
                for (const b of c.boxes)
                    if (b.y < 1570 && b.y + b.height > 1350 && b.x < 935 && b.x + b.width > 100)
                        c.errors.push('Texte dans la zone réservée aux sous-titres : ' + b.text);
                checks.push(c);
                seen = true;
            } } });
        assert.ok(seen, 'Sonde absente ' + frame);
    }
    await renderStill({ ...opts, composition: { ...composition, props: { qa: true, cover: true } }, frame: 60, inputProps: { qa: true, cover: true }, imageFormat: 'png', output: path.join(delivery, 'couverture.png') });
    const errors = checks.flatMap(c => c.errors.map(error => ({ frame: c.frame, error })));
    write(path.join(dir, 'layout-checks.json'), { samples: times.length, checks, errors, subtitleReservedArea: [100, 1350, 835, 220], limitations: ['Mesure HTML aux instants échantillonnés. Les éléments masqués par un ancêtre peuvent être signalés hors cadre durant les transitions.', 'Une zone réservée ne prouve pas la synchronisation de sous-titres futurs.'] });
    console.log('Images et sondes : ' + checks.length + ' ; erreurs : ' + errors.length);
    assert.equal(errors.length, 0, JSON.stringify(errors));
    if (mode !== 'stills') {
        const mp4 = path.join(delivery, 'ligue-onze-3-pronostics.mp4');
        const record = JSON.parse(fs.readFileSync(path.join(dir, 'render-record.json')));
        assert.equal(hash(mp4), record.sha256);
        const info = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-count_frames', '-show_streams', '-show_format', '-of', 'json', mp4], { encoding: 'utf8' })), v = info.streams.find(s => s.codec_type === 'video'), a = info.streams.find(s => s.codec_type === 'audio');
        assert.equal(v.width, 1080);
        assert.equal(v.height, 1920);
        assert.equal(v.r_frame_rate, '30/1');
        assert.equal(v.codec_name, 'h264');
        assert.equal(v.pix_fmt, 'yuv420p');
        assert.equal(v.color_range, 'tv');
        assert.equal(+v.nb_read_frames, 810);
        assert.ok(Math.abs(+info.format.duration - 27) < .08);
        assert.equal(a.codec_name, 'aac');
        execFileSync('ffmpeg', ['-v', 'error', '-i', mp4, '-f', 'null', '-'], { stdio: ['ignore', 'pipe', 'pipe'] });
        write(path.join(dir, 'technical.json'), { sha256: hash(mp4), width: v.width, height: v.height, fps: v.r_frame_rate, frames: +v.nb_read_frames, codec: v.codec_name, pixelFormat: v.pix_fmt, colorSpace: v.color_space, colorRange: v.color_range, duration: +info.format.duration, audio: { codec: a.codec_name, sampleRate: a.sample_rate, channels: a.channels }, fullDecode: true, layoutErrors: errors.length });
        console.log('MP4 : 1080×1920 / 30 fps / 810 images / H.264 / yuv420p / AAC ; décodage complet OK');
    }
}
finally {
    await browser.close({ silent: true });
}
