MachinesService.$inject = ["$resource","$localStorage"];

function MachinesService ($resource,$localStorage) {
  return $resource('', {}, {
    query: { method:'GET', url: "/api/Machines", isArray : true}
  });
}