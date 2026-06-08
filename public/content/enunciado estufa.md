# Sistema de Monitoramento de Estufa com Persistência de Dados

## Contexto
Em uma estufa agrícola industrial, é necessário monitorar e registrar as condições ambientais (temperatura e umidade) para garantir a qualidade da produção. O sistema deve "lembrar" da última medição mesmo após ser desligado, permitindo que o operador compare com a nova leitura.

## Objetivo
Desenvolver um programa em **Linguagem C** que:
1. Registre temperatura e umidade de uma estufa
2. Persista os dados em arquivo entre execuções
3. Exiba a leitura anterior ao iniciar

## Requisitos Funcionais

| Execução | Comportamento Esperado |
|----------|------------------------|
| **1ª execução** | Arquivo `log.txt` não existe → informar "Primeira execução" → solicitar dados → salvar |
| **2ª execução em diante** | Arquivo existe → exibir leitura anterior → solicitar nova leitura → substituir arquivo |

## Dados a Serem Armazenados

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `temperatura` | `float` | Temperatura da estufa em °C |
| `umidade` | `float` | Umidade relativa do ar em % |

## Lembretes de Comandos C para Manipulação de Arquivos

```c
// === DECLARAÇÃO DO PONTEIRO DE ARQUIVO ===
FILE *arquivo;

// === ABRIR ARQUIVO ===
// "r" = leitura (só abre se existir)
// "w" = escrita (cria ou substitui conteúdo)
// "a" = append (acrescenta no final)
arquivo = fopen("nome_do_arquivo.txt", "r");

// === VERIFICAR SE ABRIU COM SUCESSO ===
if (arquivo) {
    // arquivo abriu (ponteiro NÃO é NULL)
} else {
    // arquivo NÃO abriu (ponteiro é NULL)
}

// === LER DADOS DO ARQUIVO ===
// Retorna quantidade de itens lidos com sucesso
fscanf(arquivo, "%f %f", &var1, &var2);

// === GRAVAR DADOS NO ARQUIVO ===
fprintf(arquivo, "%.1f %.1f", var1, var2);

// === FECHAR ARQUIVO ===
fclose(arquivo);

// === ESTRUTURA COM typedef ===
typedef struct {
    float temperatura;
    float umidade;
} DadosEstufa;

// === ACESSAR CAMPOS DA STRUCT ===
// Se a variável for global ou local normal:
dados.temperatura   

// Se a variável for ponteiro (ainda não visto em aula):
// dados->temperatura 
```

## Requisitos Técnicos Obrigatórios

1. **Usar `typedef struct`** para agrupar temperatura e umidade
2. **Criar no mínimo 4 funções** (além do `main`):
   - Uma para inicializar valores
   - Uma para carregar do arquivo
   - Uma para salvar no arquivo
   - Uma para exibir na tela
3. **Pode usar variável global** para a struct (declare fora do `main` para que todas as funções acessem)
4. **Tratar erro de abertura de arquivo** (verificar se o ponteiro é válido)
5. **Arquivo em modo texto** chamado `log.txt`
6. **Substituir conteúdo anterior** (usar modo `"w"` na escrita)

## Formato do Arquivo `log.txt`
```
temperatura umidade
```
Exemplo: `25.5 60.0`

## Critérios de Avaliação

| Critério | Peso |
|----------|------|
| Uso correto de `typedef struct` | 0,5 |
| Modularização (4+ funções) | 0,5 |
| Variável global declarada corretamente | 0,5 |
| Manipulação de arquivos (`fopen`, `fprintf`, `fscanf`, `fclose`) | 0,5 |
| Tratamento de erros (verificar ponteiro) | 0,5 |
| **Total** | **2,5** |

---

## ⚠️ Erros Comuns a Antecipar

| Erro | Consequência | Correção |
|------|--------------|----------|
| Não verificar `if (arquivo)` | Crash na 1ª execução | Sempre verificar após `fopen` |
| Usar modo `"a"` ao salvar | Acumula dados (não substitui) | Usar modo `"w"` |
| Esquecer `&` no `fscanf`/`scanf` | Comportamento indefinido | `&dados.campo` |
| Usar `->` em vez de `.` | Erro de compilação | `dados.temperatura` (variável normal) |
| Esquecer `fclose` | Vazamento de recursos | Sempre fechar após usar |
| Declarar struct dentro do `main` | Funções não acessam | Declarar fora (global) |

---

## 🔧 Dicas para CodeBlocks + MinGW

1. **Codificação**: Salve o arquivo `.c` com codificação **UTF-8** para evitar problemas com acentos
2. **Pasta de execução**: O arquivo `log.txt` será criado na **mesma pasta do executável** (geralmente `bin/Debug` ou `bin/Release`)
3. **Limpar projeto**: Se tiver problemas, use **Build → Rebuild** para garantir recompilação completa
4. **Console**: Mantenha o console aberto para ver as mensagens (CodeBlocks geralmente faz isso automaticamente)
5. **Variável global**: A struct `dados` é declarada **fora do `main`** para que todas as funções possam acessar