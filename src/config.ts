import path from "node:path";
import url from "node:url";
import dotenv from "dotenv";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

// Pega as variáveis normais do ambiente
const { APS_CLIENT_ID, APS_CLIENT_SECRET, APS_SA_ID, APS_SA_EMAIL, APS_SA_KEY_ID } = process.env;

// --- AQUI ESTÁ A MUDANÇA ---
// 1. Pega a chave privada codificada em Base64 do ambiente
const encodedPrivateKey = process.env.APS_SA_PRIVATE_KEY;

// 2. Decodifica a chave para o formato original.
//    Adicionamos uma verificação para o caso de a variável estar vazia.
const decodedPrivateKey = encodedPrivateKey
    ? Buffer.from(encodedPrivateKey, 'base64').toString('utf8')
    : undefined;


// 3. Exporta todas as variáveis, com a chave já decodificada
export {
    APS_CLIENT_ID,
    APS_CLIENT_SECRET,
    APS_SA_ID,
    APS_SA_EMAIL,
    APS_SA_KEY_ID,
    APS_SA_PRIVATE_KEY: decodedPrivateKey // Exporta a chave decodificada
}