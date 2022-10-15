import { ApiPromise, WsProvider } from '@polkadot/api';

// Construct
const wsProvider = new WsProvider('wss://rpc.polkadot.io');
const api = await ApiPromise.create({ provider: wsProvider });

// Do something
console.log(api.genesisHash.toHex());

ApiPromise
  .create({ provider: wsProvider })
  .then((api) =>
    console.log(api.genesisHash.toHex())
  );


    // Wait until we are ready and connected
    await api.isReady;

    // Do something
    console.log(api.genesisHash.toHex());

        // The length of an epoch (session) in Babe
    console.log(api.consts.babe.epochDuration.toNumber());

    // The amount required to create a new account
    console.log(api.consts.balances.existentialDeposit.toNumber());

    // The amount required per byte on an extrinsic
    console.log(api.consts.transactionPayment?.transactionByteFee?.toNumber());

    // The actual address that we will use
    const ADDR = '5DTestUPts3kjeXSTMyerHihn1uwMfLj8vU8sqF7qYrFabHE';
    const ADDR1 = '5DTestUPts3kjeXSTMyerHihn1uwMfLj8vU8sqF7qYrFabHE';
    const ADDR2 = '5DTestUPts3kjeXSTMyerHihn1uwMfLj8vU8sqF7qYrFabHE';

    // Retrieve the account balance & nonce via the system module
    const [now, { nonce, data: balance }] = await Promise.all([
        api.query.timestamp.now(),
        api.query.system.account(ADDR)
      ]);

    console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);


    // Retrieve the chain name
    const chain = await api.rpc.system.chain();

    // // Retrieve the latest header
    // const lastHeader = await api.rpc.chain.getHeader();

    // // Log the information
    // console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);

    // Subscribe to the new headers
    // await api.rpc.chain.subscribeNewHeads((lastHeader) => {
    //     console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
    // });


    let count = 0;

    // Subscribe to the new headers
    const unsubHeads = await api.rpc.chain.subscribeNewHeads((lastHeader) => {
    console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash} was authored by ${lastHeader.author}`);
    
    // Here we only want to log the first 10 headers

    if (++count === 10) {
        unsubHeads();
     }
    });

    // Retrieve the current timestamp via subscription
    const unsub1 = await api.query.timestamp.now((moment) => {
        console.log(`The last block has a timestamp of ${moment}`);
    });

    // Subscribe to balance changes for our account
    const unsub2 = await api.query.system.account(ADDR, ({ nonce, data: balance }) => {
        console.log(`free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`);
    });

    // Subscribe to balance changes for 2 accounts, ADDR1 & ADDR2 (already defined)
    const unsub = await api.query.system.account.multi([ADDR1, ADDR2], (balances) => {
        const [{ data: balance1 }, { data: balance2 }] = balances;
    
        console.log(`The balances are ${balance1.free} and ${balance2.free}`);
    });

    // Subscribe to balance changes for 2 accounts, ADDR1 & ADDR2 (already defined)
   const unsub3 = await api.query.system.account.multi([ADDR1, ADDR2], (balances) => {
    const [{ data: balance1 }, { data: balance2 }] = balances;
  
    console.log(`The balances are ${balance1.free} and ${balance2.free}`);
  });
  
  const validatorKeys = await api.query.staking.validators.keys();

  // Subscribe to the timestamp, our index and balance
const unsub4 = await api.queryMulti([
  api.query.timestamp.now,
  [api.query.system.account, ADDR]
], ([now, { nonce, data: balance }]) => {
  console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);
});
