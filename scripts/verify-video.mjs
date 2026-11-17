import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const path = 'out/le-studio-est-pret.mp4';
const info = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-count_frames', '-show_streams', '-show_format', '-of', 'json', path], {encoding: 'utf8'}));
const video = info.streams.find((s) => s.codec_type === 'video');
assert.equal(video.width, 1080);
assert.equal(video.height, 1920);
assert.equal(video.codec_name, 'h264');
// ffprobe utilise yuvj420p pour du YUV 4:2:0 marqué pleine plage.
assert.ok(['yuv420p', 'yuvj420p'].includes(video.pix_fmt));
assert.equal(video.r_frame_rate, '30/1');
assert.equal(Number(video.nb_read_frames), 90);
assert.equal(Number(info.format.duration), 3);
assert.equal(info.streams.filter((s) => s.codec_type === 'audio').length, 0);
console.log('MP4 vérifié : H.264, 1080 × 1920, 30 fps, 90 images, 3 secondes, sans piste audio.');

// Décoder le MP4, pas seulement ses métadonnées, et contrôler le fondu.
const brightness = (time) => {
  const pixels = execFileSync('ffmpeg', ['-v', 'error', '-ss', String(time), '-i', path, '-frames:v', '1', '-vf', 'crop=1080:180:0:870', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], {maxBuffer: 4 * 1024 * 1024});
  assert.equal(pixels.length, 1080 * 180 * 3);
  return pixels.reduce((sum, value) => sum + value, 0) / pixels.length;
};
const start = brightness(0);
const during = brightness(0.2);
const end = brightness(1.5);
assert.ok(during > start + 1, 'Le titre doit apparaître');
assert.ok(end > during + 1, 'Le fondu doit progresser');
console.log('Décodage et progression du fondu vérifiés.', {start, during, end});
