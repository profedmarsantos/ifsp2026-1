export const portugolPrism = {

  comment: [
    {
      pattern: /\/\/.*/,
      greedy: true
    },
    {
      pattern: /\/\*[\s\S]*?\*\//,
      greedy: true
    }
  ],

  string: {
    pattern: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },

  'class-name': {
    pattern: /\b(Matematica|Graficos|Arquivos|Sons|Teclado|Mouse|Calendario|Internet)\b/,
    alias: 'builtin'
  },

  keyword: /\b(programa|funcao|inicio|fim|se|senao|entao|escolha|caso|enquanto|para|faca|pare|retorne|const|inclua|biblioteca)\b/,

  type: /\b(inteiro|real|cadeia|caracter|logico)\b/,

  boolean: /\b(verdadeiro|falso|nulo)\b/,

  builtin: /\b(escreva|leia|limpa|pausa|sorteia)\b/,

  function: {
    pattern: /\b[a-zA-Z_]\w*(?=\s*\()/,
    greedy: true
  },

  number: /\b\d+(\.\d+)?\b/,

  operator: /==|!=|<=|>=|&&|\|\||<<|>>|[-+*/%<>!=]=?/,

  punctuation: /[{}[\];(),.:]/,

  identifier: /\b[a-zA-Z_]\w*\b/
}