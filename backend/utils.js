function sanitizeSQLValue(value) {
    if (typeof value !== 'string') {
        return value;
    }
    // Allow only alphanumeric and a few safe characters
    let sanitized = value.replace(/[^a-zA-Z0-9 _\-.,@]/g, '');
    // Prevent dangerous SQL keywords (case-insensitive)
    const forbidden = /\b(delete|update)\b/i;
    if (forbidden.test(sanitized)) {
        throw new Error('Potentially dangerous SQL keyword detected');
    }
    return sanitized;
}

module.exports = sanitizeSQLValue

