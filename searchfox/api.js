/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

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
