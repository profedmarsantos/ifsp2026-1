---

# Material de Apoio: Operadores Aritméticos, Relacionais e Lógicos

**Pré-requisitos:** Variáveis, Tipos de Dados (`int`, `float`), Entrada/Saída (`scanf`, `printf`).

---

## 1. Fundamentação Teórica

Um operador é um símbolo que instrui o compilador a realizar uma operação matemática, lógica ou de comparação específica sobre um ou mais operandos (variáveis ou constantes). A correta compreensão da precedência e do tipo de dado resultante é crucial para a construção de algoritmos coerentes.

### 1.1 Operadores Aritméticos
Utilizados para realizar cálculos matemáticos. Em C, estes operadores seguem a álgebra tradicional, porém com regras estritas de tipagem que afetam o resultado final, especialmente na divisão e no módulo.

#### 1.1.a Tabela de Operadores
| Operador | Símbolo em C | Descrição | Exemplo (C) | Resultado | Tipo Resultante |
| :--- | :---: | :--- | :--- | :--- | :--- |
| Adição | `+` | Soma dois valores | `5 + 3` | `8` | Inteiro ou Real |
| Subtração | `-` | Subtrai o segundo do primeiro | `10 - 4` | `6` | Inteiro ou Real |
| Multiplicação | `*` | Multiplica dois valores | `3 * 4` | `12` | Inteiro ou Real |
| Divisão | `/` | Divide o primeiro pelo segundo | `10 / 2` | `5` | Depende dos operandos |
| Módulo (Resto) | `%` | Retorna o resto da divisão inteira | `10 % 3` | `1` | **Apenas Inteiro** |

#### 1.1.b Regra Crítica: Divisão Inteira vs. Real
Em C, o comportamento do operador de divisão (`/`) é determinado pelos **tipos de dados dos operandos**, não pelo tipo da variável que receberá o resultado.

1.  **Divisão Inteira:** Se **ambos** os operandos forem inteiros (`int`), o compilador descarta a parte decimal (truncamento), mesmo que o resultado seja atribuído a uma variável `float`.
    *   Exemplo: `5 / 2` resulta em `2`.
    *   Erro comum: `float x = 5 / 2;` → `x` será `2.00`, não `2.50`.

2.  **Divisão Real:** Para obter um resultado com casas decimais, **pelo menos um** dos operandos deve ser tratado como ponto flutuante (`float` ou `double`). Isso força a "promoção aritmética", convertendo o outro operando para real antes do cálculo.

**Métodos para forçar Divisão Real:**
*   **Literal com ponto decimal:** `5.0 / 2` (O `5.0` é lido como `double`).
*   **Cast Explícito:** `(float)5 / 2` (Converte temporariamente o `5` para `float`).
*   **Sufixo de Tipo:** `5 / 2.f` (O sufixo `.f` indica explicitamente que `2` é um `float`).

*Nota Técnica:* O operador Módulo (`%`) é restrito a operandos inteiros. Tentar usar `5.5 % 2` gerará erro de compilação. Além disso, em C, o sinal do resultado do módulo segue o sinal do dividendo (primeiro operando).

### 1.2 Operadores Relacionais
Utilizados para comparar dois valores. O resultado de qualquer operação relacional em C é um valor inteiro: **`1`** representa Verdadeiro e **`0`** representa Falso. Não existe um tipo booleano nativo nas versões antigas da linguagem (ANSI C), embora a norma C99 tenha introduzido macros para facilitar a leitura.

#### 1.2.a Tabela de Operadores
| Operador | Símbolo em C | Descrição | Exemplo (A=5, B=10) | Resultado Numérico |
| :--- | :---: | :--- | :--- | :--- |
| Igual a | `==` | Verifica igualdade de valor | `A == B` | `0` (Falso) |
| Diferente de | `!=` | Verifica desigualdade | `A != B` | `1` (Verdadeiro) |
| Maior que | `>` | Verifica se esquerdo > direito | `A > B` | `0` (Falso) |
| Menor que | `<` | Verifica se esquerdo < direito | `A < B` | `1` (Verdadeiro) |
| Maior ou igual | `>=` | Verifica se esquerdo ≥ direito | `A >= 5` | `1` (Verdadeiro) |
| Menor ou igual | `<=` | Verifica se esquerdo ≤ direito | `B <= 9` | `0` (Falso) |

#### 1.2.b Erro Comum de Sintaxe
É fundamental não confundir o operador de **atribuição** (`=`) com o operador de **igualdade** (`==`).
*   `x = 5`: Atribui o valor 5 à variável `x`. A expressão retorna o valor atribuído (5), que é considerado verdadeiro em contextos lógicos.
*   `x == 5`: Compara o conteúdo de `x` com 5. Retorna `1` se iguais, `0` se diferentes.
*   *Consequência:* Usar `=` dentro de uma condição lógica (ex: `if (x = 5)`) alterará o valor da variável e quase sempre resultará em verdadeiro, causando bugs difíceis de detectar.

### 1.3 Operadores Lógicos
Utilizados para combinar múltiplas expressões relacionais, permitindo a criação de condições compostas complexas.

#### 1.3.a Tabela de Operadores e Precedência
| Operador | Símbolo em C | Nome | Prioridade | Comportamento |
| :--- | :---: | :--- | :--- | :--- |
| NÃO | `!` | Negação | Alta | Inverte o valor: `!1` vira `0`, `!0` vira `1`. |
| E | `&&` | Conjunção | Média | Verdadeiro (`1`) somente se **ambos** os operandos forem verdadeiros. |
| OU | `\|\|` | Disjunção | Baixa | Verdadeiro (`1`) se **pelo menos um** dos operandos for verdadeiro. |

#### 1.3.b Conceito de Curto-Circuito (Short-Circuit)
O C utiliza avaliação de curto-circuito para otimizar a execução:
*   No operador **E (`&&`)**: Se o primeiro operando for Falso (`0`), o segundo **não é avaliado**, pois o resultado final já será inevitavelmente Falso.
*   No operador **OU (`||`)**: Se o primeiro operando for Verdadeiro (`1`), o segundo **não é avaliado**, pois o resultado final já será inevitavelmente Verdadeiro.
*   *Importância:* Isso é vital para evitar erros de execução, como divisão por zero em cadeias lógicas (ex: `(b != 0) && (a / b > 5)`). Se `b` for zero, a divisão nunca ocorre.

#### 1.3.c Exemplo de Aplicação
Para verificar se um número `N` está no intervalo fechado [10, 20]:
Expressão Correta: `(N >= 10) && (N <= 20)`
*   Se N = 15: `(15 >= 10)` é `1` E `(15 <= 20)` é `1`. Resultado: `1`.
*   Se N = 5: `(5 >= 10)` é `0`. O compilador ignora a segunda parte (curto-circuito). Resultado: `0`.
*   *Erro Lógico Comum:* Escrever `10 <= N <= 20`. Em C, isso é avaliado da esquerda para a direita: `(10 <= N)` gera 0 ou 1, e depois compara-se esse resultado com 20 (ex: `0 <= 20`), o que resulta sempre em Verdadeiro, independentemente do valor de N.

---

## 2. Exercícios Resolvidos (Modelagem Progressiva)

A metodologia aplicada segue: Problema → Descrição Natural → Pseudocódigo Estruturado → Código C.

### 2.1 Exercício 1: Cálculo de Média e Resto
**Problema:** Calcule a média aritmética de duas notas inteiras e informe o resto da divisão da primeira pela segunda.

**Pseudocódigo Estruturado:**
```text
VARIÁVEIS
    inteiro nota1, nota2, resto
    real media
INICIO
    escreva("Digite a primeira nota: ")
    leia(nota1)
    escreva("Digite a segunda nota: ")
    leia(nota2)
    // Conversão implícita via literal 2.0
    media = (nota1 + nota2) / 2.0
    resto = nota1 % nota2
    escreva("Media: ", media)
    escreva("Resto: ", resto)
FIM
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

    // Uso de 2.0 para garantir divisão real
    media = (nota1 + nota2) / 2.0;
    resto = nota1 % nota2;

    printf("Media: %.2f\n", media);
    printf("Resto da divisao: %d\n", resto);

    return 0;
}
```

### 2.2 Exercício 2: Verificação de Igualdade e Diferença
**Problema:** Leia dois inteiros e exiba o resultado lógico (0 ou 1) das comparações de igualdade e grandeza.

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

    res_igual = (A == B);
    res_maior = (A > B);
    res_menor = (A < B);

    printf("Sao iguais? (1=Sim, 0=Nao): %d\n", res_igual);
    printf("A e maior que B? (1=Sim, 0=Nao): %d\n", res_maior);
    printf("A e menor que B? (1=Sim, 0=Nao): %d\n", res_menor);

    return 0;
}
```

### 2.3 Exercício 3: Validação de Intervalo
**Problema:** Determine se um número está no intervalo [10, 50] usando operador lógico E.

**Código em C:**
```c
#include <stdio.h>

int main() {
    int numero;
    int dentro_intervalo;

    printf("Digite um numero: ");
    scanf("%d", &numero);

    // Ambas as condições devem ser verdadeiras
    dentro_intervalo = (numero >= 10) && (numero <= 50);

    printf("Esta no intervalo [10, 50]? (1=Sim, 0=Nao): %d\n", dentro_intervalo);

    return 0;
}
```

### 2.4 Exercício 4: Aprovação Direta ou Recuperação
**Problema:** Aluno apto se Nota >= 70 **OU** Frequencia >= 75%.

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

    // Basta uma condição ser verdadeira
    apto = (nota >= 70) || (frequencia >= 75);

    printf("Aluno Apto? (1=Sim, 0=Nao): %d\n", apto);

    return 0;
}
```

### 2.5 Exercício 5: Negação de Condição
**Problema:** Verifique se um número é diferente de zero usando o operador NÃO.

**Código em C:**
```c
#include <stdio.h>

int main() {
    int numero;
    int diferente_de_zero;

    printf("Digite um numero: ");
    scanf("%d", &numero);

    // ! inverte o resultado de (numero == 0)
    diferente_de_zero = !(numero == 0);

    printf("O numero e diferente de zero? (1=Sim, 0=Nao): %d\n", diferente_de_zero);

    return 0;
}
```

### 2.6 Exercício Progressivo: Custo de Táxi (Análise Sequencial)
**Problema:** Calcular valor bruto (Bandeirada R$ 5,00 + R$ 0,80/km), calcular potencial desconto de 10% e avaliar logicamente se distância > 20km.
*Nota:* Nesta etapa (Semana 6), focamos na avaliação da expressão lógica, sem aplicar desvios de fluxo (`if/else`) no cálculo principal.

**Código em C:**
```c
#include <stdio.h>

int main() {
    float distancia, bandeirada, preco_km;
    float valor_bruto, valor_potencial_desconto;
    int elegivel_desconto;

    bandeirada = 5.0;
    preco_km = 0.80;

    printf("Digite a distancia percorrida (km): ");
    scanf("%f", &distancia);

    valor_bruto = bandeirada + (distancia * preco_km);
    valor_potencial_desconto = valor_bruto * 0.10;
    
    // Avaliação puramente relacional: retorna 1 ou 0
    elegivel_desconto = (distancia > 20.0);

    printf("Valor Bruto: R$ %.2f\n", valor_bruto);
    printf("Valor Potencial de Desconto (10%%): R$ %.2f\n", valor_potencial_desconto);
    printf("Condicao (Distancia > 20)? Resultado Logico: %d\n", elegivel_desconto);
    
    // Bloco if usado apenas para mensagem explicativa ao aluno, 
    // não altera as variáveis de cálculo principais nesta aula.
    if (elegivel_desconto) {
        printf("Observacao: Como o resultado foi 1, na proxima aula aplicaremos este desconto automaticamente.\n");
    } else {
        printf("Observacao: Como o resultado foi 0, nao haveria desconto.\n");
    }

    return 0;
}
```

---

## 3. Exercícios de Fixação

Lista de exercícios práticos para consolidação. Implemente os códigos focando na avaliação de expressões e cálculo sequencial.

### 3.1 Exercício 1: Operações Aritméticas Completas
**Problema:** Leia dois inteiros `a` e `b`. Exiba: soma, subtração, multiplicação, divisão inteira, divisão real e módulo.

**Código em C:**
```c
#include <stdio.h>

int main() {
    int a, b;
    int soma, subtracao, multiplicacao, divisao_inteira, resto;
    float divisao_real;

    printf("Digite o valor de a: ");
    scanf("%d", &a);

    printf("Digite o valor de b: ");
    scanf("%d", &b);

    soma = a + b;
    subtracao = a - b;
    multiplicacao = a * b;
    divisao_inteira = a / b;       // Truncamento inteiro
    divisao_real = (float)a / b;   // Conversão para real
    resto = a % b;

    printf("Soma: %d\n", soma);
    printf("Subtracao: %d\n", subtracao);
    printf("Multiplicacao: %d\n", multiplicacao);
    printf("Divisao Inteira: %d\n", divisao_inteira);
    printf("Divisao Real: %.2f\n", divisao_real);
    printf("Resto: %d\n", resto);

    return 0;
}
```

### 3.2 Exercício 2: Todas as Comparações Relacionais
**Problema:** Leia dois inteiros `a` e `b`. Exiba o resultado (0 ou 1) de todas as 6 comparações relacionais possíveis.

**Código em C:**
```c
#include <stdio.h>

int main() {
    int a, b;
    int res_igual, res_diferente, res_maior, res_menor, res_maior_igual, res_menor_igual;

    printf("Digite o valor de a: ");
    scanf("%d", &a);

    printf("Digite o valor de b: ");
    scanf("%d", &b);

    res_igual = (a == b);
    res_diferente = (a != b);
    res_maior = (a > b);
    res_menor = (a < b);
    res_maior_igual = (a >= b);
    res_menor_igual = (a <= b);

    printf("a == b: %d\n", res_igual);
    printf("a != b: %d\n", res_diferente);
    printf("a > b: %d\n", res_maior);
    printf("a < b: %d\n", res_menor);
    printf("a >= b: %d\n", res_maior_igual);
    printf("a <= b: %d\n", res_menor_igual);

    return 0;
}
```

### 3.3 Exercício 3: Avaliação de Expressões Compostas
**Problema:** Leia três inteiros `x`, `y`, `z`. Avalie e exiba o resultado das expressões:
1.  **A:** `(x + y) > z` **E** `x != y`
2.  **B:** `z * 2 == x + y` **OU** `x > 10`
3.  **C:** **NÃO** (`x < y` **E** `y < z`)

**Código em C:**
```c
#include <stdio.h>

int main() {
    int x, y, z;
    int res_a, res_b, res_c;

    printf("Digite o valor de x: ");
    scanf("%d", &x);
    printf("Digite o valor de y: ");
    scanf("%d", &y);
    printf("Digite o valor de z: ");
    scanf("%d", &z);

    res_a = ((x + y) > z) && (x != y);
    res_b = ((z * 2) == (x + y)) || (x > 10);
    res_c = !((x < y) && (y < z));

    printf("Resultado Expressao A: %d\n", res_a);
    printf("Resultado Expressao B: %d\n", res_b);
    printf("Resultado Expressao C: %d\n", res_c);

    return 0;
}
```

### 3.4 Exercício 4: Precedência e Parênteses
**Problema:** Leia quatro inteiros `a`, `b`, `c`, `d`. Calcule a expressão abaixo garantindo a ordem correta com parênteses e exiba como real:
**Fórmula:** `Resultado = (a + b) * (c - d) / (a + c)`

**Código em C:**
```c
#include <stdio.h>

int main() {
    int a, b, c, d;
    float resultado;

    printf("Digite o valor de a: ");
    scanf("%d", &a);
    printf("Digite o valor de b: ");
    scanf("%d", &b);
    printf("Digite o valor de c: ");
    scanf("%d", &c);
    printf("Digite o valor de d: ");
    scanf("%d", &d);

    // Cast aplicado ao numerador ou uso de parênteses garante cálculo real
    resultado = (float)(a + b) * (c - d) / (a + c);

    printf("Resultado da expressao: %.2f\n", resultado);

    return 0;
}
```