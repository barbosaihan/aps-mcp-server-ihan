import path from "node:path";
import url from "node:url";
import dotenv from "dotenv";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

// Pega as variáveis normais do ambiente
const { 
    APS_CLIENT_ID, 
    APS_CLIENT_SECRET, 
    APS_BUCKET, // Adicionei o BUCKET que estava faltando
    APS_SA_ID, 
    APS_SA_EMAIL, 
    APS_SA_KEY_ID 
} = process.env;

// Pega a chave privada codificada em Base64 do ambiente
const encodedPrivateKey = process.env.APS_SA_PRIVATE_KEY;

// Decodifica a chave para o formato original.
const decodedPrivateKey = encodedPrivateKey
    ? Buffer.from(encodedPrivateKey, 'base64').toString('utf8')
    : undefined;


// Exporta todas as variáveis, com a chave já decodificada corretamente
export {
    APS_CLIENT_ID,
    APS_CLIENT_SECRET,
    APS_BUCKET,
    APS_SA_ID,
    APS_SA_EMAIL,
    APS_SA_KEY_ID,
    decodedPrivateKey as APS_SA_PRIVATE_KEY
}