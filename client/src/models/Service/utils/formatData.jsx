
export const formatFromApiServices = (apiModel) => {
	return ({
    id: apiModel.id,
    name: apiModel.service_name.value,
    code: apiModel.service_code.value,
    group: apiModel.group.value,
    issueType: apiModel.attributes.value.find(
    	(attr) => attr?.code === 'issue-type',
    )?.values.map((val) => val.name) ?? [],
    categoryType: apiModel.attributes.value.find(
    	(attr) => attr?.code === 'category-type',
    )?.values.map((val) => val.name) ?? [],
    status: apiModel.attributes.value.find(
      (attr) => attr?.code === 'status',
    )?.values.map((val) => (val.name)) ?? [],
    criticalities: apiModel.attributes.value.find(
      (attr) => attr?.code === 'criticality',
    )?.values.map((val) => val.name) ?? [],
  });
}