const { URL, URLSearchParams } = require('url');
const fetch = require('node-fetch');

async function search(params) {
    let searchParams = new URLSearchParams();
    for (let k of Object.keys(params)) {
        searchParams.set(k, params[k]);
    }

    let url = new URL('https://searchfox.org/mozilla-central/search');
    url.search = `?${searchParams}`;

    let response = await fetch(url, {
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01'
        }
    });

    return response.json();
}
exports.search = search;
