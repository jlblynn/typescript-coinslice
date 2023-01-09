Coin Slices
A program to mint, send, and receive unique coins made up of slices.

Types
Slice
A single slice of a coin.

Properties:

id: a unique string that identifies the slice.
owner: a string that represents the wallet address of the current owner of the slice.
history: an array of objects that track the history of the slice, including the type of action (e.g. "sent" or "received"), the wallet address of the sender and receiver, and an optional message.
Coin
A complete coin, made up of multiple slices.

Properties:

id: a unique string that identifies the coin.
slices: an array of Slice objects that make up the coin.
Wallet
A wallet that can hold coins and slices.

Properties:

address: a string that represents the wallet's address.
username: a string that represents the username associated with the wallet.
password: a string that represents the password associated with the wallet.
coins: an array of Coin objects that are associated with the wallet.
Functions
createCoin
Creates a new Coin object with 10 slices.

Returns: the Coin object.

createWallet
Creates a new Wallet object with an empty coins array.

Adds the Wallet object to the wallets array.

Returns: the wallet's address.

sendSlice
Sends a slice from one wallet to another.

Checks that the wallet and credentials are valid, and then checks that the slice is owned by the sending wallet.

Searches for the original slice in the coins array of the sending wallet, and checks that the slice is a match for the originally created slices.

If the slice is a match, it is sent to the receiving wallet and a record is added to the slice's history.

showSliceHistory
Displays the history of a slice.

countSlices
Counts the number of slices in a coin.

Transactions
The program also includes three functions for broadcasting and hashing transactions: broadcastTransaction, hashTransaction, and createHash. These functions are used to broadcast and hash the transactions that occur when slices are sent and received.