import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "/data");

export interface ImageData {
    id: string;
    name: string;
    description: string;
    image: string;
}

export function getImagesData(): ImageData[] {
    const dataFiles = fs.readdirSync(dataDir);

    const imageData = dataFiles.map((dataFile) => {
        const dataName = path.parse(dataFile).name;
        const id = dataName; // id'yi dosya adından alıyoruz
        const jsonFilePath = path.join(dataDir, dataFile);

        if (fs.existsSync(jsonFilePath)) {
            const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
            return {
                id, // id'yi ekledik
                name: dataName,
                ...jsonData,
            } as ImageData;
        }

        return null;
    });

    return imageData.filter((data) => data !== null) as ImageData[];
}
