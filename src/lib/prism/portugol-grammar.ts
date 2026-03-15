export const portugolPrism = {
	comment: [
		{ pattern: /\/\/.*/, greedy: true },
		{ pattern: /\/\*[\s\S]*?\*\//, greedy: true }
	],

	string: {
		pattern: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},

	number: /\b\d+(\.\d+)?\b/,

	boolean: /\b(verdadeiro|falso)\b/,

	namespace: {
		pattern: /\b(Arquivos|Calendario|Graficos|Internet|Matematica|Mouse|Objetos|ServicosWeb|Sons|Teclado|Texto|Tipos|Util)(?=\.)/,
		alias: 'class-name'
	},

	'class-name': {
		pattern: /\b(Arquivos|Calendario|Graficos|Internet|Matematica|Mouse|Objetos|ServicosWeb|Sons|Teclado|Texto|Tipos|Util)\b/,
		alias: 'builtin'
	},

	keyword: /\b(programa|funcao|se|senao|enquanto|faca|para|escolha|caso|contrario|pare|retorne|constante|inclua|biblioteca)\b/,

	type: /\b(inteiro|real|vazio|logico|cadeia|caracter)\b/,

	operator: /\b(e|ou|nao)\b|==|!=|<=|>=|\+|-|\*|\/|%|<|>|=\+|-=|\*=|\/=|\+\+|--/,

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