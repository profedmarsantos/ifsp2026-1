# Prism Portugol Addon

Addon para adicionar suporte à linguagem **Portugol** ao Prism.

Este addon registra a linguagem **portugol** no Prism para que código Portugol possa ser destacado da mesma forma que outras linguagens (C, JavaScript, Python etc).

O highlight utilizará **o tema global já configurado no Prism**, não sendo necessário nenhum CSS específico para Portugol.

Compatível com projetos que usam Prism para:

* visualização de código
* renderização de Markdown
* aplicações React
* aplicações Vite
* aplicações TypeScript

---

# Conteúdo do addon

A pasta `prism-addon-portugol` contém os seguintes arquivos:

```
prism-addon-portugol
 ├─ portugol-grammar.ts
 ├─ register-portugol.ts
 └─ README.md
```

Descrição dos arquivos:

| Arquivo                | Função                                                       |
| ---------------------- | -------------------------------------------------------------|
| `portugol-grammar.ts`  | Define a gramática da linguagem Portugol para o Prism        |
| `register-portugol.ts` | Registra a linguagem Portugol dentro do Prism  (em main.tsx  |
| `README.md`            | Instruções de uso                                            |

---

# Pré-requisitos

Este addon assume que o projeto **já utiliza Prism**.

Caso ainda não utilize, instale primeiro:

```
npm install prismjs
```

---

# Instalação

Copie os arquivos da pasta `prism-addon-portugol` para dentro do seu projeto.

Sugestão de estrutura:

```
src
 ├─ lib
 │   └─ prism
 │       ├─ portugol-grammar.ts
 │       └─ register-portugol.ts
```

---

# Registro da linguagem

Para que o Prism reconheça a linguagem **portugol**, é necessário registrar a gramática durante a inicialização da aplicação.

Importe o arquivo:

```
register-portugol.ts
```

no ponto de entrada do projeto (main.tsx).

Exemplo comum em projetos React + Vite:

Arquivo:

```
src/main.tsx
```

Adicionar:

```
import "./lib/prism/register-portugol"
```

Esse arquivo executa o registro da linguagem:

```
Prism.languages.portugol = portugolPrism
```

Após esse passo, o Prism passa a reconhecer a linguagem `portugol`.

Este registro precisa ser executado **apenas uma vez** durante a inicialização da aplicação.

---

# Tema de cores

Este addon **não utiliza CSS próprio**.

O highlight utiliza automaticamente **o tema global configurado no Prism**, o mesmo usado para todas as outras linguagens.

Exemplos de temas comuns do Prism:

* prism.css
* prism-tomorrow.css
* prism-okaidia.css

Se o seu projeto já possui um tema Prism carregado, o Portugol utilizará esse mesmo tema automaticamente.

---

# Uso em Markdown

Depois que a linguagem estiver registrada, basta usar blocos de código com o identificador `portugol`.

Exemplo:

````markdown
```portugol
programa
{
    funcao inicio()
    {
        inteiro a
        real b

        escreva("Digite um valor:")
        leia(a)

        se (a > 10 e a <= 20)
        {
            escreva("Valor dentro do intervalo")
        }
        senao
        {
            escreva("Valor fora do intervalo")
        }

        real r = Matematica.raiz(25)
    }
}
```
````

Quando o Markdown for renderizado, o Prism aplicará automaticamente o highlight.

---

# Uso em HTML

Também pode ser usado diretamente em HTML:

```
<pre>
<code class="language-portugol">
inteiro x = 10
escreva(x)
</code>
</pre>
```

---

# Observações

* O identificador da linguagem é **portugol**
* Deve ser usado exatamente assim em blocos de código
* O highlight depende do Prism estar ativo no renderizador

---

# Estrutura final recomendada

```
src
 ├─ lib
 │   └─ prism
 │       ├─ portugol-grammar.ts
 │       └─ register-portugol.ts
 │
 ├─ main.tsx
```

---

# Resultado

Após a instalação, qualquer código Portugol dentro de Markdown ou HTML será destacado automaticamente pelo Prism usando o tema global do projeto.
