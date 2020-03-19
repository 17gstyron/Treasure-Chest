const { pool } = require('../connection');

const createListing = (seller, category, name, description, price, zipcode, negotiable) => {
  const query = `
  INSERT INTO 
  "listing" (id_seller, id_category, name, description, price, zipcode, negotiable, archived )
  VALUES ($1, $2, $3, $4, $5, $6, $7, 0);`;

  return pool.query(query, [seller, category, name, description, price, zipcode, negotiable]);
};

const getListing = (id) => {
  const query = `
  SELECT listing.id, account.name as seller, category.name as category, listing.name, listing.description, listing.price, listing.zipcode, listing.negotiable, listing.archived 
  FROM "listing", "account", "category" 
  WHERE listing.id = $1 
  AND listing.id_seller = account.id 
  AND listing.id_category = category.id;`;
  return pool.query(query, [id])
    .then((listing) => listing.rows[0]);
};

module.exports = {
  createListing,
  getListing,
}