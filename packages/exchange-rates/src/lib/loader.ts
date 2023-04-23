import { request } from 'node:https';

import { HttpGetInput } from './types';

export function httpGet({ url, headers }: HttpGetInput): Promise<string> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        const cRequest = request(url, { method: 'GET', headers: headers, timeout: 6500 }, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
            response.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        });
        cRequest.on('error', (err) => reject(err));
        cRequest.end();
    });
}
