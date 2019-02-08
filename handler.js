// Add security headers to CloudFront distribution - apply to Origin Response event.

exports.handler = async (event) => {
    // Get contents of response
    let response = event.Records[0].cf.response
    let headers = response.headers

    // Set new headers 
    headers['strict-transport-security'] = [{key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubdomains; preload'}];
    headers['x-content-type-options'] = [{key: 'X-Content-Type-Options', value: 'nosniff'}]
    headers['x-frame-options'] = [{key: 'X-Frame-Options', value: 'DENY'}]
    headers['x-xss-protection'] = [{key: 'X-XSS-Protection', value: '1; mode=block'}]
    headers['referrer-policy'] = [{key: 'Referrer-Policy', value: 'same-origin'}]

    // Return modified response
    return response
}
