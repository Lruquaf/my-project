import { GetStaticProps, NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Modal from "./Modal";
import { MediaRenderer } from "@thirdweb-dev/react";
import { textContentList } from "./data";

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
                                    width="160px"
                                    height="160px"
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
