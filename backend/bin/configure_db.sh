export PGPASSWORD = "node_password";

echo "Configuring smartstore dashboard";

dropdb -U node_user smartstoredb
createdb -U node_user smartstoredb

psql -U node_user smartstoredb < ./bin/sql/product.sql
# psql -U node_user dragonstackdb < ./bin/sql/dragon.sql
# psql -U node_user dragonstackdb < ./bin/sql/trait.sql
# psql -U node_user dragonstackdb < ./bin/sql/dragonTrait.sql

# node ./bin/insertTraits.js

echo "dragonstackdb was configured"

