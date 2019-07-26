const fs = require('fs');
const path = require('path');
const { getContract, promisify } = require('../lib/web3Helper');
const writeFile = promisify(fs.writeFile);

const Dapp = require('../lib/dapp.js');

const DAOArtifact = require('../abi/DAO');

class Members {
  constructor (command) {
    this.dapp = new Dapp(command);
  }

  async init () {
    await this.dapp.init();

    const DAOContract = getContract(DAOArtifact, this.dapp.eth.netId);
    this.instance = await DAOContract.at(this.dapp.eth.contractAddress);

    global.logger.info(`Set instance to ${this.instance.address}`);
  }

  async start () {
    await this.init();

    global.logger.info('Starting process...');

    const outputFile = path.resolve(this.dapp.output, 'members.json');

    const addressesMap = [];

    const membersNumber = (await this.instance.membersNumber().valueOf());

    for (let i = 1; i <= membersNumber; i++) {
      const member = this.dapp.formatStructure(await this.instance.getMemberById(i));

      addressesMap.push(member);

      global.logger.info(
        `${i}/${membersNumber}: Address ${member.address}, staked: ${member.stakedTokens}`
      );
    }

    await writeFile(outputFile, JSON.stringify(addressesMap, null, 2), 'utf8');
  }
}

module.exports = Members;
