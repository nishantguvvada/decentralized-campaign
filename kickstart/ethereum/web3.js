import Web3 from "web3";

let web3UserVersion;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {

    // we are in browser and metamask is running
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3UserVersion = new Web3(window.ethereum);

} else {

    // we are on the server OR the user is not running metamask
    const provider = new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/04564008f4c640dda80dac87f76a409e");
    web3UserVersion = new Web3(provider);

}

export default web3UserVersion;