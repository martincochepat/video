import {Config} from '@remotion/cli/config';
// Le Chromium fourni par la machine évite un téléchargement réseau au rendu.
Config.setBrowserExecutable('/usr/bin/chromium');
