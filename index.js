import fetch from 'node-fetch';
import * as fs from 'fs';

function getNeonzHolders() {
    if (!fs.existsSync('./log')) {
        fs.mkdirSync('./log');
        console.log('Logs directory created.');
    }

    const header = ['Address', 'Token ID'];
    const path = './log/holders.csv';

    fs.writeFile(path, `${header.join()}\n`, (err) => {
        if (err) throw err;
    });

    fetch('https://api.tzkt.io/v1/contracts/KT1MsdyBSAMQwzvDH4jt2mxUKJvBSWZuPoRJ/bigmaps/ledger/keys?limit=10000')
        .then(res => res.json())
        .then(res => {
            const out = fs.createWriteStream(path, {flags: 'a'});

            res.forEach(r => {
                let data = [r.value, r.key];
                let row = data.join() + "\n";
                out.write(row);
            });

            out.end();
        })
}

getNeonzHolders();