import {
    ThirdwebNftMedia,
    useAddress,
    useContract,
    useContractRead,
    useNFT,
} from "@thirdweb-dev/react";
import styles from "../../styles/Home.module.css";
import { CONTRACT_ADDRESS } from "../../const/addresses";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI } from "../../const/abis";
import NFTGallery from "./NFTGallery";

export default function Profile() {
    const address = useAddress();
    const truncatedAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };
    const { contract, isLoading: isContractLoading } = useContract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI
    );
    const { data: balance, isLoading: isBalanceLoading } = useContractRead(
        contract,
        "balanceOf",
        [address]
    );
    const { data: totalSupply, isLoading: isTotalSupplyLoading } =
        useContractRead(contract, "getTokenCounter");

    const [nfts, setNFTs] = useState<{ tokenId: number; tokenUri: any }[]>([]); // Sahip olunan NFT'ler
    const [isNFTsLoading, setIsNFTsLoading] = useState(false);

    const getOwnedNFTs = async () => {
        try {
            setIsNFTsLoading(true);
            if (!isTotalSupplyLoading && !isContractLoading) {
                const nfts = [];
                for (let i = 0; i < totalSupply.toNumber(); i++) {
                    if (contract) {
                        const owner = await contract.call("ownerOf", [
                            i.toString(),
                        ]);
                        if (owner === address) {
                            const tokenId = i;
                            const tokenUri = await contract.call("tokenURI", [
                                tokenId.toString(),
                            ]);
                            nfts.push({ tokenId, tokenUri });
                        }
                    }
                }
                setNFTs(nfts);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsNFTsLoading(false);
        }
    };
    useEffect(() => {
        if (address) {
            getOwnedNFTs();
        }
    }, [address]);

    return (
        <div className={styles.container}>
            {address ? (
                <div>
                    <div>
                        <h1>Profile</h1>
                        <p>Wallet Address: {truncatedAddress(address || "")}</p>
                    </div>
                    <hr />
                    <div>
                        <h3>My NFTs</h3>
                        {!isBalanceLoading ? (
                            balance ? (
                                <p>Balance: {balance.toNumber()}</p>
                            ) : (
                                <p>Loading...</p>
                            )
                        ) : (
                            <p>Loading...</p>
                        )}
                        <div className={styles.grid}>
                            {!isNFTsLoading ? (
                                nfts.length > 0 ? (
                                    <div>
                                        <NFTGallery
                                            tokenIds={nfts.map(
                                                (nft) => nft.tokenId
                                            )}
                                        />
                                    </div>
                                ) : (
                                    <p>No NFTs owned.</p>
                                )
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.main}>Please connect your wallet</div>
            )}
        </div>
    );
}
