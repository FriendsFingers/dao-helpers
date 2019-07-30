# Commands to do stuff with FriendsFingers' Smart Contracts

[![MIT licensed](https://img.shields.io/github/license/FriendsFingers/dao-helpers.svg)](https://github.com/FriendsFingers/dao-helpers/blob/master/LICENSE)

## Installation

```bash
npm install
```

## Usage

```bash
node helpers
```

### Development

```bash
node helpers --contract=0x123
```

### Main Ethereum Network

```bash
node helpers --endpoint=https://mainnet.infura.io --net-id=1 --contract=0x123
```

You will be prompted with

```bash
enter contract (tab to autocomplete):
```

Available contracts `['DAO']`.

```bash
enter method (tab to autocomplete):
```

Available methods `['getMembers', 'generateAirdropArray']`.

### DAO

#### getMembers

Analyse DAO and produce an array with members

#### generateAirdropArray

Analyse members and produce an array with airdrop amount

## Options

```bash
--endpoint, -e      ethereum rpc endpoint.                              [string]    [default: "http://127.0.0.1:8545"]
--input, -i         path of json file containing the list of datas      [string]    [default: "./input/data.json"]
--out, -o           directory for json files where to store results     [string]    [default: "./scripts/output"]
--net-id, -n        network id                                          [number]    [default: 5777]
--block, -b         block number                                        [string]    [default: "latest"]
--from, -f          sending address                                     [string]
--contract, -c      contract address                                    [string]
--init-wallet       init wallet or not                                  [boolean]   [default: false]
--gas-limit         provided gas limit                                  [number]    [default: 6721975]
--gas-price         provided gas price in gwei                          [number]    [default: 1]
--nonce             progressive nonce id                                [number]
--log-level         log level used for logging                          [string]    [default: "debug"]
--pause-every       pause every the specified number of transactions    [number]    [default: 1]
--timeout           number of seconds to wait                           [number]    [default: 10]
--bulk              number of addresses to use                          [number]    [default: 1]
--dryrun            simulate sends                                      [boolean]
--help              show help                                           [boolean]
```

## License

Code released under the [MIT License](https://github.com/FriendsFingers/dao-helpers/blob/master/LICENSE).
