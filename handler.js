// Add security headers to CloudFront distribution - apply to Origin Response event.

exports.handler = async (event) => {
    // Get contents of response
    let response = event.Records[0].cf.response
    let headers = response.headers

    // Set new headers 
    // Fix syntax by this ref : https://stackoverflow.com/questions/45715973/the-lambda-function-returned-an-invalid-request-or-response-to-cloudfront
    headers['strict-transport-security'] = [{
        key: 'Strict-Transport-Security', 
        value: "max-age=31536000; includeSubdomains; preload"
    }];

    headers['content-security-policy'] = [{
        key: 'Content-Security-Policy', 
        value: "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'"
    }];
    
    headers['x-content-type-options'] = [{
        key: 'X-Content-Type-Options',
        value: "nosniff"
    }];
    
    headers['x-frame-options'] = [{
        key: 'X-Frame-Options',
        value: "DENY"
    }];
    
    headers['referrer-policy'] = [{
        key: 'Referrer-Policy',
        value: "same-origin"
    }];

    // Return modified response
    return response
}
