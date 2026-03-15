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

	namespace: {
		pattern: /\b(Matematica|Graficos|Arquivos|Sons|Teclado|Mouse|Calendario|Internet)(?=\.)/,
		alias: 'class-name'
	},

	'class-name': {
		pattern: /\b(Matematica|Graficos|Arquivos|Sons|Teclado|Mouse|Calendario|Internet)\b/,
		alias: 'builtin'
	},

	keyword: /\b(programa|funcao|se|senao|entao|enquanto|para|faca|retorne|pare|caso|escolha|const|inclua|biblioteca)\b/,

	// ← NOVO TOKEN: tipos de dados com cor separada!
	type: /\b(inteiro|real|cadeia|caracter|logico)\b/,

	operator: /\b(e|ou|nao)\b|==|!=|<=|>=|\+|-|\*|\/|%|<|>|=/,

	constant: /\b(PI|VERDADEIRO|FALSO)\b/,

	function: {
		pattern: /\b[a-zA-Z_]\w*(?=\s*\()/,
		greedy: true
	},

	array: {
		pattern: /\[[^\]]*\]/,
		inside: {
			number: /\b\d+\b/,
			punctuation: /[\[\],]/
		}
	},

	property: {
		pattern: /(?<=\.)[a-zA-Z_]\w*/,
		alias: 'function'
	},

	identifier: /\b[a-zA-Z_]\w*\b/,

	punctuation: /[{}[\];(),.:]/
};