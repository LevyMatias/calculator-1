# Documentação da calculadora

## Table of contents

- [Documentação da calculadora](#documentação-da-calculadora)
  - [Table of contents](#table-of-contents)
  - [Insere o número no display](#insere-o-número-no-display)
  - [Selecionar operador](#selecionar-operador)
  - [Função de Cálculo](#função-de-cálculo)
  - [Ativar igual](#ativar-igual)
  - [Limpar display e cálculo](#limpar-display-e-cálculo)
  - [Deletar o ultimo número](#deletar-o-ultimo-número)
  - [Negativar um número](#negativar-um-número)
  - [Função para casas decimais](#função-para-casas-decimais)
  - [Função para ativar o teclado](#função-para-ativar-o-teclado)
  - [Mudar a cor da linha e da coluna](#mudar-a-cor-da-linha-e-da-coluna)


## Insere o número no display

1. Vamos definir o seguinte:
    - `display`: é uma `const`  que seleciona o id display da DOM.
    - `numbers`: é uma variável definida como `const` para selecionar todos números com `querySelectorAll`
    - `numberAfterOperator` : é uma variável definida como `let` com valor `true` que será usada para verficar se estamos inserindo um número após selecionar um operador.
    - `updateDisplay`: É uma função que recebe um parâmetro chamado `text` e atualiza o conteúdo do display da calculadora.
    - `insertNumber`: É uma função que recebe um parâmetro chamado `event` e é chamada quando um número é clicado.
2. Percorremos todos os números da calculadora usando o método `forEach` no array `numbers` (que foi previamente selecionado usando `querySelectorAll`).
    - Para cada número, adicionamos um evento `click` que chama a função `insertNumber` passando o texto do número como parâmetro.
3. A função `updateDisplay` é definida e é chamada pela função `insertNumber` para atualizar o conteúdo do display da calculadora.
    - A função recebe o parâmetro `text`, que representa o texto do número que foi clicado.
    - Dentro da função, verificamos se `numberAfterOperator` é verdadeiro.
        - Se for verdadeiro, significa que estamos inserindo um número após a seleção de um operador.
        - Nesse caso, atualizamos o conteúdo do `display` com o texto formatado usando o método `toLocaleString('BR')`, que formata o número com a notação brasileira.
        - Em seguida, definimos a variável `numberAfterOperator` como falsa, indicando que não estamos mais inserindo um número após um operador.
    - Se `numberAfterOperator` for falso, significa que estamos concatenando o número ao conteúdo existente no display.
        - Nesse caso, utilizamos o operador `+=` para adicionar o texto ao conteúdo atual do `display`.

## Selecionar operador

1. Iremos adicionar a seleção dos operadores.
    - Criaremos uma variável para selecionar os operadores da calculadora.
    - Definiremos um loop para iterar sobre os operadores e adicionaremos um evento de `click` para cada um deles, semelhante ao que fizemos com os números.
    - Criaremos uma função de callback chamada `selectOperator` para lidar com o evento de clique nos operadores.
2. Na função `selectOperator`, definiremos a variável `numberAfterOperator` como `true`.
3. Vamos declarar duas variáveis globais para armazenar na memória o operador (`operatorInMemory`) e o número anterior (`previousNumberInMemory`) antes de pressionar um operador.
    - Na função `selectOperator`, adicionaremos um parâmetro ao evento que representa o operador selecionado.
    - Definiremos `numberAfterOperator` como `true`.
    - Atribuiremos o operador selecionado à variável `operatorInMemory` usando `event.target.textContent`.
    - Atribuiremos o número anterior do display à variável `previousNumberInMemory` convertendo-o para um número usando `parseFloat(display.textContent.replace(',', '.'))`.
    - No entanto, se clicarmos em um operador várias vezes, ele adicionará os operadores e números repetidamente à memória.
       - Para corrigir esse problema, adicionaremos uma condição que verifica se o próximo número é um `numberAfterOperator`.
          - Se for `false`, adicionaremos o operador e o número à memória.
          - Se for `true`, definiremos `numberAfterOperator` como `true`.

## Função de Cálculo

1. Na função `calculate`, verificaremos se há uma operação pendente usando a função `pendingOperation`.
    - Se houver uma operação pendente, obteremos o número atual do display convertendo-o para um número usando `parseFloat(display.textContent.replace(',', '.'))`.
    - Definiremos `numberAfterOperator` como `true`.
    - Usando uma sequência de condicionais `if` aninhadas, verificaremos qual operação está pendente (adição, subtração, multiplicação ou divisão) com base no valor de `operatorInMemory`.
    - Em cada condicional, atualizaremos o display com o resultado da operação correspondente.
2. Avançando no código, vamos criar uma função chamada `pendingOperation` para verificar se há uma operação pendente quando `numberAfterOperator` é `true`.
    - Agora vamos implementar a função `pendingOperation` para verificar se `operatorInMemory` é `undefined`.
3. Chamaremos a função `calculate` dentro da função `selectOperator` para executar a operação pendente antes de selecionar um novo operador.
4. Para garantir que os números sejam tratados corretamente como números, faremos a conversão para número (`parseFloat`) tanto do número atual quanto do `previousNumber` no momento de chamar a função `calculate`.
   
## Ativar igual

1. Primeiro, vamos selecionar o elemento do botão de igual usando o método `getElementById` e atribuir um evento de click a ele.
2. Em nossa função de callback, chamada `activeEquals`, vamos chamar a função `calculate` para realizar o cálculo pendente.
3. Após o cálculo, definiremos `operatorInMemory` como `undefined` para indicar que não há mais operações pendentes.

## Limpar display e cálculo

1. Vamos selecionar o botão de limpar o display usando o método `getElementById` e atribuir um evento de click a ele.
2. Em nossa função de callback, chamada `clearDisplay`, iremos atribuir uma string vazia ao `textContent` do display, o que limpará o conteúdo do display.
3. Em seguida, faremos o mesmo processo para o botão de limpar o cálculo.
4. Na função de callback, chamada `clearCalculus`, iremos chamar a função `clearDisplay` para limpar o display.
5. Em seguida, definiremos `operatorInMemory` e `previousNumberInMemory` como `undefined` para resetar as variáveis de operador e número anteriores.
6. Por fim, definiremos `numberAfterOperator` como `true` para garantir que, após limpar o cálculo, o próximo número inserido seja tratado corretamente.

## Deletar o ultimo número

1. Vamos selecionar o elemento do botão de backspace usando o método `getElementById` e atribuir um evento de click a ele.
2. Em nossa função de callback, chamada `removeLastNumber`, iremos utilizar o método `slice()` para modificar o conteúdo do display.
3. O método `slice()` nos permite extrair uma porção específica de uma string.
4. Dentro do `slice()`, vamos passar dois argumentos: o índice inicial e o índice final.
5. O índice inicial será `0`, o que significa que começaremos a extrair desde o início da string.
6. O índice final será `1`, o que indica que queremos extrair até o último caractere da string.
7. Ao atribuir o resultado do `slice()` de volta ao `textContent` do display, estaremos removendo o último número da string.

## Negativar um número

1. Vamos selecionar o elemento do botão de número negativo usando o método `getElementById` e atribuir um evento de click a ele.
2. Em nossa função de callback, chamada `toNegativeNumber`, iremos definir a variável `numberAfterOperator` como `true`.
3. Multiplicaremos o conteúdo atual do display por `-1` para transformar o número em sua forma negativa.
4. Em seguida, chamaremos a função `updateDisplay` passando o resultado dessa multiplicação como parâmetro.

## Função para casas decimais

1. Criaremos uma função chamada `insertDecimal`. Essa função é responsável por inserir um ponto decimal no display. Ela segue a seguinte lógica:
    
    - Primeiro, verifica se já existe um ponto decimal no display utilizando a função `existDecimal`. Se a função retornar `false`, significa que não há um ponto decimal presente.
    
    - Em seguida, há um if aninhado que verifica se há um valor presente no display utilizando a função `existValue`. Se a função retornar `true`, significa que há um valor no display.
    
    - Se houver um valor no display, chamamos a função `updateDisplay` passando como parâmetro a string `','`, que representa o ponto decimal. Isso adicionará o ponto decimal após o valor da string existente no display.
    
    - Caso não haja um valor no visor, chamamos a função `updateDisplay` passando como parâmetro a string `'0,'`. Isso adicionará o número zero seguido do ponto decimal ao display.
    
2. A primeira função é chamada `existDecimal`. Ela verifica se já existe um ponto decimal no display. Isso é feito utilizando o método `indexOf(',')` no `textContent` do display. Se o ponto decimal for encontrado, a função retorna `true`. Caso contrário, retorna `false`.
3. A segunda função é chamada `existValue`. Ela verifica se há algum valor presente no display. Ela utiliza a propriedade `length` do `textContent` do display para verificar o número de caracteres presentes. Se o número de caracteres for maior que zero, a função retorna `true`, indicando que há um valor no display. Caso contrário, retorna `false`.
4. Vamos selecionar o elemento do botão decimal e adicionar um evento de click junto da nossa função `insertDecimal`

## Função para ativar o teclado

1. Primeiro, criamos um objeto chamado `mappingKeyboard` para mapear as teclas do teclado com os elementos da calculadora.
    - Cada chave do objeto representa uma tecla do teclado, como `'0'`, `'1'`, `'/'`, `'Escape'`, etc.
    - Cada valor do objeto corresponde ao ID do elemento HTML associado àquela tecla, como `'key0'`, `'key1'`, `'divisionOperator'`, `'clearCalculus'`, etc.
2. Em seguida, adicionamos um ouvinte de evento `keydown` ao documento para capturar quando uma tecla é pressionada.
    - Quando uma tecla é pressionada, a função `keyboardClick` será chamada.
3. Na função `keyboardClick`, recebemos o evento como parâmetro e extraímos a tecla pressionada usando a propriedade `key`.
    - Criamos uma constante `key` para armazenar a tecla pressionada.
4. A função `isKey()` é chamada para verificar se a tecla pressionada está mapeada no objeto `mappingKeyboard`.
    - Essa função verifica se a tecla pressionada está presente nas chaves do objeto usando o método `Object.keys(mappingKeyboard)`.
    - Se a tecla estiver presente, retorna `true`; caso contrário, retorna `false`.
5. Em seguida, dentro do bloco `if (isKey())`, procuramos o elemento HTML correspondente à tecla pressionada usando o ID armazenado no objeto `mappingKeyboard`.
    - Usamos `document.getElementById(mappingKeyboard[key])` para obter o elemento.
    - Em seguida, chamamos o método `click()` nesse elemento para simular um clique nele.
6. A função `isKey()` verifica se a tecla pressionada está presente nas chaves do objeto `mappingKeyboard`.
    - Usamos `Object.keys(mappingKeyboard)` para obter um array com todas as chaves do objeto.
    - Em seguida, usamos `indexOf(key)` para verificar se a tecla pressionada está presente nesse array.
    - Se a tecla estiver presente, `indexOf(key)` retornará um índice maior ou igual a 0, e a função retorna `true`.
    - Caso contrário, `indexOf(key)` retornará -1, e a função retorna `false`.

## Mudar a cor da linha e da coluna

1. Primeiro, selecionamos todos os botões dentro da calculadora usando o seletor `.calculator__buttons > button`. Esses botões são armazenados na variável `buttons`.
2. Em seguida, temos a função `changeRowColor`, que recebe dois parâmetros: `rowNumber` e `color`. Essa função é responsável por alterar a cor de uma determinada linha dos botões.
    
    - Dentro da função, percorremos todos os botões usando o método `forEach`.
    
    - Para cada botão, calculamos o índice da linha correspondente usando a expressão `Math.floor(index / 4) + 1`, onde `index` é o índice atual do botão no array `buttons`. Isso é feito dividindo o índice por 4 e arredondando para baixo com `Math.floor`. Adicionamos 1 ao resultado para obter o número da linha.
    
    - Comparamos o número da linha obtido com o parâmetro `rowNumber`. Se forem iguais, alteramos a cor de fundo do botão para a cor especificada pelo parâmetro `color`, definimos a cor do texto como `#ababab` e adicionamos a classe `scale` para aplicar uma escala de animação ao botão.
    
3. Chamamos a função `changeRowColor` com os argumentos `1` e `'#193543'`. Isso alterará a cor da primeira linha dos botões para `'#193543'`.
4. Em seguida, temos a função `changeColumnColor`, que recebe dois parâmetros: `columnNumber` e `color`. Essa função é responsável por alterar a cor de uma determinada coluna dos botões.
    
    - Dentro da função, percorremos todos os botões usando o método `forEach`.
    
    - Para cada botão, calculamos o índice da coluna correspondente usando a expressão `(index % 4) + 1`, onde `index` é o índice atual do botão no array `buttons`. Isso é feito usando o operador `%` para obter o resto da divisão por 4 e adicionando 1 ao resultado para obter o número da coluna.
    
    - Comparamos o número da coluna obtido com o parâmetro `columnNumber`. Se forem iguais, alteramos a cor de fundo do botão para a cor especificada pelo parâmetro `color`, definimos a cor do texto como `#ababab` e adicionamos a classe `scale` para aplicar uma escala de animação ao botão.
    
5. Chamamos a função `changeColumnColor` com os argumentos `4` e `'#193543'`. Isso alterará a cor da quarta coluna dos botões para `'#193543'`.