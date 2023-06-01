async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  const nftArtifacts = await locklift.factory.getContractArtifacts("NFT");
  const indexArtifacts = await locklift.factory.getContractArtifacts("Index");
  const indexBasisArtifacts = await locklift.factory.getContractArtifacts("IndexBasis");

  const json = {
    "type": "Basic NFT",
    "name": "Ventory GG Collection",
    "description": "Verify first NFT Collection on Test net",
    "preview": {
      "source": "https://ipfs.io/ipfs/bafybeicnuu37rwdmxcn3oobmbvgtji6kn52xtrkysgjn4nrxcnhchfsu4q/assets/4023.png",
      "mimetype": "image/png"
    },
    "files": [
      {
        "source": "https://ipfs.io/ipfs/bafybeicnuu37rwdmxcn3oobmbvgtji6kn52xtrkysgjn4nrxcnhchfsu4q/assets/4023.png",
        "mimetype": "image/png"
      }
    ],
    "external_url": "https://dev.ventory.gg/"
  }

  const { contract: sample, tx } = await locklift.factory.deployContract({
    contract: "Collection",
    publicKey: signer.publicKey,
    initParams: {},
    constructorParams: {
      codeNft: nftArtifacts.code,
      codeIndex: indexArtifacts.code,
      codeIndexBasis: indexBasisArtifacts.code,
      json : JSON.stringify(json)
    },
    value: locklift.utils.toNano(4),
  });

  console.log(`Collection deployed at: ${sample.address.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });