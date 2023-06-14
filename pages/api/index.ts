import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    //console.log(request.headers)
    return response.status(200).json({ message: "olá, mundo!" });
}
