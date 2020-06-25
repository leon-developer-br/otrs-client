# OTRS client

#### Install dependencies

```
npm i -g yarn;
yarn install;
```

#### Create tickets in batch

```
1 - open src/scripts/full:group.ts
2 - replaces tickets array with your data
3 - yarn full:group

Obs: When execute yarn full:group, a delay of 10 minutos is defined to close the tickets. You can control this time on config/default.yaml.
```

#### Create single ticket

```
yarn full:single 'Title text' 'Message body text'
```

#### Solve a ticket using ticket number

```
yarn solve:single <ticketNumber>
```
