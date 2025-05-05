function sanitizeSQLValue(value) {
    if (typeof value !== 'string') return value;
  
    // Remove caracteres perigosos
    const sanitized = value.replace(/[^a-zA-Z0-9 _\-.,@]/g, '');
  
    // Lista estendida com palavras-chave perigosas
    const forbiddenWords = [
      'drop', 'delete', 'update', 'insert', 'truncate',
      'alter', 'create', 'exec', 'execute', 'select', 'union',
      'from', 'where', '--'
    ];
  
    // Verifica se alguma palavra proibida aparece isolada ou junto de espaços
    for (let word of forbiddenWords) {
      const pattern = new RegExp(`\\b${word}\\b`, 'i');
      if (pattern.test(sanitized)) {
        throw new Error(`Comando SQL perigoso detectado: ${word}`);
      }
    }
  
    return sanitized;
  }
  
  module.exports = sanitizeSQLValue