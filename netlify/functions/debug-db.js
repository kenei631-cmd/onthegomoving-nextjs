/**
 * Debug function to test DB connection and expose error details.
 * GET /.netlify/functions/debug-db?key=otgm-admin-2025
 */
import mysql from "mysql2/promise";

const ADMIN_KEY = process.env.ADMIN_DASHBOARD_KEY || "otgm-admin-2025";

export const handler = async (event) => {
  const headers = { "Content-Type": "application/json" };
  const key = event.queryStringParameters?.key || "";
  if (key !== ADMIN_KEY) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: "Unauthorized" }) };
  }

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    return { statusCode: 200, headers, body: JSON.stringify({ error: "DATABASE_URL not set" }) };
  }

  // Mask password in URL for logging
  const maskedUrl = dbUrl.replace(/:([^@]+)@/, ":***@");
  
  try {
    const conn = await mysql.createConnection(dbUrl);
    const [rows] = await conn.execute("SELECT COUNT(*) as cnt FROM leads");
    await conn.end();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: "connected",
        dbUrl: maskedUrl,
        leadCount: rows[0].cnt,
      }),
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: "error",
        dbUrl: maskedUrl,
        error: err.message,
        code: err.code,
        errno: err.errno,
      }),
    };
  }
};
