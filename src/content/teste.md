# Arquivo de TESTE

Este tutorial demonstra como encontrar e imprimir todos os números primos no intervalo de 1 a 50 usando a linguagem de programação C.

## O que é um Número Primo?

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