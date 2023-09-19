import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets/img';

export const navlinks = [
  {
    name: 'swap',
    imgUrl: dashboard,
    link: '/swap',
  },
  {
    name: 'stake',
    imgUrl: createCampaign,
    link: '/stake',
  },
  {
    name: 'payment',
    imgUrl: payment,
    link: '/',
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/',
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
  },
];
// BSC
// export const pools = [
//   {
//       address: "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16",
//       token0Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
//       token0Name: "Wrapped BNB",
//       token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
//       token1Name: "BUSD Token"
//   }
// ]

// BSC
// export const ROUTER_ADDRESS = "0x10ED43C718714eb63d5aA57B78B54704E256024E";


// Goerli
export const ROUTER_ADDRESS = "0x9b75b82ff0FCF785728FBa918466Fa019C1d3aa9";
export const GFNFT_ADDRESS = "0x3c83ae41C60c7A5Fb0F3f354c9a5Da488415737e";
export const pools = [
  {
      address: "0x5911CFEdA2b259Bc5A31b952BF627Ae5b35dBE7D",
      token0Address: "0x6c542d06f6a48ECecC7DBb094Fa8729B21f07eA5",
      token0Name: "PPP",
      token1Address: "0xE043133cDf9cbe87c46F78f683f1c40D25EEe3E7",
      token1Name: "TTT"
  }
]