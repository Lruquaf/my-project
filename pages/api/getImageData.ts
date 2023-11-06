import { NextApiRequest, NextApiResponse } from "next";
import { getImagesData } from "../imageData"; // image data dosyanızın yolunu güncelleyin

export default (req: NextApiRequest, res: NextApiResponse) => {
    const data = getImagesData();

    res.status(200).json(data);
};
