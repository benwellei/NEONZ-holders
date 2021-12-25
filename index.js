import fetch from 'node-fetch';
import * as fs from 'fs';

function getNeonzHolders() {
    const header = ['Address', 'Token ID'];
    const today = new Date();
    const path = `./logs/holders.csv`;

    if (!fs.existsSync('./logs')) {
        fs.mkdirSync('./logs');
        console.log('Logs directory created.');
    }
    
    fs.writeFileSync(path, `${header.join()}\n`, (err) => {
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