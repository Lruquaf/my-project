import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Modal from "./Modal";
import { MediaRenderer } from "@thirdweb-dev/react";
// import { textContentList } from "./data";

// interface AlmanacProps {
//     textContentList: TextContent[];
// }

interface TextContent {
    id: string;
    name: string;
    description: string;
    image: string;
}

const Almanac: NextPage = () => {
    const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedCard, setExpandedCard] = useState<TextContent | null>(null);

    const textContentList = [
        {
            id: "0",
            name: "Alexios",
            description:
                "Nikephoros II Phokas reigned as Byzantine Emperor between 963 and 969. When he ascended to the throne in 969, he took back Antioch, which was occupied by the Arabs, and conquered Syria. He also captured the regions of Northern Mesopotamia and Cilicia. Despite his successes abroad, he was known as a very harsh and authoritarian leader in domestic politics. He also sought to centralize the Byzantine Empire's administration of the conquered regions. Nikephoros II Phokas was assassinated and died in 969. Nikephoros II Phokas was an important figure in the historical process of the Byzantine Empire, especially remembered for his victories in the wars with the Arabs.",
            image: "ipfs://Qmf4akzSyjzEtBq1FbWRVmKAvUoA5pYU47cmpx4SDnKNRQ",
        },
        {
            id: "1",
            name: "Attila",
            description: "The famous khan of Hunnic Empire",
            image: "ipfs://QmY5yfkejsByNU8epmU3ohxVK8rnfw47poZ9mEzia6b9Lj",
        },
        {
            id: "2",
            name: "Belisarius",
            description: "The supreme general of Byzantine Empire",
            image: "ipfs://QmU8Rf6Lzz7fPF76B6WRRyeYVd1KLNKFvi9DRDvFnbnYut",
        },
    ];

    const handleCardClick = (id: string | null) => {
        if (expandedCardId === id) {
            setExpandedCardId(null);
        } else {
            setExpandedCardId(id);
            const card = textContentList.find((item) => item.id === id);
            if (card) {
                setExpandedCard(card);
            }
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <h1>Almanac</h1>
            <hr />
            <div className={styles.grid}>
                {textContentList.map((item) => (
                    <div
                        className={`${styles.card} ${
                            expandedCardId === item.id ? styles.expanded : ""
                        }`}
                        key={item.id}
                        onClick={() => handleCardClick(item.id)}
                    >
                        <MediaRenderer
                            className={styles.general}
                            src={item.image}
                            width="160px"
                            height="160px"
                        />
                        <div className={styles.idName}>
                            <p>#{item.id}</p>
                            <p>{item.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                content={
                    <div className={styles.modalContent}>
                        <div>
                            <h2>{expandedCard?.name}</h2>
                            <div className={styles.modalImageDesc}>
                                <MediaRenderer
                                    className={styles.general}
                                    src={expandedCard?.image}
                                    width="250px"
                                    height="250px"
                                />
                                <p className={styles.generalDescription}>
                                    {expandedCard?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default Almanac;
