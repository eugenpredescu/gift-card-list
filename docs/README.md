# O aplicativo Gift Card List

O aplicativo de Gift Card List tem como objetivo expor rotas para que o aplicativo de listas (vtex.list) possa criar um gift card para os donos da lista e adicionar crédito referente aos presentes recebidos nessas listas. Também contém uma aplicação no admin para que o dono da loja possa definir qual será a account principal (account onde os produtos estão sendo vendidos)

## Instalando

### O ADMIN

Para instalar o aplicativo no admin e, assim, gerenciar qual será a account principal, deve-se entrar em seu terminal, logar no workspace e digitar o comando:

```json
  vtex install vtex.gift-card-list@0.x
```

### O Back-end
Para disponibilizar o componente em sua loja, é necessário adicionar nas "dependencies" do manifest o seguinte código:

  "vtex.gift-card-list": "0.x"
Em seguida, já é possível adicionar o componente de gift card list em seu aplicativo.

## O funcionamento

### No ADMIN

Após instalar o aplicativo em sua loja, já estará disponível em seu ambiente ADMIN o aplicativo de Configurações do Gift Card.
Para utilizá-lo, basta acessar a barra lateral em "OUTROS", a qual deve conter o aplicativo "Configurações do Gift Card".
Clicando no aplicativo, deverá visualizar a seguinte página:

![Captura de Tela 2022-01-21 às 11 32 20 (2)](https://user-images.githubusercontent.com/80836180/150544610-04fa9a7e-f5ed-4498-bc63-827526097bd7.png)

Nessa página é possível escolher qual será a account principal

Um exemplo de como pode-se ser escolhida a account.

Para escolher a account deve-se clicar no campo 'Nome da account principal' e escolher uma das opções mostradas
![Captura de Tela 2022-01-21 às 11 39 42 (2)](https://user-images.githubusercontent.com/80836180/150545843-91ba92bb-3c16-42d8-84ec-ff7015a2a1e4.png)

Em seguida deve-se confirmar a troca
![Captura de Tela 2022-01-21 às 11 40 12 (2)](https://user-images.githubusercontent.com/80836180/150545849-cd2171f9-8285-4970-9133-567f620da689.png)

E por fim é retornado um aviso se o salvamento foi ou não concluído com sucesso
![Captura de Tela 2022-01-21 às 11 40 16 (2)](https://user-images.githubusercontent.com/80836180/150545854-0b8c9543-f59c-4966-aea1-5b7f63ec9aea.png)


### No aplicativo de Lista na Store

Quando se entra em minhas listas pode-se encontrar um campo de adicionar crédito no giftcard.

ADICIONAR UMA FOTO DA PAGINA DA LISTA COM O BOTÃO DO GIFT CARD

Caso haja crédito disponível para ser adicionado no gift card, o dono da lista poderá escolher quanto crédito quer disponibilizar no gift card. E ao adicionar esse valor, é retornado para o usuário um código do vale presente. Assim que houver crédito no gift card o dono da lista já poserá usa-lo na loja principal.
Para utilizar o crédito disponível pode se logar na loja e utilizar o vale presente que aparecerá no campo de pagamento. Outra forma de utilizar é com o código de vale presente que foi devolvido na página de lista (ver foto acima)

