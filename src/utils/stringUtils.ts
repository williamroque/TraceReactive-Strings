export function unescapeString(str: string): string {
    if (typeof str !== 'string') return str;
    return str.replace(/\\(.)/g, (match, p1) => {
        switch (p1) {
            case 'n': return '\n';
            case 'r': return '\r';
            case 't': return '\t';
            case '\\': return '\\';
            default: return match;
        }
    });
}
