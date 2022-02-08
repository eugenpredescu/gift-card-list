# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [0.14.0] - 2022-02-08

## [0.13.0] - 2022-02-08

## [0.12.0] - 2022-01-27
### Changed
- Changing the middlewares codes to resolvers code
- Fixing the tests files

## [0.11.0] - 2022-01-20
### Changed
- Making the routes private, so that only the vtex.list application can call them

## [0.10.0] - 2022-01-20
### Changed
- Back-end tests

## [0.9.0] - 2022-01-20
### Changed
- Changing the way to add credit to the gift card. Previously, all value available in the list was added to the gift card, now the user chooses the value to be added to the gift card

## [0.8.0] - 2022-01-18
### Changed
- Creating a screen in the admin so the store owner can choose which account will be used for the list owners to buy the products with their gift card
- Adding routes to access data and save new data in the backend
- Adding react-intl to components

## [0.7.0] - 2022-01-18
### Changed
- Admin tests


## [0.6.0] - 2022-01-13
### Changed
- Create a route that returns all subaccounts of an account
- Save the choice of this subacocunt in the settings
- Create route to redeem which subaccount is chosen
- Join the profile system of the account used with the chosen subaccount
- Unlink an account from a subaccount if it changes which will be the main account

## [0.5.0] - 2022-01-12
### Changed
- Creating a route to access the gift card RedemptionCode from a defined email
- Exchanging messages defined by const

## [0.4.0] - 2022-01-12
### Changed
- Add a new field in the schema, the gift card redemption history.
- Developing a route to access the history of adding credit to the gift card
- Implementing how to populate this field correctly in the createGiftCard file

## [0.3.0] - 2022-01-11
### Changed
- Changing the structure of how the gift card works. Previously, the value in the gift card related to a single customer present list. Now the value to be added to the gift card will be equal to the sum of all the lists of a customer

## [0.2.0] - 2022-01-10
### Changed
- Creating a masterdata to facilitate the addition values in the gift card
 - If don't have gift card for the present list, a new gift card is created and all generated values related to it are added to the masterdata
 - If you already have a gift card for the present list, all information is taken from the masterdata and a new value added to the gift card
- Adding functions searchRaw, save and update in masterdata
- Restructuring the logic to add values in the Gift Card

## [0.1.0] - 2022-01-10
### Changed
- Swapping the mocked data of the functions for data passed by the user
- Accessing data of vtex.list-graphql application to pass it to createRegisterOnProfileSystem function
- Creating a function to retrieve values from a profile system if there was already a registration on it
- Add requestId data to addCreditInGiftCard function (prevented some credits not being added without requestId)


## [0.0.1] - 2022-01-10
### Changed
- Initial node settings
- Validating email
- Creating a profile system
- Creating a new route to create a new gift card, with the profile system generated earlier, and the rest of the mocked data


