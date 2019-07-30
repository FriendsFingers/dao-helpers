const contracts = {
  DAO: ['getMembers', 'generateAirdropArray'],
};

const contractPrompt = require('prompt-sync')({
  sigInt: true,
  autocomplete: complete(Object.keys(contracts)),
});

const contract = contractPrompt('enter contract (tab to autocomplete): ', { value: '' });

if (Object.prototype.hasOwnProperty.call(contracts, contract)) {
  const methodPrompt = require('prompt-sync')({
    sigInt: true,
    autocomplete: complete(contracts[contract]),
  });

  const method = methodPrompt('enter method (tab to autocomplete): ', { value: '' });

  if (contracts[contract].includes(method)) {
    const src = `./core/${contract}.js`;
    const Executor = require(src);

    new Executor(`${contract}.${method}`)[method]()
      .then(() => {
        console.log(`\ncommand ${contract}.${method} done! 💪`);
      })
      .catch(err => {
        console.error(`\ncommand ${contract}.${method} fail! ❌️`);
        console.error(err);
        // process.exit(1);
      });
  } else {
    console.error(`method ${method} not found!`);
  }
} else {
  console.error(`contract ${contract} not found!`);
}

function complete (items) {
  return function (str) {
    let i;
    const ret = [];
    for (i = 0; i < items.length; i++) {
      if (items[i].indexOf(str) === 0) {
        ret.push(items[i]);
      }
    }
    return ret;
  };
}
