import styles from "../styles/Home.module.css";
import { StaticImageData } from "next/image";
import { NextPage } from "next";
import {
    MediaRenderer,
    Web3Button,
    useAddress,
    useContract,
    useContractRead,
} from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../const/addresses";
import { CONTRACT_ABI } from "../const/abis";
import collectionImage from "../images/cover-image/collection-image.jpg";
import { ethers } from "ethers";

const Home: NextPage = () => {
    const address = useAddress();
    const { contract } = useContract(CONTRACT_ADDRESS);
    const {
        data: price,
        isLoading: isPriceLoading,
        error,
    } = useContractRead(contract, "tokenPrice");
    const collectionImageSrc = collectionImage.src as string;
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.heroSection}>
                    <div className={styles.collectionImage}>
                        <MediaRenderer
                            className={styles.image}
                            src={collectionImageSrc}
                        />
                    </div>
                    <div>
                        <h1 className={styles.title}>Collection Name</h1>
                        <p className={styles.description}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Molestiae similique at fugiat, totam fuga
                            magnam repellendus in illo ut cupiditate hic nulla
                            neque libero unde dolor mollitia nesciunt quisquam
                            harum. Ratione quasi libero sed illum quod provident
                            error vel eos fugiat, natus voluptatem aut ipsum
                            explicabo eius ab distinctio assumenda suscipit?
                            Dicta animi deleniti ab nam officiis expedita
                            repellendus modi, vel blanditiis ipsam eum
                            aspernatur veniam est fugiat delectus autem natus
                            libero harum commodi iure quos! Enim vel, eaque
                            dolorem nihil reiciendis quaerat nostrum voluptates
                            quasi, qui odio expedita veritatis perspiciatis sunt
                            eos natus saepe id. Molestias atque sit molestiae!
                        </p>
                        {!isPriceLoading ? (
                            <h2 className={styles.price}>
                                Price: {ethers.utils.formatEther(price)} ETH
                            </h2>
                        ) : (
                            <p className={styles.price}>Loading...</p>
                        )}
                        <div className={styles.claimContainer}>
                            <Web3Button
                                contractAddress={CONTRACT_ADDRESS}
                                contractAbi={CONTRACT_ABI}
                                action={async (contract) => {
                                    await contract.call("mintNft", [], {
                                        value: price,
                                    });
                                }}
                                onSuccess={(result) =>
                                    alert(`Success!`)
                                }
                                onError={(error) =>
                                    alert(`Something went wrong: ${error}`)
                                }
                                onSubmit={() =>
                                    console.log("Transaction submitted")
                                }
                            >
                                Mint an NFT
                            </Web3Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
