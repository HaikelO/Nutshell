
ProduitsService.$inject = ["$resource","$localStorage"];

function ProduitsService ($resource,$localStorage) {
  return $resource('', {}, {
    query : { method:'GET', url: "/api/Produits", isArray : true }
  });
}

