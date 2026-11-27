import { createHash, createCipheriv, createDecipheriv } from 'crypto';

let initOptions = {};

class Configure {
    constructor(options) {
        initOptions = options || {};
    }

    validate(key) {
return initOptions && initOptions[key]? true : false;
    }

    throwError(requirement) {
        throw new Error(`${requirement} is required to perform this action`);
    }

    encrypt(plainText) {
        if (this.validate('working_key') && plainText) {
            const { working_key } = initOptions;
            const m = createHash('md5');
            m.update(working_key);
            const key = m.digest();
            const iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
            const cipher = createCipheriv('aes-128-cbc', key, iv);
            let encoded = cipher.update(plainText, 'utf8', 'hex');
            encoded += cipher.final('hex');
            return encoded;
        } else if (!plainText) {
            this.throwError('Plain text');
            return false;
        } else {
            this.throwError('Working Key');
            return false;
        }
    }

    decrypt(encText) {
        if (this.validate('working_key') && encText) {
            const { working_key } = initOptions;
            const m = createHash('md5');
            m.update(working_key);
            const key = m.digest();
            const iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
            const decipher = createDecipheriv('aes-128-cbc', key, iv);
            let decoded = decipher.update(encText, 'hex', 'utf8');
            decoded += decipher.final('utf8');
            return decoded;
        } else if (!encText) {
            this.throwError('Encrypted text');
            return false;
        } else {
            this.throwError('Working Key');
            return false;
        }
    }

    redirectResponseToJson(response) {
        if (response) {
            // "key=value&key=value". Split each pair on its first "=" only, so values holding commas, quotes or
            // "=" (addresses, failure messages) arrive intact. The old comma-based split corrupted them.
            const ccavResponse = this.decrypt(response);
            return ccavResponse.split('&').reduce((o, pair) => {
                const at = pair.indexOf('=');
                if (at > 0) o[pair.slice(0, at).trim()] = pair.slice(at + 1).trim();
                return o;
            }, {});
        } else {
            this.throwError('CCAvenue encrypted response');
        }
    }

    getEncryptedOrder(orderParams) {
        if (this.validate('merchant_id') && orderParams) {
            // CCAvenue reads a raw key=value&key=value string, so a value containing & or = could smuggle in
            // extra parameters (for example a second amount). Strip those characters before joining.
            const safe = (value) => String(value ?? '').replace(/[&=\r\n]/g, ' ');
            let data = `merchant_id=${initOptions.merchant_id}`;
            data += Object.entries(orderParams).map(([key, value]) => `&${safe(key)}=${safe(value)}`).join('');
            return this.encrypt(data);

        } else if (!orderParams) {
            this.throwError('Order Params');
        } else {
            this.throwError('Merchant ID');
        }
    }

}

const CCAvenue = new Configure({
    // Prefer the server-only CCAVENUE_WORKING_KEY. The NEXT_PUBLIC_ name is kept as a fallback so nothing breaks,
    // but a NEXT_PUBLIC_ variable gets bundled into browser code if any client file ever references it.
    working_key: process.env.CCAVENUE_WORKING_KEY || process.env.NEXT_PUBLIC_CCAVENUE_WORKING_KEY,
    merchant_id: process.env.NEXT_PUBLIC_CCAVENUE_MERCHANT_ID,// Your Merchant ID from CCAvenue
});

export default CCAvenue;