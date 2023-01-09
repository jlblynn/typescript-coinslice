import * as CryptoTS from 'crypto-ts';

type Slice = {
  id: string;
  owner: string;
  history: Array<{
    type: string;
    from: string;
    to: string;
    message?: string;
  }>;
};

type Transaction = {
  id: string;
  from: string;
  to: string;
  slices: Array<Slice>;
  message?: string;
};

type Coin = {
  id: string;
  slices: Array<Slice>;
};

type Wallet = {
  address: string;
  username: string;
  password: string;
  coins: Array<Coin>;
};


const wallets: Array<Wallet> = [];

const createCoin = (): Coin => {
  const coin: Coin = {
    id: Math.random().toString(36).substr(2, 8),
    slices: []
  };

  // create 10 slices for the coin
  for (let i = 0; i < 10; i++) {
    coin.slices.push({
      id: Math.random().toString(36).substr(2, 8),
      owner: coin.id,
      history: []
    });
  }

  return coin;
};

const createWallet = (username: string, password: string): string => {
  // create a new wallet object
  const wallet = {
    address: `${username}-${Math.random().toString(36).substr(2, 8)}`,
    username,
    password,
    coins: []
  };

  // add the wallet to the wallets array
  wallets.push(wallet);

  // return the wallet address
  return wallet.address;
};


const sendSlice = (slice: Slice, walletAddress: string, message: string, username: string, password: string): void => {
  // find the wallet in the wallets array
  const wallet = wallets.find((wallet) => wallet.address === walletAddress);

  // check that the wallet exists and the username and password are correct
  if (wallet && wallet.username === username && wallet.password === password) {
    // check that the slice is owned by the wallet
    if (slice.owner === walletAddress) {
      // check that the wallet address is valid
      if (walletAddress.match(/^[a-zA-Z0-9]{8,}$/)) {
        // search for the original slice in the wallet's coins
        let originalSlice;
        wallet.coins.forEach((coin) => {
          originalSlice = coin.slices.find((s) => s.id === slice.id);
        });

        // check that the slice is a match for the originally created slices
        if (originalSlice) {
          // send the slice
          slice.owner = walletAddress;

          // add a record to the slice's history
          slice.history.push({
            type: 'sent',
            from: slice.owner,
            to: walletAddress,
            message
          });
        } else {
          console.log('Error: slice does not match originally created slices');
        }
      } else {
        console.log('Error: invalid wallet address');
      }
    } else {
      console.log('Error: slice not owned by wallet');
    }
  } else {
    console.log('Error: invalid wallet credentials');
  }
};

const sendSlices = (slices: Array<Slice>, walletAddress: string, message: string, username: string, password: string): void => {
  // create a new transaction object
  const transaction: Transaction = {
    id: Math.random().toString(36).substr(2, 8),
    from: slices[0].owner,
    to: walletAddress,
    slices,
    message
  };

  // send each slice in the transaction
  slices.forEach((slice) => {
    sendSlice(slice, walletAddress, message, username, password);
  });

  // broadcast the transaction
  broadcastTransaction(transaction);
};

const showSliceHistory = (slice: Slice): void => {
  console.log(slice.history);
};

const countSlices = (coin: Coin): number => {
  return coin.slices.length;
};

const createHash = (data: string): string => {
  // create a hash of the data and return it as a hexadecimal string
  return CryptoTS.SHA256(data).toString();
};

const hashTransaction = (transaction: Transaction): string => {
  // convert the transaction to a string and hash it
  const transactionString = JSON.stringify(transaction);
  return CryptoTS.SHA256(transactionString).toString();
};

const broadcastTransaction = (transaction: Transaction): void => {
  // create a hash of the transaction
  const transactionHash = hashTransaction(transaction);

  // broadcast the transaction and hash to the network
  console.log(`Transaction ${transactionHash} broadcast to network:`);
  console.log(transaction);
};
