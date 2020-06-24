# OTRS client

#### Install dependencies

```
npm i -g yarn;
yarn install;
```

#### Create tickets in batch

```
1 - open *src/app.ts*.
2 - replaces tickets array with your data.
3 - runs *yarn dev*.
```

#### Create single ticket

```
yarn full:single 'Title text' 'Message body text'
```

#### Solve a ticket using ticket number

```
yarn solve:single <ticketNumber>
```
