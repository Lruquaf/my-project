import { GetStaticProps, NextPage } from "next";
import { getImagesData, ImageData } from "./imageData";
import styles from "../styles/Home.module.css";
import { MediaRenderer } from "@thirdweb-dev/react";
import { useState } from "react";
import Modal from "./Modal";

interface AlmanacProps {
    data: ImageData[];
}

const Almanac: NextPage<AlmanacProps> = ({ data }) => {
    const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = (id: string | null) => {
        if (expandedCardId === id) {
            setExpandedCardId(null);
        } else {
            setExpandedCardId(id);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const expandedCard = data.find((item) => item.id === expandedCardId);

    return (
        <div className={styles.container}>
            <h1>Almanac</h1>
            <hr />
            <div className={styles.grid}>
                {data.map((item) => (
                    <div
                        className={`${styles.card} ${
                            expandedCardId === item.id ? styles.expanded : ""
                        }`}
                        key={item.id}
                        onClick={() => handleCardClick(item.id)}
                    >
                        <MediaRenderer
                            className={styles.general}
                            src={item.image as string}
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
                                    src={expandedCard?.image as string}
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

export const getStaticProps: GetStaticProps<AlmanacProps> = async () => {
    const data = getImagesData();

    return {
        props: {
            data,
        },
    };
};

export default Almanac;
