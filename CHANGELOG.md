# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [0.11.0] - 2022-01-20
### Changed
-  Tornando as rotas privativas, para que só o aplicativo vtex.list possa chama-las

## [0.10.0] - 2022-01-20
### Changed
-  Testes back-end

## [0.9.0] - 2022-01-20
### Changed
- Trocando a forma de como adicionar credito no gift card. Anteriormente era adicionado todo valor disponível na lista para o gift card, agora o usuário escolhe o valor a ser adicionado no gift card


## [0.8.0] - 2022-01-18
### Changed
- Criando uma tela no admin para que o dono da loja possa escolher qual account que será usada para os donos da lista comprem o produtos com seu gift card
- Adicionando rotas para acessar os dados e salvar dados novo no back-end
- Adiconando react-intl nos componentes

## [0.7.0] - 2022-01-18
### Changed
- Testes do admin


## [0.6.0] - 2022-01-13
### Changed
- Criar uma rota que retorne todas as subaccount de uma account
- Salvar a escolha desse subacocunt no settings
- Criar rota para resgatar qual a subaccount escolhida
- Juntar o profile system da account utilizada com a subaccount escolhida
- Desunir uma account de uma subaccount caso seja alterado qual será é a account principal

## [0.5.0] - 2022-01-12
### Changed
- Criando uma rota para acessar o RedemptionCode do gift card de um email definido
- Trocando mensagens definidas por const

## [0.3.0] - 2022-01-12
### Changed
-  Adicionar um novo campo no schema, o historico de resgate do gift card. 
-  Desenvolvendo uma rota para acessar os historicos de adição de credito no gift card, 
-  Implementando como popular esse campo corretamente no arquivo createGiftCard

## [0.3.0] - 2022-01-11
### Changed
- Alterando a estrutura do funcionamento do gift card. Anteriormente se adicionava o valor no gift card relacionado a uma única lista do cliente. Agora o valor a ser adicionado no gift card será igual a soma de todas as lista de um cliente

## [0.2.0] - 2022-01-10
### Changed
- Criando um masterdata para facilitar a adição de valores no gift card
  Caso não haja um gift card para a lista é criado um novo gift card e adicionado todos os valores gerados relacionado a ele no masterdata
  Caso já tenha um gift card para uma lista é pego todas as informações no masterdata e adicionado um novo valor no gift card
- Adicionando funções de searchRaw, save e update no masterdata
- Reestruturando a lógica para adicionar valores no Gift Card

## [0.1.0] - 2022-01-10
### Changed
- Trocando os dados mockados das funções por dados passados pelo usuário
- Acessando dados do aplicativo vtex.list-graphql para passa-los para a função createRegisterOnProfileSystem
- Criando função para resgatar valores de um profile system caso já hava cadastro
- Adicionar dados de requestId para função do addCreditInGiftCard (impedia que alguns creditos não fosse adicionados sem o requestId)


## [0.0.1] - 2022-01-10
### Changed
- Configurações inicias do node
- Validando email
- Criando um profile system
- Criando uma nova rota para criar um novo gift card, com o profile system gerado anteriormente, e o resto dos dados mockados 


