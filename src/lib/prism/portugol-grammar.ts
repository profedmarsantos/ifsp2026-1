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

  number: /\b\d+(\.\d+)?\b/,

  boolean: /\b(verdadeiro|falso)\b/,

  keyword: /\b(programa|funcao|escreva|leia|inicio|fim|se|senao|entao|enquanto|para|faca|retorne|pare|caso|escolha|const|inclua|biblioteca)\b/,

  type: /\b(inteiro|real|cadeia|caracter|logico)\b/,

  builtin: /\b(limpa|pausa|sorteia|aleatorio)\b/,

  operator: /\b(e|ou|nao)\b|==|!=|<=|>=|\+|-|\*|\/|%|<|>|=/,

  'class-name': {
    pattern: /\b(Matematica|Graficos|Arquivos|Sons|Teclado|Mouse|Calendario|Internet)\b/,
    alias: 'builtin'
  },

  namespace: {
    pattern: /\b(Matematica|Graficos|Arquivos|Sons|Teclado|Mouse|Calendario|Internet)(?=\.)/,
    alias: 'class-name'
  },

  function: {
    pattern: /\b[a-zA-Z_]\w*(?=\s*\()/,
    greedy: true
  },

  property: {
    pattern: /(?<=\.)[a-zA-Z_]\w*/,
    alias: 'function'
  },

  constant: /\b(PI|VERDADEIRO|FALSO)\b/,

  array: {
    pattern: /\[[^\]]*\]/,
    inside: {
      number: /\b\d+\b/,
      punctuation: /[\[\],]/
    }
  },

  identifier: /\b[a-zA-Z_]\w*\b/,

  punctuation: /[{}[\];(),.:]/
}