import { useContract, useNFT } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../../const/addresses";
import { CONTRACT_ABI } from "../../const/abis";
import styles from "../../styles/Home.module.css";

function NFTGallery({ tokenIds }: { tokenIds: number[] }) {
    return (
        <div className={styles.grid}>
            {tokenIds.map((tokenId: number, index: number) => (
                <NFTImage key={index} tokenId={tokenId} />
            ))}
        </div>
    );
}

function NFTImage({ tokenId }: { tokenId: number }) {
    const { contract, isLoading: isContractLoading } = useContract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI
    );

    const { data: nft, isLoading: isNFTLoading } = useNFT(contract, tokenId);

    if (!nft) {
        return null; // Eğer nft verisi yoksa bileşeni null olarak döndür
    }

    return (
        <div>
            {isNFTLoading ? (
                <p>Loading...</p>
            ) : (
                <div className={styles.card}>
                    <img
                        src={nft.metadata.image || ""}
                        alt={`NFT #${tokenId}`}
                    />
                    <h3>{`Token Id: #${tokenId}`}</h3>
                    <p>{nft.metadata.name}</p>
                </div>
            )}
        </div>
    );
}

export default NFTGallery;
