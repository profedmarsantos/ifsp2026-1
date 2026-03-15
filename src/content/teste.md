# Arquivo de TESTE

Este tutorial demonstra como encontrar e imprimir todos os números primos no intervalo de 1 a 50 usando a linguagem de programação C.

## O que é um código em C?

## Código em C

```c
#include <stdio.h>
#include <math.h>

int main() {
    double a, b;
    int inicio, fim;

    printf("Digite o valor de a: ");
    scanf("%lf", &a);
    printf("Digite o valor de b: ");
    scanf("%lf", &b);

    printf("\nHello World\n");
    printf("Soma: %.2f\n", a + b);
    printf("%.2f elevado a %.2f: %.2f\n", a, b, pow(a, b));

    // Lógica para descobrir quem é maior e definir o intervalo
    if (a < b) {
        printf("%.2f e menor que %.2f\n", a, b);
        inicio = (int)a;
        fim = (int)b;
    } else if (a > b) {
        printf("%.2f e maior que %.2f\n", a, b);
        inicio = (int)b;
        fim = (int)a;
    } else {
        printf("Os numeros sao iguais.\n");
        inicio = (int)a;
        fim = (int)b;
    }

    // Loop para mostrar a sequência
    printf("Sequencia do menor ao maior: ");
    for (int i = inicio; i <= fim; i++) {
        printf("%d ", i);
    }
    printf("\n");

    return 0;
}
```

## Versão em Portugol

```portugol
programa
{
    funcao inicio()
    {
        real a, b
        inteiro inicio, fim

        escreva("Digite o valor de a: ")
        leia(a)

        escreva("Digite o valor de b: ")
        leia(b)

        escreva("\nHello World\n")
        escreva("Soma: ", a + b, "\n")
        escreva(a, " elevado a ", b, ": ", potencia(a, b), "\n")

        // Lógica para descobrir quem é maior e definir o intervalo
        se (a < b)
        {
            escreva(a, " e menor que ", b, "\n")
            inicio = a
            fim = b
        }
        senao se (a > b)
        {
            escreva(a, " e maior que ", b, "\n")
            inicio = b
            fim = a
        }
        senao
        {
            escreva("Os numeros sao iguais.\n")
            inicio = a
            fim = b
        }

        // Loop para mostrar a sequência
        escreva("Sequencia do menor ao maior: ")

        para (inteiro i = inicio; i <= fim; i++)
        {
            escreva(i, " ")
        }

        escreva("\n")
    }
}
```

Um número primo é um número natural maior que 1 que não possui divisores positivos além de 1 e ele mesmo. Por exemplo, 2, 3, 5, 7 são números primos.

## Lógica por Trás do Algoritmo

Para verificar se um número é primo, precisamos testar se ele é divisível por qualquer número entre 2 e a sua raiz quadrada. Se não encontrarmos nenhum divisor nesse intervalo, o número é primo. Esta otimização reduz significativamente o número de verificações necessárias.

Vamos usar uma função auxiliar para verificar a primalidade e um laço principal para iterar de 1 a 50.

## Código em C

```c
#include <stdio.h>
#include <stdbool.h> // Para usar o tipo bool

// Função para verificar se um número é primo
bool isPrime(int num) {
    int x, y = 0;
    float xf, yf = 0.0f;
    double dx;

    if (num <= 1) {
        return false; // Números menores ou iguais a 1 não são primos
    }
    for (int i = 2; i * i <= num; i++) { // Otimização: verificar até a raiz quadrada
        if (num % i == 0) {
            return false; // Se for divisível, não é primo
        }
    }
    return true; // Se não encontrou divisores, é primo
}

int main() {
    printf("Números primos de 1 a 50:\n");
    printf("--------------------------\n");

    for (int i = 1; i <= 50; i++) {
        if (isPrime(i)) {
            printf("%d\n", i);
        }
    }

    printf("--------------------------\n");
    printf("Fim da verificação.\n");

    return 0;
}
```

## Código em Portugol

```portugol
programa
{
    inclua biblioteca Matematica --> mat
    funcao inicio()
    {
        inteiro a, b
        inteiro tempA, tempB
        inteiro resto, mdc, mmc

        escreva("Digite o primeiro número inteiro positivo: ")
        leia(a)
        escreva("Digite o segundo número inteiro positivo: ")
        leia(b)

        se (a <= 0 ou b <= 0)
        {
            escreva("Erro: Os números devem ser positivos.\n")
        }
        senao
        {
            tempA = a
            tempB = b

            enquanto (b != 0)
            {
                resto = a % b
                a = b
                b = resto
            }
            mdc = a

            mmc = (tempA * tempB) / mdc

            escreva("\nResultado:\n")
            escreva("MDC: ", mdc, "\n")
            escreva("MMC: ", mmc, "\n")
        }
    }
}
```

## Explicação do Código C

1. **`#include <stdio.h>`**: Inclui a biblioteca padrão de entrada e saída para funções como `printf`.

```c
#include <stdio.h>
int main() {
    printf("Oi!");
}
```

2. **`#include <stdbool.h>`**: Inclui a biblioteca para usar o tipo booleano (`bool`, `true`, `false`).
3. **`bool isPrime(int num)`**:
    * Esta função recebe um inteiro `num` e retorna `true` se for primo, `false` caso contrário.
    * `if (num <= 1)`: Números menores ou iguais a 1 não são primos por definição.
    * `for (int i = 2; i * i <= num; i++)`: Este laço itera de 2 até a raiz quadrada de `num`.
    * `if (num % i == 0)`: Se o resto da divisão for 0, retorna `false`.

## Exemplo de Saída Esperada

```text
1
2
3
...
19
20
```

## Como Compilar e Executar em C

Para compilar e executar este código, você precisará de um compilador C (como GCC).

1. **Salve o código** em um arquivo chamado `primos.c`.
2. **Abra um terminal**.
3. **Compile o código**:
   ```bash
   gcc primos.c -o primos
   ```
4. **Execute o programa**:
   ```bash
   ./primos
   ```

```c
printf("Oi, mundo!");
```

Fim do arquivo.