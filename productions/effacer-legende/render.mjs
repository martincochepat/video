import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { bundle } from '@remotion/bundler';
import { openBrowser, selectComposition, renderMedia, renderStill } from '@remotion/renderer';
const root = path.resolve(import.meta.dirname, '../..');
process.chdir(root);
const dir = path.join(root, 'productions/effacer-legende'), quality = path.join(dir, 'quality'), delivery = path.join(dir, 'delivery');
for (const f of [quality, delivery])
    fs.mkdirSync(f, { recursive: true });
const mode = process.argv[2] ?? 'render', timing = JSON.parse(fs.readFileSync(path.join(dir, 'timings.json'))), frames = Math.round(timing.durationSeconds * 30);
const hash = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const write = (f, x) => fs.writeFileSync(path.join(dir, f), JSON.stringify(x, null, 2) + '\n');
const serveUrl = await bundle({ entryPoint: path.join(root, 'src/index.ts') });
const browser = await openBrowser('chrome', { browserExecutable: '/usr/bin/chromium' });
try {
    const opts = { serveUrl, puppeteerInstance: browser, browserExecutable: '/usr/bin/chromium' };
    const composition = await selectComposition({ ...opts, id: 'EraseLegend', inputProps: { qa: false } });
    if (mode === 'render') {
        let last = -1;
        const outputLocation = path.join(delivery, 'ligue-onze-effacer-une-legende.mp4');
        await renderMedia({ ...opts, composition, inputProps: { qa: false }, outputLocation, codec: 'h264', pixelFormat: 'yuv420p', colorSpace: 'bt709', imageFormat: 'png', crf: 17, audioCodec: 'aac', audioBitrate: '192k', concurrency: 4, onProgress: p => { const n = Math.floor(p.progress * 10); if (n !== last) {
                last = n;
                console.log('Rendu ' + n * 10 + '%');
            } } });
        write('render-record.json', { sha256: hash(outputLocation), composition: 'EraseLegend', engine: 'Remotion 4.0.544', generatedAt: new Date().toISOString(), workingVoice: false, subtitles:false, audio:"original-instrumental-and-sfx" });
    }
    if (mode !== 'render') {
        const times = new Set([0,.6,1.3,2.2,3.3,3.9,4.5,78,81,87.8,4.9,5.03,5.1,23.03,23.1,41.03,41.1,59.03,59.1,77.03,77.1]);
        for(const start of [5,23,41,59]) for(const dt of [1.5,4,7.8,10,13.5,16.5]) times.add(start+dt);
        const checks = [];
        for (const t of [...times].sort((a, b) => a - b)) {
            const frame = Math.min(frames - 1, Math.round(t * 30));
            let seen = false;
            await renderStill({ ...opts, composition: { ...composition, props: { qa: true } }, inputProps: { qa: true }, frame, imageFormat: 'png', output: path.join(quality, `frame-${String(frame).padStart(4, '0')}.png`), onBrowserLog: log => { if (log.text.startsWith('WORKSHOP_QA:')) {
                    const c = JSON.parse(log.text.slice(12));
                    for (const b of c.boxes) {
                        if (b.y < 1600 && b.y + b.height > 1400)
                            c.errors.push('Habillage dans la zone de sous-titres : ' + b.text);
                    }
                    checks.push(c);
                    seen = true;
                } } });
            assert.ok(seen, 'Sonde absente ' + frame);
        }
        const errors = checks.flatMap(c => c.errors.map(e => ({ frame: c.frame, error: e })));
        write('layout-checks.json', { checks, errors, subtitleZone: [110, 1400, 820, 200] });
        console.log(checks.length + ' sondes ; ' + errors.length + ' erreurs');
        assert.equal(errors.length, 0, JSON.stringify(errors));
        await renderStill({ ...opts, composition, frame: 135, imageFormat: 'png', output: path.join(delivery, 'couverture.png') });
    }
    if (mode !== 'stills') {
        const file = path.join(delivery, 'ligue-onze-effacer-une-legende.mp4'), info = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-count_frames', '-show_streams', '-show_format', '-of', 'json', file], { encoding: 'utf8' })), v = info.streams.find(s => s.codec_type === 'video'), a = info.streams.find(s => s.codec_type === 'audio');
        assert.equal(v.codec_name, 'h264');
        assert.equal(v.width, 1080);
        assert.equal(v.height, 1920);
        assert.equal(v.r_frame_rate, '30/1');
        assert.equal(v.pix_fmt, 'yuv420p');
        assert.equal(+v.nb_read_frames, frames);
        assert.equal(a.codec_name, 'aac');
        assert.ok(Math.abs(+info.format.duration - timing.durationSeconds) < .08);
        execFileSync('ffmpeg', ['-v', 'error', '-i', file, '-f', 'null', '-'], { stdio: ['ignore', 'pipe', 'pipe'] });
        write('technical.json', { sha256: hash(file), width: v.width, height: v.height, fps: 30, frames, videoDuration: frames / 30, containerDuration: +info.format.duration, pixelFormat: v.pix_fmt, colorRange: v.color_range, audio: { codec: a.codec_name, sampleRate: a.sample_rate, channels: a.channels }, fullDecode: true });
        console.log('Décodage et paramètres MP4 OK');
    }
}
finally {
    await browser.close({ silent: true });
}
