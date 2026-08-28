const os = require('os');
let qrcode;
try {
  qrcode = require('qrcode');
} catch (e) {
  // qrcode not installed yet
}

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  const candidates = [];

  for (const [name, addrs] of Object.entries(interfaces)) {
    if (!addrs) continue;
    for (const addr of addrs) {
      const isIPv4 = addr.family === 'IPv4' || addr.family === 4;
      if (isIPv4 && !addr.internal) {
        const isVirtual = /virtual|vbox|vmware|hyper-v|wsl|docker|tailscale|loopback|pseudo/i.test(name);
        const isStandardPrivate = addr.address.startsWith('192.168.') || addr.address.startsWith('10.') || /^172\.(1[6-9]|2\d|3[0-1])\./.test(addr.address);
        candidates.push({
          name,
          address: addr.address,
          isVirtual,
          isStandardPrivate,
          score: (!isVirtual ? 10 : 0) + (isStandardPrivate ? 5 : 0) + (/wi-fi|wifi|wireless|wlan/i.test(name) ? 3 : 0) + (/ethernet|eth|conex/i.test(name) ? 2 : 0)
        });
      }
    }
  }

  candidates.sort((a, b) => b.score - a.score);
  return candidates.length > 0 ? candidates[0].address : 'localhost';
}

const port = process.env.PORT || 3000;
const ip = getLocalIp();
const networkUrl = `http://${ip}:${port}`;
const localUrl = `http://localhost:${port}`;

const title = process.argv[2] || 'SERVIDOR LOCAL';

console.log('');
console.log('============================================================');
console.log(`              ${title.toUpperCase()}              `);
console.log('============================================================');
console.log('');

if (qrcode) {
  qrcode.toString(networkUrl, { type: 'terminal', small: true }, (err, qr) => {
    if (!err && qr) {
      console.log('  📱 ESCANEIE COM A CAMERA DO SEU CELULAR:\n');
      console.log(qr);
    }
    printInfo();
  });
} else {
  printInfo();
}

function printInfo() {
  console.log('  🌐 ACESSO NO CELULAR:     ' + networkUrl);
  console.log('  💻 ACESSO NO COMPUTADOR:  ' + localUrl);
  console.log('');
  console.log('  💡 Dica: O celular e o PC devem estar conectados no mesmo Wi-Fi.');
  console.log('============================================================');
  console.log('');
}
