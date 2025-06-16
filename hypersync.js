import { HypersyncClient,BlockField,TransactionField,LogField,} from "@envio-dev/hypersync-client";
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

const nfts = {'Magic Eden': ['0x15cafde6','0x4c347fe8','0x9b4f3af5','0x74afcbe6','0xcc5dfcba','0xe7acab24','0x87201b41'],'Poply': ['0xa0712d68','0x7de3bd07','0x9f37092a','0xef706adf','0x765e827f','0xf2fde38b','0xd18e629c','0x4f1ef286','0xf772adf1','0x60806040','0xb2ddee06','0x773b456f'],'NFTs2Me': ['0xe9535095','0xf32a609f','0x765e827f','0xac9650d8','0x23b872dd','0xa22cb465','0x07462d76','0x728ce6dd','0x00000001','0x095ea7b3','0x42842e0e','0x00000000','0xec112d5d','0x205c2878']};
const defiTokens = {'Approve': ['0x095ea7b3'],'Transfer':  ['0xa9059cbb']};
const gaming = {'Lootify': ['0xd80fde1b1a9f2a1c47100798d9d38f321a559f6e','0xe5d182811315fcb4f402fb5ae97b54a06877e4f1'],'Monad 2048': ['0xe0fa8195ae92b9c473c0c0c12c2d6bcbd245de47'],'Monadtiles': ['0xb8dbee86a653a6100b1f62bd61493df730f74419'],'Tezza Poker': ['0x80fe1cf5f0861310b6634635c416d50b6bcc4915','0xf25362515d7bc42bf846c2dd906853cef1518c8c'],'Valor Quest': ['0xe13dc43663ec60f3014314f504a1ed9e9a0756e2'],'Wenwin':  ['0x28a18a4823073f306564d1b3b18b6a0961dd89ff','0x01164570c10ee6790a15e3bd65ec8c17c4170368'],'Meta Leap': ['0x85f70cbc7b0ee53b6070e0a1b4471655f69ea13b','0x6502cd6d0f3429d25d9bee3f26652d840e97d042','0x7c97dd4a6f6caa6668440e10d7caeebc704b8ada','0x2b1629f434b4f5157ccd85f6ffe7f56c724e066b'],'Rug Rumble':  ['0x262fd7a243e9335a733c00de471525d9fee8abdb','0x61ed7ea592d724075ed6179eb8d9c8c7293152b3'],'LootGO':  ['0x7aba1665355d1a23d2ce551d167a4fe709feb485'],'Plato': ['0xd0d542b9a1e9944880faf93deaa432047ef58579','0x67f8ee23a61b6ad77b90672fec7ffd4771d12343'],'DRKVRS':  ['0x1d03198a0bbff614865081a96b65c8a134a224d4'],'Showdown': ['0xe9d8ab94c4b4958cdcffeea96869478bcde76b41','0xa8168086adcd37ff3b69bdfce8d853ad93cedd18','0xa1db5eeed6524eb5315108b9ead6e75a4870df34','0x71dcea7a2d88c86d975664b515fabb14905cd384','0x767917c06ff33aa508605fdec1fa802c6d54e2b4','0x925e4a064ebf04f961e08745c24fcb235b5a91f7','0xed225225526e9af3a464206c36d6c7767fd8a0ac','0xc8436a8634a5b4d2a9a7ae75dffcdcc1abb3c625','0xe77ab7db5bba83b384ff5408282febf99b1cb457','0xd190bf0cb9b82066a2f20a3ec238b0c27a65a83d']};
const social = {'Opinion Labs': ['0x9f2515fa41c85208bc51309693e768f577c4b924','0x1cc00c2669a9ee82ab1088e1b172f9da4bf4bfff','0xa6b71e26c5e0845f74c812102ca7114b6a896ab2','0x9a6a6f5b54b304aef92960c631ad7d4be8d258f6'],'Dusted':  ['0x18c9534dfe16a0314b66395f48549716fff9aa66'],'Fantasy Top': ['0x04edb399cc24a95672bf9b880ee550de0b2d0b1e','0xfa4d5a9cea2822ba08d0266f121011ac527ced64','0xdcf3c00e9f8a2fdaaf19fe59050e80c433b509dc','0x89e4a70de5f2ae468b18b6b6300b249387f9adf0'],'RareBetSports': ['0xa2e3fbc6d97e75b178f6ef40b18709f5fe3d6a2c','0x7d1db4e6cd071b12f3a4af6816ea0585b7b420bf'],'Nad.fun': ['0x619d07287e87c9c643c60882ca80d23c8ed44652','0x822eb1add41cf87c3f178100596cf24c9a6442f6'],'Opals': ['0x73d1aaa8590739c98b3567dc5872963032c99987'], 'Kizzy': ['0x25859318f26a78b7613ef1b7a9005e997ea03821','0x6fa7e462c074d50f0d1b55675cedbdc3e23fda36']};
const defi = {'iZUMi Finance': ['0x706a11af5bb5c2a50ab9802503ddbff69373d1bd','0x817ec83fb6906ba0777e89110d5089313385f4a2','0xaf931d7aab9643d1e63ed2e1fb17911c65e09678','0x29b66280f0ea5f5dfbd7c94d560fc060575360cd','0x64c2f1306b4ed3183e7b345158fd01c19c0d8c5e','0x1ee5edc5fe498a2dd82862746d674db2a5e7fef6','0x77132b63429718db2b6ad8d942ee13a198f6ab49','0xa9754f0d9055d14eb0d2d196e4c51d8b2ee6f4d3','0xf6ffe4f3fdc8bbb7f70ffd48e61f17d1e343ddfd','0x95c5f14106ab4d1dc0cfc9326225287c18c2d247','0x4d140e612e476a6ba54ef1306b2ba398a5deff09','0xeb122de19fea9ed039e2d087113db26017f5f91a','0x551197e6350936976dffb66b2c3bb15ddb723250','0xed9b4e3ed8fe7e820b950f28f939af848f98e995'], 'Curvance':  ['0x8462c247356d7deb7e26160dbfab16b351eef242'],'Purps': ['0xc80585f78a6e44fb46e1445006f820448840386e','0xc921877becb785fdfbb96b6d8354bb443c015995'],'Amertis':  ['0xd158cb79c63f4852485e37f05d20da3093d143ed','0xa89aa6a1f0347f38d75918e07e8a321eb3c8fc09'],'Ambient': ['0x1c74dd2df010657510715244da10ba19d1f3d2b7','0x70a6a0c905af5737ad73ceba4e6158e995031d4b'],'Apriori':  ['0xb2f82d0f38dc453d596ad40a37799446cc89274a'],'Accountable': ['0xfa67a16ccc5d2c3d80e5daf692ddfbb53f8d7cfd','0x6f2f62c374f798eed3ad3278853910beb0dd983c'],'Pancake Swap': ['0x94d220c58a23ae0c2ee29344b00a30d1c2d9f1bc','0xce3478a9e0167a6bc5716dc39dbbbfac38f27623','0xcba6b9a951749b8735c603e7ffc5151849248772','0x1fa1618ae2f5b3ecc73692974a5e28926553c032','0xd34052d665891976ee71e097eaaf03df51e9e3d5','0xfcf38f326ca709b0b04b2215dbc969fc622775f7','0x754a91555a8dd5037315abfd3702ed49d92887b7','0x3f8a06622086e720df1eea35dbca7c0ec49ae7ab','0xb297278a5581c99663e4f85a950a67064dc2317d','0x324b984055f9b0c42c9f6be51a8f5fbf9dd4b7b6','0xa540de8faae57ae43d8506cffa75b746820cbde9','0x7920a0debedc8fda9f3ff094f5ec9881329d7827','0x4325e8d969cf9170c41fb2f34cc86bc511e89664'],  'Kuru': ['0xd3af145f1aa1a471b5f0f62c52cf8fcdc9ab55d3','0xc816865f172d640d93712c68a7e1f83f3fa63235','0x4b186949f31fca0ad08497df9169a6bebf0e26ef','0x350678d87baa7f513b262b7273ad8ccec6ff0f78','0xd8336cb07d4be511ccaf06b799851e1a80f98c71','0x0ec4760f18c70beacdcdb2a12edde02382cf1f66','0x67a4e43c7ce69e24d495a39c43489bc7070f009b'],'OctoSwap':  ['0xb6091233aacacba45225a2b2121bbac807af4255','0xe26dd94f67ca3615fcaf6062750147f37df84f7a','0xb6091233aacacba45225a2b2121bbac807af4255'],'Magma': ['0x2c9c959516e9aaedb2c748224a41249202ca8be7','0x83bc958f2583b8a2dfbeaf7491d4ac1268c7f2f7','0x2c59da213e35d92d2bdbd3e1a4e19c151350bdde','0x69d66356fcf62d8eab1fb2d86f3374508d611b3d'],'Monorail':  ['0x7b5df408da2356e9eecda0492104e758a2b6913d','0x8c15f4a2897dd89de74772cfa376190302801b52','0x7b5df408da2356e9eecda0492104e758a2b6913d'],'Mudigital': ['0x49fdeee09430dd74d2a7fab8b5157f9d47bca87f','0x1a5c6875bcb96b31d312f9ba36ff8af35b748163','0x87d28ff0a712b28d2f89b228118af5e4f84045b4','0xab832f9d41788a792b9801a4889db90c7e28ca3e'],'Fastlane': ['0x3a98250f98dd388c211206983453837c8365bdc1','0xd72d821da82964c0546a5501347a3959808e072f'],'Sherpa': ['0xa6b71e26c5e0845f74c812102ca7114b6a896ab2','0xe31371f8e2c7be43d35dd053b9fa4a613f167426','0xfb06ac672944099e33ad7f27f0aa9b1bc43e65f8'],'Kintsu': ['0xe1d2439b75fb9746e7bc6cb777ae10aa7f7ef9c5'],'Bean Exchange':  ['0xdf0a565f332278ff2d0c50876da3a6701cbc6123','0x1c63420a8388532864347933de1ed61a613054ff','0xca810d095e90daae6e867c19df6d9a8c56db2c89','0x184b615ff6929f5a1f4e20e60bb0c24355fe7216','0x41eb0d6dcf71c21fb54be7408e554dac895b2b62','0xe253d996d1703c4d319c5d2055d8914bf77a8ab7'],'Crust Finance': ['0x8b146d71a2b075407f1c4e8f2092f4ffe6d626b8','0x41ff64e47e35d9ec56def353e15fbe3a27bec5ea','0xa03cc635595f0607622222cd15822cf4f1bcd411','0xeb7b885cf774aab4c658123fb2bdc1096ee3b175','0x021724a16c7831be1faa306a324438ed95a6144e'],'Narwhal Finance': ['0x5dcd7e6ebfe2f4c3572f569d1ba7adeebd8cea4c','0xa02ed5a9ba4a042686168314d1cde809c3bbe421','0x202ecc12b8d4a2c2568ff0702212d00356c919fb','0x3eaf32781c9d6d9b39c14f2763fd99ba47164b57','0x2c71f06c207296b66894e5200f6a6e1ac08ed632','0x319f35a71dfcf3843bda474c7884cefe1f2f308c','0xb88ea39a53eaff588daf34aaf48daaa6f7a26e89','0x2880ab155794e7179c9ee2e38200202908c17b43','0x96855958f2f8f751f64a2d141b5809162515f0a4','0xa13eb47938f76010041e36090d47ed883a743833','0x5bbafd788b896e4bfb3cdef2a7671deb80a0620f','0x745182a566b6080d13c9dd5664f5f53ab4e98d19','0x17642ce98f4abfabcbb5e1a5d5825902cc311ceb','0x59cf938d5e2af9e79685efaf02ad1a97669b7941'],'Pingu Exchange': ['0xa0a3993b67110ed282168c545fea5ae7fcd755a3','0xeab54172d018ddb3beb3593a4764ab068c417388','0x65376254809890ef9335f6f92a032656a2a28ca4','0xd6cbc67c307257e62a2a64d0ea8891520805abd4','0x325012adfcc5d29d2dcdf604633fc17f886fa304','0x2c57d920961007ae56d3b93169e98a803b336ef1','0xc8ed087353ad3fe7ae9e6cf093ed51a4feae079d','0x941183cb012a12b13ce5aa33bec6dd8479438ce6','0xd849497f08180d3f1a79397ef8ae4dbd05ec1a5c','0x1cf4e597f66fea41263ca90e5c1b422c8719e334','0x6dcf87a42ccfcedee684607e406e75d079cbf23a','0x9cb06997ca7bd7ed945a8c3d3456d307c70f1672','0x3d0d5e08b6f37f5e4072d1168a1f543b944a3878','0x3d7ec93875b6a6f0a5102fe29f887ee6e751b12f','0x75f2948bff7d6d6bb6133cc5fe3c710656c2a939','0xfe4b86dba6b80797e4e33695a4d308cc2cab96d8','0xedb0f17e5b701c8a1278b94b961384cf4015f240','0xcf410b10c0f30948033e47b7209cc026054e9f18'],'Nitro Finance': ['0xc218d4dd36c9d865a6da0913b2aa517fa5629dc7','0x91e667106b9f4cdd11be9edbdbf999400f2eff01','0x8f74182c65ea21114483a0fe35691c7e59afa93f','0x6be402b06d4fe8cde9b698a50853a66ea260d009','0xff5ddcf0774006c9b263858f1ad11962baaae41c','0xce896cff1849b2b553bc591f2c474566f8d81730'],'Clober': ['0xaa9575d63dfc224b9583fc303db3188c08d5c85a','0xe64ace1bf550e57461cd4e24706633d7fac9d7b0','0x3e22d091f90ae759733b7cb06a6f7b440d84a425','0xfd845859628946b317a78a9250da251114fbd846'],'Atlantis': ['0x0000000000001ff3684f28c67538d4d072c22734','0xe87a971729d5c0696de97e37aafe31c70f2dc814','0xa2b78d020a4521866e129e27505b6c20ae9e3852','0xc7e09b556e1a00cfc40b1039d6615f8423136df7','0xd7cb0e0692f2d55a17ba81c1fe5501d66774fc4a','0x10253594a832f967994b44f33411940533302acb','0x4439199c3743161ca22bb8f8b6dec5bf6ff65b04','0x955b95b8532fe75ddcf2161f61127be74a768158','0xfe3becd788320465ab649015f34f7771220a88b2','0x4a3bc48c156384f9564fd65a53a2f3d534d8f2b7','0x13fce0acbe6fb11641ab753212550574cad31415','0x03f8b4b140249dc7b2503c928e7258cce1d91f1a','0xa77ad9f635a3fb3bccc5e6d1a87cb269746aba17','0x3012e9049d05b4b5369d690114d5a5861ebb85cb','0xd637cbc214bc3dd354abb309f4fe717ffdd0b28c','0x6ad6a4f233f1e33613e996ccc17409b93ff8bf5f','0x69d57b9d705ead73a5d2f2476c30c55bd755cc2f','0xb4f9b6b019e75cbe51af4425b2fc12797e2ee2a1','0x50fcbf85d23af7c91f94842fecd83d16665d27ba'],'Mace': ['0x82193139cce644b32919d42abf84a15d57b8aff6','0x7c03da572a0180e77f544bd69134babf4a26cf63','0x3e0dea0432bd7e63834627c1aafb20574e0fca6c'],'Uniswap': ['0xfb8e1c3b833f9e67a71c859a132cf783b645e436','0x3ae6d8a282d67893e17aa70ebffb33ee5aa65893','0x733e88f248b742db6c14c0b1713af5ad7fdd59d0','0x961235a9020b05c44df1026d956d1f4d78014276']};

const client = HypersyncClient.new({ url: "https://monad-testnet.hypersync.xyz"});

let latestData = {};
let previousCounts = {};

app.use(cors());
app.use(express.json());

app.get('/api/data', (req, res) => {
  res.json(latestData);
});

async function getData() {
  const height = await client.getHeight();
  
  const nftsCount = {'Magic Eden': 0,'Poply': 0,'NFTs2Me': 0};
  const defiTokensCount = {'Approve': 0,'Transfer':  0};
  const gamingCount = {'Lootify': 0,'Monad 2048': 0,'Monadtiles': 0,'Tezza Poker': 0,'Valor Quest': 0,'Wenwin':  0,'Meta Leap': 0,'Rug Rumble':  0,'LootGO':  0,'Plato': 0,'DRKVRS':  0,'Showdown': 0};
  const socialCount = {'Opinion Labs': 0,'Dusted':  0,'Fantasy Top': 0,'RareBetSports': 0,'Nad.fun': 0,'Opals': 0, 'Kizzy': 0};
  const defiCount = {'iZUMi Finance':0,'Curvance':  0,'Purps': 0,'Amertis':  0,'Ambient': 0,'Apriori':  0,'Accountable': 0,'Pancake Swap': 0,  'Kuru': 0,'OctoSwap':  0,'Magma': 0,'Monorail':  0,'Mudigital': 0,'Fastlane': 0,'Sherpa': 0,'Kintsu': 0,'Bean Exchange':  0,'Crust Finance': 0,'Narwhal Finance': 0,'Pingu Exchange': 0,'Nitro Finance': 0,'Clober': 0,'Atlantis': 0,'Mace': 0,'Uniswap': 0};

  const query = {
    fromBlock: height-1,
    toBlock: height+1,
    transactions: [{}],
    logs: [{}],
    fieldSelection: {
      block: [ BlockField.Number, BlockField.Timestamp, BlockField.GasUsed, BlockField.GasLimit, BlockField.Hash ],
      transaction: [ TransactionField.Hash, TransactionField.From, TransactionField.To, TransactionField.Value, TransactionField.Input ],
      log: [ LogField.Address, LogField.Topic0, LogField.Topic1, LogField.Topic2, LogField.Topic3, LogField.Data, LogField.TransactionHash, LogField.TransactionIndex, LogField.LogIndex, LogField.Removed ],
    },
    include_all_blocks: true,
  };

  try {
    const stream = await client.stream(query, {});
    const res = await stream.recv();
    if (res.data) {
      let blockNumber = BigInt(0);
      let gasLimit = BigInt(0);
      let gasUsed = BigInt(0);
      let volume = BigInt(0);
      const txs = res.data.transactions.length;

      if (res?.data?.blocks) {
        blockNumber = BigInt(res.data.blocks[1].number);
        gasUsed = res.data.blocks[0].gasUsed + res.data.blocks[1].gasUsed;
        gasLimit = res.data.blocks[0].gasLimit * BigInt(2);
      }

      if (res?.data?.transactions) {
        res.data.transactions.forEach((tx) => {

          const from = tx.from?.toLowerCase();
          const to = tx.to?.toLowerCase();
          const functionSig = tx.input.substring(0, 10);
          volume += tx.value;

          let flag = false;
          for (const dapp in nfts) { if (nfts[dapp].includes(functionSig)){nftsCount[dapp]++; flag=true; break;} }
          if (!flag){for (const sig in defiTokens) { if (defiTokens[sig].includes(functionSig)){defiTokensCount[sig]++; flag=true; break;} }}
          if (!flag){for (const dapp in gaming) { if (gaming[dapp].includes(to) || gaming[dapp].includes(from)){gamingCount[dapp]++; flag=true; break;} }}
          if (!flag){for (const dapp in social) { if (social[dapp].includes(to) || social[dapp].includes(from)){socialCount[dapp]++; flag=true; break;} }}
          if (!flag){for (const dapp in defi) { if (defi[dapp].includes(to) || defi[dapp].includes(from)){defiCount[dapp]++; flag=true; break;} }}
        });
      }
      
      if (res?.data?.logs) {
        res.data.logs.forEach((log) => {
          if(log.removed == false){
            const ca = log.address?.toLowerCase();
            if (social['Kizzy'].includes(ca)){socialCount['Kizzy']++;}
          }
        });  
      }

      if (latestData != null && Object.keys(latestData).length > 0) {
        previousCounts = {
          nftsCount: latestData.nftsCount,
          socialCount: latestData.socialCount,
          gamingCount: latestData.gamingCount,
          defiCount: latestData.defiCount,
          defiTokensCount: latestData.defiTokensCount,
          tps: latestData.tps
        };
      }

      latestData = {
        blockNumber: blockNumber.toString(),
        gasUsed: gasUsed.toString(),
        gasLimit: gasLimit.toString(),
        volume: volume.toString(),
        tps: txs,
        nftsCount,
        socialCount,
        gamingCount,
        defiCount,
        defiTokensCount,
        previousCounts,
        transactions: res.data.transactions.map(tx => ({
          ...tx,
          value: tx.value ? tx.value.toString() : '0',
          gas: tx.gas ? tx.gas.toString() : '0',
          gasPrice: tx.gasPrice ? tx.gasPrice.toString() : '0'
        })).slice(-10),
      };
  } // res.nextBlock for pagination
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function start() {
  while (true) {
    try {
      await getData();
    } catch (error) {
      console.error('Error in getData:', error.message);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000)); // delay
  }
}

app.listen(port, 'localhost' () => {
  console.log(`Server running at http://localhost:${port}`);
  start();
});