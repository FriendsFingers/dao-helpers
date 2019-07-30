const fs = require('fs');
const path = require('path');
const { web3, getContract, promisify } = require('../lib/web3Helper');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const fileExists = (...args) => promisify(fs.stat)(...args).then(() => true).catch(() => false);

const Dapp = require('../lib/dapp.js');

const DAOArtifact = require('../abi/DAO');

class DAO {
  constructor (command) {
    this.dapp = new Dapp(command);
  }

  async init () {
    await this.dapp.init();

    const DAOContract = getContract(DAOArtifact, this.dapp.eth.netId);
    this.instance = await DAOContract.at(this.dapp.eth.contractAddress);

    global.logger.info(`Set instance to ${this.instance.address}`);
  }

  async getMembers () {
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

  async generateAirdropArray () {
    const inputFile = path.resolve(this.dapp.input);
    const airdropArrayFile = path.resolve(this.dapp.output, 'airdrop_array.json');

    const members = (await fileExists(inputFile)) ? JSON.parse(await readFile(inputFile)) : [];

    const airdropArray = {
      accounts: [],
      amounts: [],
    };

    let i = 1;
    for (const member of members) {
      airdropArray.accounts.push(member.address);

      const airdropValue = 1000 + Math.min(member.stakedTokens, 5000);

      airdropArray.amounts.push(web3.toWei(airdropValue));

      global.logger.info(
        `${i}/${members.length}: Address ${member.address}, staked: ${member.stakedTokens}, airdrop: ${airdropValue}`
      );

      await writeFile(airdropArrayFile, JSON.stringify(airdropArray, null, 2), 'utf8');

      i++;
    }
  }
}

module.exports = DAO;
