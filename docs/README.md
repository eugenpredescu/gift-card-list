# The Gift Card List Application

The Gift Card List app aims to expose routes so that the list app [vtex.list](https://github.com/vtex-apps/list) can create a gift card for the list owners and add credit regarding gifts received on these lists. It also contains an admin application so that the store owner can define which will be the main account (account where the products are being sold)

## Installing

### The ADMIN

To install the application in the admin and, thus, manage which will be the main account, you must enter in your terminal, log in to the workspace and enter the command:

```json
  vtex install vtex.gift-card-list@0.x
```

### The Back-end

To make the component available in your store, you need to add the following code to the `dependencies` of the manifest:

```json
  "dependencies": {
      "vtex.gift-card-list": "0.x"
    }
```

Then you can add the gift card list component in your application.

## The Operation

### On ADMIN

After installing the application in your store, the Gift Card Settings application will already be available in your ADMIN environment.
To use it, just access the sidebar under "OTHERS", which should contain the "Gift Card Settings" application.
Clicking on the application, you should see the following page:

![Captura de Tela 2022-01-21 às 11 32 20 (2)](https://user-images.githubusercontent.com/80836180/150544610-04fa9a7e-f5ed-4498-bc63-827526097bd7.png)

On this page it is possible to choose which will be the main account

An example of how the account can be chosen.

To choose the account, click on the 'Main account name' field and choose one of the options shown
![Captura de Tela 2022-01-21 às 11 39 42 (2)](https://user-images.githubusercontent.com/80836180/150545843-91ba92bb-3c16-42d8-84ec-ff7015a2a1e4.png)

Then confirm the exchange
![Captura de Tela 2022-01-21 às 11 40 12 (2)](https://user-images.githubusercontent.com/80836180/150545849-cd2171f9-8285-4970-9133-567f620da689.png)

Finally, a warning is returned whether the save was successfully completed or not.
![Captura de Tela 2022-01-21 às 11 40 16 (2)](https://user-images.githubusercontent.com/80836180/150545854-0b8c9543-f59c-4966-aea1-5b7f63ec9aea.png)


### In the List App in the Store

When you enter my lists you can find a field to add credit to the giftcard.

<!---
ADICIONAR UMA FOTO DA PAGINA DA LISTA COM O BOTÃO DO GIFT CARD
-->
📢 This feature will be implemented in the future

![](https://dummyimage.com/600x400/000/fff)


If there is credit available to be added to the gift card, the owner of the list will be able to choose how much credit he wants to make available on the gift card. And when adding this value, a gift card code is returned to the user. As soon as there is credit on the gift card, the owner of the list will be able to use it in the main store.
To use the available credit, you can log in to the store and use the gift card that will appear in the payment field. Another way to use it is with the gift card code that was returned on the list page (see photo above)
