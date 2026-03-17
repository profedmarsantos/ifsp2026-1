### **Tutorial da Aula: Operadores Aritméticos, Relacionais e Lógicos**

**Pré-requisitos:** Variáveis, Tipos de Dados (`int`, `float`), Entrada/Saída (`scanf`, `printf`).

---

### 1. Fundamentação Teórica

Um operador é um símbolo que instrui o compilador a realizar uma operação matemática, lógica ou de comparação específica sobre um ou mais operandos (variáveis ou constantes). O domínio destes operadores é essencial para a construção de expressões válidas em C.

#### **1.1 Operadores Aritméticos**
Utilizados para realizar cálculos matemáticos. Em C, operam conforme a álgebra tradicional, com atenção especial à divisão inteira e ao módulo.

| Operador | Símbolo em C | Descrição | Exemplo (C) | Resultado |
| :--- | :---: | :--- | :--- | :--- |
| Adição | `+` | Soma dois valores | `5 + 3` | `8` |
| Subtração | `-` | Subtrai o segundo do primeiro | `10 - 4` | `6` |
| Multiplicação | `*` | Multiplica dois valores | `3 * 4` | `12` |
| Divisão | `/` | Divide o primeiro pelo segundo | `10 / 2` | `5` |
| Módulo (Resto) | `%` | Retorna o resto da divisão inteira | `10 % 3` | `1` |

**Atenção Crítica: Divisão Inteira vs. Real**
Em C, se **ambos** os operandos da divisão (`/`) forem inteiros (`int`), o resultado será truncado para um inteiro, descartando a parte decimal.
*   Exemplo Errado (para reais): `5 / 2` resulta em `2`.
*   Para obter `2.5`, pelo menos um dos operandos deve ser tratado como ponto flutuante (`float` ou `double`).

Existem três formas principais de garantir essa conversão em C:

1.  **Uso de literal com ponto decimal:** `5.0 / 2`. O compilador interpreta `5.0` como `double` por padrão.
2.  **Uso de cast explícito:** `(float)5 / 2`. Força a conversão do inteiro para float antes da operação.
3.  **Uso de sufixo de tipo:** `5 / 2.f`. O sufixo `f` (ou `F`) anexado ao número indica explicitamente que aquele literal é do tipo `float`.

**Detalhamento do sufixo `.f`:**
Ao escrever `2.f`, o compilador entende imediatamente que o operando da direita é um `float`. Diante de uma operação binária onde um operando é `int` (`5`) e o outro é `float` (`2.f`), ocorre a promoção aritmética usual: o operando inteiro é convertido para `float` (`5.0f`) e a divisão é realizada em precisão simples, resultando em `2.5f`.

*Nota:* O operador Módulo (`%`) só pode ser utilizado com operandos inteiros. Seu uso com `float` gerará erro de compilação.

#### **1.2 Operadores Relacionais**
Utilizados para comparar dois valores. O resultado de uma operação relacional é sempre lógico (Booleano): Verdadeiro (`1`) ou Falso (`0`). Neste estágio inicial, tratamos o resultado como numérico.

| Operador | Símbolo em C | Descrição | Exemplo (Suponha A=5, B=10) | Resultado (Valor Lógico) |
| :--- | :---: | :--- | :--- | :--- |
| Igual a | `==` | Verifica se os valores são iguais | `A == B` | `0` (Falso) |
| Diferente de | `!=` | Verifica se os valores são diferentes | `A != B` | `1` (Verdadeiro) |
| Maior que | `>` | Verifica se o esquerdo é maior | `A > B` | `0` (Falso) |
| Menor que | `<` | Verifica se o esquerdo é menor | `A < B` | `1` (Verdadeiro) |
| Maior ou igual | `>=` | Verifica se é maior ou igual | `A >= 5` | `1` (Verdadeiro) |
| Menor ou igual | `<=` | Verifica se é menor ou igual | `B <= 9` | `0` (Falso) |

**Erro Comum:** Confundir o operador de atribuição (`=`) com o operador de igualdade (`==`).
*   `x = 5` atribui o valor 5 à variável x.
*   `x == 5` verifica se x possui o valor 5.

#### **1.3 Operadores Lógicos**
Utilizados para combinar duas ou mais expressões relacionais, formando condições compostas.

| Operador | Símbolo em C | Descrição | Tabela Verdade Resumida |
| :--- | :---: | :--- | :--- |
| E (AND) | `&&` | Verdadeiro apenas se **ambos** forem verdadeiros | V && V = V <br> V && F = F <br> F && V = F <br> F && F = F |
| OU (OR) | `\|\|` | Verdadeiro se **pelo menos um** for verdadeiro | V \|\| V = V <br> V \|\| F = V <br> F \|\| V = V <br> F \|\| F = F |
| NÃO (NOT) | `!` | Inverte o valor lógico | !V = F <br> !F = V |

**Exemplo de Aplicação Lógica:**
Para verificar se um número `N` está entre 10 e 20 (inclusive):
Expressão: `(N >= 10) && (N <= 20)`
Se N = 15: `(15 >= 10)` é Verdadeiro E `(15 <= 20)` é Verdadeiro. Resultado: Verdadeiro.

---

### 2. Exercícios Resolvidos (Modelagem Progressiva)

Seguiremos a metodologia da disciplina: Problema → Descrição Natural → Portugol para Web Studio - Estruturado → Código C.

#### **Exercício 1:** Cálculo de Média e Resto (Foco: Aritmética e Divisão)
**Problema:** Calcule a média aritmética de duas notas inteiras e informe também o resto da divisão da primeira nota pela segunda.

**Descrição Natural:**
O usuário digita duas notas inteiras. O programa calcula a soma delas dividida por 2 para achar a média (que deve ser real). Em seguida, calcula o resto da divisão da primeira nota pela segunda.

**Portugol para Web Studio - Estruturado:**
```portugol
programa
{
    funcao inicio()
    {
        inteiro nota1, nota2, resto
        real media

        escreva("Digite a primeira nota: ")
        leia(nota1)
        escreva("Digite a segunda nota: ")
        leia(nota2)

        // Uso de literal real para garantir divisão real
        media = (nota1 + nota2) / 2.0
        
        resto = nota1 % nota2

        escreva("Media: ", media, "\n")
        escreva("Resto da divisao: ", resto, "\n")
    }
}
```

**Código em C:**
```c
#include <stdio.h>

int main() {
    int nota1, nota2, resto;
    float media;

    printf("Digite a primeira nota: ");
    scanf("%d", &nota1);
    
    printf("Digite a segunda nota: ");
    scanf("%d", &nota2);

    // Atenção: uso de 2.0 para forçar cálculo em ponto flutuante
    media = (nota1 + nota2) / 2.0;
    
    // O operador % exige inteiros
    resto = nota1 % nota2;

    printf("Media: %.2f\n", media);
    printf("Resto da divisao: %d\n", resto);

    return 0;
}
```

---

#### **Exercício 2:** Verificação de Igualdade e Diferença (Foco: Relacionais)
**Problema:** Leia dois números inteiros e verifique se eles são iguais, se o primeiro é maior, ou se o segundo é maior. Exiba 1 para verdadeiro e 0 para falso em cada teste.

**Descrição Natural:**
Ler dois valores A e B. Comparar A com B usando operadores de igualdade e grandeza. Mostrar o resultado numérico das comparações.

**Portugol para Web Studio - Estruturado:**
```portugol
programa
{
    funcao inicio()
    {
        inteiro A, B
        logico res_igual, res_maior, res_menor

        escreva("Digite o valor de A: ")
        leia(A)
        escreva("Digite o valor de B: ")
        leia(B)

        res_igual = (A == B)
        res_maior = (A > B)
        res_menor = (A < B)

        escreva("Sao iguais? (V=Verdadeiro, F=Falso): ", res_igual, "\n")
        escreva("A e maior que B? (V=Verdadeiro, F=Falso): ", res_maior, "\n")
        escreva("A e menor que B? (V=Verdadeiro, F=Falso): ", res_menor, "\n")
    }
}
```

**Código em C:**
```c
#include <stdio.h>

int main() {
    int A, B;
    int res_igual, res_maior, res_menor;

    printf("Digite o valor de A: ");
    scanf("%d", &A);
    printf("Digite o valor de B: ");
    scanf("%d", &B);

    // As expressões retornam 1 (verdadeiro) ou 0 (falso)
    res_igual = (A == B);
    res_maior = (A > B);
    res_menor = (A < B);

    printf("Sao iguais? (1=Sim, 0=Nao): %d\n", res_igual);
    printf("A e maior que B? (1=Sim, 0=Nao): %d\n", res_maior);
    printf("A e menor que B? (1=Sim, 0=Nao): %d\n", res_menor);

    return 0;
}
```

---

#### **Exercício 3:** Validação de Intervalo (Foco: Lógico E - `&&`)
**Problema:** Determine se um número digitado pelo usuário está dentro do intervalo fechado entre 10 e 50.

**Descrição Natural:**
Ler um número. Verificar se ele é >= 10 e, simultaneamente, <= 50. Se ambas as condições forem verdadeiras, o resultado é verdadeiro.

**Portugol para Web Studio - Estruturado:**
```portugol
programa
{
    funcao inicio()
    {
        inteiro numero
        logico dentro_intervalo

        escreva("Digite um numero: ")
        leia(numero)

        // Operador Lógico E (e)
        dentro_intervalo = (numero >= 10) e (numero <= 50)

        escreva("Esta no intervalo [10, 50]? (V=Verdadeiro, F=Falso): ", dentro_intervalo, "\n")
    }
}
```

**Código em C:**
```c
#include <stdio.h>

int main() {
    int numero;
    int dentro_intervalo;

    printf("Digite um numero: ");
    scanf("%d", &numero);

    // Uso do operador && (E lógico)
    dentro_intervalo = (numero >= 10) && (numero <= 50);

    printf("Esta no intervalo [10, 50]? (1=Sim, 0=Nao): %d\n", dentro_intervalo);

    return 0;
}
```

---

#### **Exercício 4:** Aprovação Direta ou Recuperação (Foco: Lógico OU - `||`)
**Problema:** Um aluno é considerado "Apto" para a próxima fase se tiver nota maior ou igual a 70 **OU** se tiver frequência maior ou igual a 75%. Leia a nota e a frequência e determine se ele está apto.

**Descrição Natural:**
Ler nota e frequência. Se (Nota >= 70) OU (Frequencia >= 75), então o aluno está apto. Basta uma das condições ser verdadeira.

**Portugol para Web Studio - Estruturado:**
```portugol
programa
{
    funcao inicio()
    {
        real nota, frequencia
        logico apto

        escreva("Digite a nota (0-100): ")
        leia(nota)
        escreva("Digite a frequencia (0-100): ")
        leia(frequencia)

        // Operador Lógico OU (ou)
        apto = (nota >= 70) ou (frequencia >= 75)

        escreva("Aluno Apto? (V=Verdadeiro, F=Falso): ", apto, "\n")
    }
}
```

**Código em C:**
```c
#include <stdio.h>

int main() {
    float nota, frequencia;
    int apto;

    printf("Digite a nota (0-100): ");
    scanf("%f", &nota);
    printf("Digite a frequencia (0-100): ");
    scanf("%f", &frequencia);

    // Uso do operador || (OU lógico)
    // Critério atualizado: Frequência mínima de 75%
    apto = (nota >= 70) || (frequencia >= 75);

    printf("Aluno Apto? (1=Sim, 0=Nao): %d\n", apto);

    return 0;
}
```

---

#### **Exercício 5:** Negação de Condição (Foco: Lógico NÃO - `!`)
**Problema:** Leia um número inteiro. Verifique se ele **NÃO** é zero.

**Descrição Natural:**
Ler um número. Aplicar o operador de negação na condição "ser igual a zero".

**Portugol para Web Studio - Estruturado:**
```portugol
programa
{
    funcao inicio()
    {
        inteiro numero
        logico diferente_de_zero

        escreva("Digite um numero: ")
        leia(numero)

        // Usando o operador NÃO (nao) sobre a igualdade
        diferente_de_zero = nao (numero == 0)

        escreva("O numero e diferente de zero? (V=Verdadeiro, F=Falso): ", diferente_de_zero, "\n")
    }
}
```

**Código em C:**
```c
#include <stdio.h>

int main() {
    int numero;
    int diferente_de_zero;

    printf("Digite um numero: ");
    scanf("%d", &numero);

    // O operador ! inverte o resultado de (numero == 0)
    diferente_de_zero = !(numero == 0);

    printf("O numero e diferente de zero? (1=Sim, 0=Nao): %d\n", diferente_de_zero);

    return 0;
}
```

---

### 3. Resolução Completa do Exercício Progressivo para Fixação

**Enunciado Revisado (Escopo Sequencial):**
Desenvolva um algoritmo que calcule os componentes do custo de uma viagem de táxi.
Regras:
1.  A bandeirada custa R$ 5,00.
2.  O quilômetro rodado custa R$ 0,80.
3.  O programa deve ler a distância em km.
4.  Deve informar o **Valor Bruto**.
5.  Deve calcular matematicamente qual seria o **Valor do Desconto de 10%** *caso* a distância fosse maior que 20 km (apenas o cálculo do valor potencial, sem aplicar desvio de fluxo `if/else` ainda).
6.  Deve avaliar logicamente se a distância é maior que 20 km, exibindo o resultado (1 ou 0) dessa comparação.

*Objetivo Pedagógico:* Praticar expressões aritméticas complexas e operadores relacionais, preparando a lógica para a próxima aula (Estruturas de Seleção), sem violar o escopo sequencial atual.

#### **Etapa 1:** Descrição em Linguagem Natural
O programa solicita a distância percorrida. Calcula o valor bruto somando a bandeirada ao produto da distância pelo preço por km. Em seguida, calcula matematicamente quanto representaria 10% desse valor bruto (potencial desconto). O programa também avalia logicamente se a distância é maior que 20 km, retornando 1 (verdadeiro) ou 0 (falso) para essa comparação. Por fim, exibe o valor bruto, o valor potencial do desconto e o resultado da comparação lógica.

#### **Etapa 2:** Portugol para Web Studio - Estruturado (Foco em Operadores)

```portugol
programa
{
    funcao inicio()
    {
        real distancia
        const real BANDEIRADA = 5.0
        const real PRECO_KM = 0.80
        real valor_bruto, valor_potencial_desconto
        logico elegivel_desconto

        escreva("Digite a distancia percorrida (km): ")
        leia(distancia)

        // Cálculo do valor bruto (Operadores Aritméticos)
        valor_bruto = BANDEIRADA + (distancia * PRECO_KM)

        // Cálculo do valor do desconto (Operador Aritmético)
        // Calculamos quanto seria 10%, independente de ser aplicado ou não agora
        valor_potencial_desconto = valor_bruto * 0.10

        // Avaliação da condição (Operador Relacional)
        // Retorna verdadeiro ou falso
        elegivel_desconto = (distancia > 20.0)

        escreva("Valor Bruto: R$ ", valor_bruto, "\n")
        escreva("Valor Potencial de Desconto (10%): R$ ", valor_potencial_desconto, "\n")
        escreva("Distancia > 20km? (V=Verdadeiro, F=Falso): ", elegivel_desconto, "\n")
        escreva("Observacao: A aplicacao efetiva do desconto exigira estrutura de selecao (proxima aula).", "\n")
    }
}
```

#### **Etapa 3:** Código em C (Estritamente Sequencial)

```c
#include <stdio.h>

int main() {
    float distancia, bandeirada, preco_km;
    float valor_bruto, valor_potencial_desconto;
    int elegivel_desconto;

    // Definição das constantes
    bandeirada = 5.0;
    preco_km = 0.80;

    printf("Digite a distancia percorrida (km): ");
    scanf("%f", &distancia);

    // 1. Operadores Aritméticos: Cálculo do Bruto
    valor_bruto = bandeirada + (distancia * preco_km);

    // 2. Operadores Aritméticos: Cálculo do percentual do desconto
    valor_potencial_desconto = valor_bruto * 0.10;

    // 3. Operador Relacional: Verificação da condição
    // A variável receberá 1 se distancia > 20, ou 0 caso contrário.
    // Ainda NÃO usamos IF/ELSE aqui, apenas avaliamos a expressão.
    elegivel_desconto = (distancia > 20.0);

    // Saída de dados
    printf("Valor Bruto: R$ %.2f\n", valor_bruto);
    printf("Valor Potencial de Desconto (10%%): R$ %.2f\n", valor_potencial_desconto);
    printf("Condicao (Distancia > 20)? Resultado Logico: %d\n", elegivel_desconto);

    return 0;
}
```

## FIM