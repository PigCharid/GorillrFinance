//   // GorillaFinanceSilverNFT
// async function main() {
//   const GorillaFinanceSilverNFT = await ethers.getContractFactory("GorillaFinanceSilverNFT");
//   console.log("Deploying GorillaFinanceSilverNFT...");

//   const _GorillaFinanceSilverNFT = await GorillaFinanceSilverNFT.deploy("GorillaFinanceSilverNFT","GorillaFinanceSilverNFT","ipfs://QmSr7HnGrCmRXfRSqu4VzptNd6MRDHsxj1MY68t5J8gwuQ");

//   console.log("GorillaFinanceSilverNFT deployed to:", _GorillaFinanceSilverNFT.address);
// }

// // 这里也可以简化为 main()，后面的都省略也可以
// main()
//   .then(() => process.exit(0))
//   .catch(error => {
//       console.error(error);
//       process.exit(1);
//   });


//     // GorillaFinanceGoldNFT
// async function main() {
//   const GorillaFinanceGoldNFT = await ethers.getContractFactory("GorillaFinanceGoldNFT");
//   console.log("Deploying GorillaFinanceGoldNFT...");

//   const _GorillaFinanceGoldNFT = await GorillaFinanceGoldNFT.deploy("GorillaFinanceGoldNFT","GorillaFinanceGoldNFT","ipfs://QmY8vcS3vzMq51F3JQ11UyGokp2WTMcRP1x2AXaSKcg8EA");

//   console.log("GorillaFinanceGoldNFT deployed to:", _GorillaFinanceGoldNFT.address);
// }

// // 这里也可以简化为 main()，后面的都省略也可以
// main()
//   .then(() => process.exit(0))
//   .catch(error => {
//       console.error(error);
//       process.exit(1);
//   });
  

// // GorillaFinanceDiamondNFT
// async function main() {
//   const GorillaFinanceDiamondNFT = await ethers.getContractFactory("GorillaFinanceDiamondNFT");
//   console.log("Deploying GorillaFinanceDiamondNFT...");

//   const _GorillaFinanceDiamondNFT = await GorillaFinanceDiamondNFT.deploy("GorillaFinanceDiamondNFT","GorillaFinanceDiamondNFT","ipfs://QmewPkzPxSnKjt2FitRoH46P23bHNb5sKW7RPQ68mznyYy");

//   console.log("GorillaFinanceDiamondNFT deployed to:", _GorillaFinanceDiamondNFT.address);
// }

// // 这里也可以简化为 main()，后面的都省略也可以
// main()
//   .then(() => process.exit(0))
//   .catch(error => {
//       console.error(error);
//       process.exit(1);
//   });




// xGorilla
async function main() {
  const xGorillaStakeable = await ethers.getContractFactory("xGorillaStakeable");
  console.log("Deploying xGorillaStakeable...");
  const _xGorillaStakeable = await xGorillaStakeable.deploy("xGorilla","xGorilla");
  console.log("xGorillaStakeable deployed to:", _xGorillaStakeable.address);
}

// 这里也可以简化为 main()，后面的都省略也可以
main()
  .then(() => process.exit(0))
  .catch(error => {
      console.error(error);
      process.exit(1);
  });